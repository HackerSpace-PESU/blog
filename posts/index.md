---
title: Introduction to Programming with Python
date: 2020-09-22
description: a gentle introduction to the favorite programming language of beginners the world around.
tags:
  - introduction
  - python
  - programming
  - beginners
eleventyExcludeFromCollections: true
---

[[toc]]

::: tip
If you already know what Python is and want to skip directly to the syntax, click [here](). I'd still suggest you take a couple of minutes to read it, but it's your choice.
:::


# Why Python?

Let's start with this - what is python? referring to our good old friend, wikipedia, tells us this - 

> Python is an _interpreted, high-level and general-purpose_ programming language.

Let's scrub up and get our masks on, because it's time to dissect this.

## __Python is interpreted__

Let's get one thing straight - computers only understand one language, which is the language of zeroes and ones. Formally, this is known as _Binary Language_, and thankfully, technology has evolved to the point where we don't need to understand binary to be able to communicate with a computer at a deeper level.

So how does this whole thing work? How do we write programs in a fancy version of english, and get computers to be able to understand them? Obviously, someone or something needs to translate what we write to some form of Binary Language. This is done differently for different programming languages. It's a toss up between a `compiler` and an `interpreter`.

An easy way to understand the difference between a `compiler` and an `interpreter` is to think of it as the difference between withdrawing money from an ATM and encashing a cheque.

An `interpreter` is like an ATM - you go up to one, press a few buttons, and if you press something wrong, you'll have to start from the beginning. Otherwise, you'll have your money ready by the time you're done using it. **Put simply, an interpreter executes your code line-by-line, and will stop you immediately if you make a mistake**. This paradigm is used in many popular programming languages, such as `python` and `javascript`. 

However, a `compiler` is a different animal, in that it involes an extra step to run your code, known as `compilation`. This means that before any code is run, it is checked for mistakes and errors[^1]. When you encash a cheque, it's easy to spot some mistakes before you attempt to encash it - perhaps a name, or a signature, are missing. The advantage is that you can determine all the errors at once. If your program compiles successfully, it means that your code is _mostly_ error-free. This paradigm is used in `C`, `C++`, `Java`, `Rust`, and many other languages.

At the end of the day, both do the same job - convert our code into machine language - but, as you can see, there are pronounced differences between the both. Python is an interpreted language, and it comes with all the advantages that an interpreted language offers, as you will soon come to see.

## Python is High level

A programming language is but a layer of abstraction - at the end of the day, all our programs are translated to binary code that the computer can understand. How do they do this? Beneath any programming language you write, there are thousands of lines of other code working to convert our code into the ones and zeroes the computer understands. Code that the computer understands is also known as `machine code`, and looks something like this.

```
8B542408 83FA0077 06B80000 0000C383
FA027706 B8010000 00C353BB 01000000
B9010000 008D0419 83FA0376 078BD989
C14AEBF1 5BC3
```

In it's raw form, it's nothing but ones and zeroes, but to make this more readable to humans, we convert it into hexadecimal notation, as you see above.

Simply put, a Low Level language is one that requires very little or no compilation to be converted to machine code. It should be noted that almost no programmer writes code in Low Level Languages, as higher-level languages do automatically the things that are difficult to do in low-level langauges. Low-level languages get as close to computer-speak as possible. Let's take an example[^2] - 

```asm
section     .text
global      _start                              ;must be declared for linker (ld)

_start:                                         ;tell linker entry point

    mov     edx,len                             ;message length
    mov     ecx,msg                             ;message to write
    mov     ebx,1                               ;file descriptor (stdout)
    mov     eax,4                               ;system call number (sys_write)
    int     0x80                                ;call kernel

    mov     eax,1                               ;system call number (sys_exit)
    int     0x80                                ;call kernel

section     .data

msg     db  'Hello, world!',0xa                 ;our dear string
len     equ $ - msg                             ;length of our dear string
```

This is `Assembly`, one of the highest-level low-level programming languages. Yet, it involves manually freeing space in RAM, calling OS-level functions, making calls to the kernel, etc. The program used to convert this into machine code isn't a compiler or an interpreter, but instead an `assembler`.

Now, consider the same program in Python, which is a high level language - 

```python
print("Hello, world!")
```

