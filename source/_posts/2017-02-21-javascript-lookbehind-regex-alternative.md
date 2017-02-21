---
layout: post
title: "JavaScript lookbehind RegEx alternative"
date: 2017-02-21 21:33:13 +0530
comments: true
categories: javascript regex
---

Recently one of my colleagues came to me with a problem. He had a string which looked like JSON but not a valid JSON string. For example,

```js
[{\"name\":\"Kilua\"\\,\"age\":35}],{\"city\":\"SJC\"},\"US\"
```

and they wanted to split the string at all the commas, except when they are preceded by a backslash. That means, they wanted

```js
[ '[{"name":"Kilua"\\,"age":35}]', '{"city":"SJC"},"US"' ]
```

as output. If the requirement was to split the string at commas followed by a certain string, then it would have been pretty straight forward. For example, if the string is `a,1,b,2,c,3` and if they wanted to split the string at all commas except when they are not followed by numbers, then the solution would have been very simple, with negative lookahead, like this

```js
console.log('a,1,b,2,c,3'.split(/,(?!\d)/));
// [ 'a,1', 'b,2', 'c,3' ]
```

Since JavaScript doesn't have lookbehinds, we don't have a straight forward solution to this problem. When I searched Stackoverflow, I found this solution

```js WTK's answer in Stackoverflow http://stackoverflow.com/a/7330150/1903116
'a\\,bcde,fgh,ijk\\,lmno,pqrst\\,uv'.replace(/([^\\]),/g, '$1\u000B').split('\u000B')
```

This solves the exact same problem which my colleague was facing. It compensates the absence of lookbehinds by breaking down the problem in two steps.

1. Replace all the commas matching the condition with a marker string which does not appear anywhere in the string. (`\u000B` in this case)
2. Then split the original string with the marker string.
