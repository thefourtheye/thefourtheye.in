---
layout: post
title: "emacs - Cheat Sheet"
date: 2017-05-21 21:37:45 +0530
comments: true
tags:
    - emacs
---

After having been in the vim camp in the [vim vs Emacs editor war](https://en.wikipedia.org/wiki/Editor_war) for eight years, I decided to peek into the enemy's camp. The IDE users might look down upon the editor users, but I still enjoy using my keyboard to do all the coding work. That is the reason why I chose to learn Emacs over an IDE.

When I started with Emacs, it was kind of scary. Editing text is straight forward, as in, it didn't require me to change the mode like in Vim. But the control key sequences are way too much to remember compared to Vim. So I decided to understand the keys which are commonly used to move around the text in the screen, with the help of Emacs Tutorial (`Ctrl+h t`).

This cheat sheet has a few more key combinations which are used to do common operations on Emacs.

**Note:** From now on, the `Ctrl` key will be represented as `C` and the `Alt` key (also called as `Meta` key) will be represented as `M`. For example, if the actual command is to press both `Ctrl` and `h` keys to invoke the help, then it would be written as `C-h`.

## Common Operations

{:.gridtable}
| Key Combinations | Functionality |
|---------|
| `C-x C-c` | Quit Emacs |
| `C-h t` | Open built-in Emacs Tutorial file |
| `C-x C-f` | Open a File |
| `C-x k` | Close the currently opened file on screen |
| `C-x C-s` | Save the currently opened file |
| `C-x s` | Save all the open files |
| `C-g` | Discard the current command |

## Split Window Operations

{:.gridtable}
| Key Combinations | Functionality |
|-----|
| `C-x 2` | Split the view horizontally |
| `C-x 3` | Split the view vertically |
| `C-x o` (English letter "o") | Switch to next split window |
| `C-x 0` (Number Zero) | Kill the current window |
| `C-x 1` | Kill all other split windows except current window |
| `C-x C-b` | List all open files in a new split window |
| `C-x b` | Bring any of the open files to the front, by name |

## Cursor Movement

{:.gridtable}
| Key Combinations | Functionality |
|-----|
| `C-b` | Move one character backward |
| `M-b` | Move one word backward |
| `C-f` | Move one character forward |
| `M-f` | Move one word forward |
| `C-v` | Scroll one page full of information forward |
| `M-v` | Scroll one page full of information backward |
| `C-a` | Beginning of current line |
| `M-a` | Beginning of current sentence |
| `C-e` | Ending of current line |
| `M-e` | Ending of current sentence |
| `M->` | End of file |
| `M-<` | Beginning of file |
| `C-n` | Next line |
| `C-p` | Previous line |
| `C-l` | Move the current line to bottom, middle, and start of screen |

## Edit Operations

{:.gridtable}
| Key Combinations | Functionality |
|-----|
| `C-x u` `C-/` | Undo last operation
| `C-k` | Delete till the end of the current line from current position |
| `M-k` | Delete till the end of the current sentence from current position |
| `C-d` | Delete the next character |
| `M-d` | Delete the next word |
| `C-<Del>` | Delete the previous character |
| `M-<Del>` | Delete the previous word |

## Copy and Paste

{:.gridtable}
| Key Combinations | Functionality |
|-----|
| `C-<Space>` | Set mark to select text. Now with movement keys select the text |
| `C-x h` | Select the whole buffer |
| `C-w` | Cut the selected text |
| `M-w` | Copy the selected text |
| `C-y` | Yank (paste) the selected text |


