---
layout: post
title: "JS Quirks: stringified numbers"
date: 2016-11-15 00:38:30 +0530
comments: true
categories:
 - javascript
 - quirks
---

When I was working on [Node.js PR 9492](https://github.com/nodejs/node/pull/9492), [this comment](https://github.com/nodejs/node/pull/9492#discussion_r86987446)

> This should probably test for a wider range of values. `test/parallel/test-net-internal.js` has some good examples.

made me look at [that file](https://github.com/nodejs/node/blob/fc44bd4d0b984f7b926b8c92b8e9a88da1c08921/test/parallel/test-net-internal.js). As I was going through the test, few of the bad values were interesting. I normally test with stringified positive decimal numbers and negative decimal numbers. But I saw stringified negative octal, binary, and hexa decimal numbers.

```js
const bad = [-1, 'a', {}, [], false, true, 0xFFFF + 1, Infinity,
             -Infinity, NaN, undefined, null, '', ' ', 1.1, '0x',
             '-0x1', '-0o1', '-0b1', '0o', '0b'];
```

I got curious as I have never used them before, I just wanted to see their corresponding negative values. So I wrote a program like this

```js
[-0x1, '-0x1', -0o1, '-0o1', -0b1, '-0b1'].forEach(item => console.log(item, +item));
```

and I was expecting to see the result

```text
-1 -1
-0x1 -1
-1 -1
-0o1 -1
-1 -1
-0b1 -1
```

but all I got was

```text
-1 -1
-0x1 NaN
-1 -1
-0o1 NaN
-1 -1
-0b1 NaN
```

The unary - operator simply negates the magnitude of the numbers. The stringified numbers were not processed in the same way as their number counterparts. So I looked at the ECMAScript specification's [ToNumber Applied to the String Type](http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber-applied-to-the-string-type) section (which is actually responsible for converting strings to numbers).

```text
StrNumericLiteral :::
    StrDecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral
...
...
StrDecimalLiteral :::
    StrUnsignedDecimalLiteral
    + StrUnsignedDecimalLiteral
    - StrUnsignedDecimalLiteral
```

Only the <code>StrDecimalLiteral</code> production allows signed numbers. If we look at the definition of others in the [Numeric Literals](http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals) section,

```text
BinaryIntegerLiteral ::
    0b BinaryDigits
    0B BinaryDigits

BinaryDigits ::
    BinaryDigit
    BinaryDigits BinaryDigit

BinaryDigit :: one of
    0 1

OctalIntegerLiteral ::
    0o OctalDigits
    0O OctalDigits

OctalDigits ::
    OctalDigit
    OctalDigits OctalDigit

OctalDigit :: one of
    0 1 2 3 4 5 6 7

HexIntegerLiteral ::
    0x HexDigits
    0X HexDigits

HexDigits ::
    HexDigit
    HexDigits HexDigit

HexDigit :: one of
    0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
```

So, as per the specification, only the decimal numbers can have signs in the stringified number form. That is why the others are not considered as numbers.