See how we didn't have to worry about anything related to memory or OS-specific operations and system calls? This is because Python is a high-level language, which means you can _focus more on what you want to do as opposed to how you do it_. This also means that python will run anywhere a python interpreter runs, which means that it isn't limited to or affected by different processor architectures. This is the case for all high level languages.

Functionally, both languages do almost the same thing - print this line of text - but the ease (and not to mention swiftness) with which it is possible in higher level languages make a clear-cut case as to why low-level languages are not preferred for everyday tasks.


## Python is a general purpose language

Some languages are designed for specific tasks - such as `matlab` for scientific computation and calculation, `COBOL` for business use, and `HTML` for designing web pages. However, one can use python for almost anything - from Data Science and Machine Learning (see [Tensorflow]() and [Keras]()), to Game Development (see [Pygame]()), and all the way to writing web servers and web applications (see [Gunicorn](), [Flask]() and [Django]()), and even for simple automation tasks, such as pulling some data off a webpage (see [BeautifulSoup4]()).

This, and an awesome community that is very welcoming of beginners, along with python's english-like syntax, makes it the favored choice of beginners all around the world.


# I/O and Variables

::: tip
you don't need to have your own computer open to run this code. At the end of each block, you can run the code from the comfort of your own browser. To make sure this is possible, we will be using [repl.it](https://repl.it/languages/Python3), which will allow you to write an run Python in your browser. I'd suggest you keep it open in a tab next to this one.
:::

Great! So we have decided that we want to use Python to make our computers do awesome things. But apart from telling the computer where our code is located and how to process it, we also want our program to be able to "tell us " when it works, and conversely, when it's not working, and if not for that, to simply communicate information to us. So let's understand how that happens.

## The `print` statment

Tradition says that the first program you write in any programming language should be a Hello World program - A program that does nothing but tell the computer to display the words "Hello, World" to the user. This was done because it served as a test - for a compiled language, it means that the code compiles and runs correctly. With an interpreted language, this exercise serves no purpose except to uphold the tradition.

However, through this, we will learn how to get our computer to display text and numbers. The code follows - 

```python
print("Hello, World!")
```

In Python, we use the `print` statement to make our computer output a message. There are few limits on what you can print - 

```python
print("Hi! Welcome to this tutorial")
# print some numbers
print(1)
print(10 + 15)
```

Any line that starts with a `#` is known as a `comment`. They do not affect the outcome of the program, and exist to make the lives of those who write these programs much easier - think of them as sticky notes that you can place anywhere.

## Variables and Data Types

At this point, you might ask - why do the letters and sentences require double quotes (`"`) around them, but the numbers don't? This is an excellent question. For reasons not yet obvious, programs store different types of data in different ways. You can store integers, numbers, dates, lists, numbers with a decimal point and much more. All these are known as `data types`.

Python has multiple data types, and you can find a full list [here](). But how do we keep track of them? It's no use to me if i know a specific number exists, but I can't tell you what it is. To solve this problem, we use variables.

Much like Mathematical variables, a variable in Python is something that holds a value. Think about it as a bucket with a name - if you put an item in that bucket, you can get whatever you put inside it just by knowing the name of the bucket. It's pretty easy to declare a variable in Python - 

```python
name = "Anirudh Rowjee"
```

As you can see, the `syntax` (formal description of language) to declare a variable is as follows - 
```
<VARIABLE_NAME> = <VALUE>
```
(anything within `<>` is a placeholder).

Similarly, we can store different types of data within variables - 

```
a_string = "A sequence of letters is also known as a string"
an_integer = 100
# a decimal number is also known as a floating point number
a_float = 111.45 
# a boolean value represents one of only two possible values - True or False
a_bool = True
# we can also represent complex numbers!
a_complex_number =  10 + 1j
```

But there's little to no interactivity here - it's rather boring if the we can only make the code say a few things. What if we could interact with it? Let's introduce ourselves to the program.


```python
print("Hi!")
print("What is your name?")
```

But that's not the only reason we're here. Let's write something useful - how about a program that greets you, but not your 






[^1]: We will learn later that this doesn't always mean that every program that compiles successfully does what it is supposed to, but it's not relevant right now - just keep that in the back of your head. 
[^2]: http://asm.sourceforge.net/intro/hello.html
