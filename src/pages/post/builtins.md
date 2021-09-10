---
title: "Understanding all of Python, through its builtins"
description: "Python has a whole lot of builtins that are unknown to most people. This guide aims to introduce you to everything that Python has to offer, through its seemingly obscure builtins."
publishDate: "Wednesday, 18 August 2021"
author: "Tushar Sadhwani"
heroImage: "/images/builtins.jpg"
alt: "Understanding all of Python, through its builtins"
layout: "../../layouts/BlogPost.astro"
---

> ### This blog is currently a work in progress.

Python as a language is comparatively simple. And I believe, that you can learn quite a lot about Python and its features, just by learning what all of its builtins are, and what they do. And to back up that claim, I'll be doing just that.

> Just to be clear, this is not going to be a tutorial post. Covering such a vast amount of material in a single blog post, while starting from the beginning is pretty much impossible. So I'll be assuming you have a basic to intermediate understanding of Python. But other than that, we should be good to go.

## Index

- [Index](#index)
- [So what's a builtin?](#so-whats-a-builtin)
  - [Local scope](#local-scope)
  - [Enclosing scope](#enclosing-scope)
  - [Global scope](#global-scope)
  - [Builtin scope](#builtin-scope)
- [_ALL_ the builtins](#all-the-builtins)
- [Exceptions](#exceptions)
- [Constants](#constants)
- [Funky globals](#funky-globals)
  - [`__name__`](#__name__)
  - [`__doc__`](#__doc__)
  - [`__package__`](#__package__)
  - [`__spec__`](#__spec__)
  - [`__loader__`](#__loader__)
  - [`__import__`](#__import__)
  - [`__debug__`](#__debug__)
  - [`__build_class__`](#__build_class__)
  - [`__cached__`](#__cached__)
- [All the builtins, one by one](#all-the-builtins-one-by-one)
  - [`compile`, `exec` and `eval`](#compile-exec-and-eval)
  - [`input`, `print`](#input-print)
  - [`bool`, `chr`, `complex`, `float`, `int`, `str`](#bool-chr-complex-float-int-str)
  - [`object`](#object)
  - [`type`](#type)
  - [`bytes`, `bytearray`, `memoryview`](#bytes-bytearray-memoryview)
  - [`dict`, `frozenset`, `list`, `set`, `tuple`](#dict-frozenset-list-set-tuple)
  - [`ascii`, `bin`, `hex`, `oct`, `ord`](#ascii-bin-hex-oct-ord)
  - [`format`](#format)
  - [`all`, `any`](#all-any)
  - [`dir`, `vars`](#dir-vars)
  - [`hash`, `id`](#hash-id)
  - [`abs`, `divmod`, `pow`, `round`](#abs-divmod-pow-round)
  - [`isinstance`, `issubclass`, `callable`](#isinstance-issubclass-callable)
  - [`property`, `classmethod`, `staticmethod`](#property-classmethod-staticmethod)
  - [`super`](#super)
  - [`len`, `max`, `min`, `sum`](#len-max-min-sum)
  - [`map`, `filter`](#map-filter)
  - [`iter`, `next`](#iter-next)
  - [`range`, `enumerate`, `zip`](#range-enumerate-zip)
  - [`slice`](#slice)
  - [`sorted`, `reversed`](#sorted-reversed)
  - [`globals`, `locals`](#globals-locals)
  - [`delattr`, `getattr`, `hasattr`, `setattr`](#delattr-getattr-hasattr-setattr)
  - [`breakpoint`](#breakpoint)
  - [`repr`](#repr)
  - [`open`](#open)
  - [`help`, `exit`, `quit`](#help-exit-quit)
  - [`copyright`, `credits`, `license`](#copyright-credits-license)
- [Where to learn more?](#where-to-learn-more)

## So what's a builtin?

A builtin in a Python is everything that lives in the `builtins` module.

To understand this better, you'll need to learn about the **L.E.G.B.** rule.

^ This defines the order of scopes in which variables are looked up in Python. It stands for:

- **L**ocal scope
- **E**nclosing (or nonlocal) scope
- **G**lobal scope
- **B**uiltin scope

### Local scope

The local scope refers to the scope that comes with the current function or class you are in. Every function call and class instantiation creates a fresh local scope for you, to hold local variables in.

Here's an example:

```python
x = 11
print(x)

def some_function():
    x = 22
    print(x)

some_function()

print(x)
```

Running this code outputs:

```plaintext
11
22
11
```

So here's what's happening: Doing `x = 22` defines a new variable inside `some_function` is in it's own **local namespace**. After that point, when the function refers to `x` it means the one in its own scope. Accessing `x` outside of `some_function` refers to the one defined outside.

### Enclosing scope

The enclosing scope (or nonlocal scope) refers to the scope of the classes or functions inside which the current function/class lives.

... I can already see half of you going 🤨 right now. So let me explain with an example:

```python
x = 11
def outer_function():
    x = 22
    y = 789

    def inner_function():
        x = 33
        print('Inner x:', x)
        print('Enclosing y:', y)

    inner_function()
    print('Outer x:', x)

outer_function()
print('Global x:', x)
```

The output of this is:

```plaintext
Inner x: 33
Enclosing y: 789
Outer x: 22
Global x: 11
```

What it essentially means is that every new function/class creates its own local scope, **separate from its outer environment**. Trying to access an outer variable will work, but any variable created in the local scope does not affect the outer scope.

> But what if I want to affect the outer scope?

To do that, you can use the `nonlocal` keyword in Python to tell the interpreter that you don't mean to define a new variable in the local scope, but you want to modify the one in the enclosing scope.

```python
def outer_function():
    x = 11

    def inner_function():
        nonlocal x
        x = 22
        print('Inner x:', x)

    inner_funcion()
    print('Outer x:', x)
```

This prints:

```plaintext
Inner x: 22
Outer x: 22
```

### Global scope

Global scope (or module scope) simply refers to the scope where all the module's variables, functions and classes are defined.

A "module" is any python file or package that can be run or imported. For eg. `time` is a module (as you can do `import time` in your code), and `time.sleep()` is a function defined in the `time` module's global scope.

Every module in Python has a few pre-defined globals, such as `__name__` and `__doc__`, which refer to the module's name and the module's docstring, respectively. You can try this in the REPL:

```python
>>> print(__name__)
__main__
>>> print(__doc__)
None
>>> import time
>>> time.__name__
'time'
>>> time.__doc__
'This module provides various functions to manipulate time values.'
```

### Builtin scope

Now we get to the topic of this blog &mdash; the builtin scope.

So there's two things to know about the builtin scope in Python:

- It's the scope where essentially all of Python's top level functions are defined, such as `len`, `range` and `print`.
- When a variable is not found in the local, enclosing or global scope, Python looks for it inside the builtins.

You can inspect the builtins directly if you want, by importing the `builtins` module, and checking methods inside it:

```python
>>> import builtins
>>> builtins.a   # press <Tab> here
builtins.abs(    builtins.all(    builtins.any(    builtins.ascii(
```

And for some reason unknown to me, Python exposes the builtins module as `__builtins__` by default in the global namespace. So you can also access `__builtins__` directly, without importing anything. Note, that `__builtins__` being available is a CPython implementation detail, and other Python implementations might not have it. `import builtins` is the most correct way to access the builtins module.

## _ALL_ the builtins

You can use the `dir` function to print all the variables defined inside a module or class. So let's use that to list out all of the builtins:

```python
>>> print(dir(__builtins__))
['ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException',
 'BlockingIOError', 'BrokenPipeError', 'BufferError', 'BytesWarning',
 'ChildProcessError', 'ConnectionAbortedError', 'ConnectionError',
 'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning',
 'EOFError', 'Ellipsis', 'EnvironmentError', 'Exception', 'False',
 'FileExistsError', 'FileNotFoundError', 'FloatingPointError',
 'FutureWarning', 'GeneratorExit', 'IOError', 'ImportError',
 'ImportWarning', 'IndentationError', 'IndexError', 'InterruptedError',
 'IsADirectoryError', 'KeyError', 'KeyboardInterrupt', 'LookupError',
 'MemoryError', 'ModuleNotFoundError', 'NameError', 'None',
 'NotADirectoryError', 'NotImplemented', 'NotImplementedError',
 'OSError', 'OverflowError', 'PendingDeprecationWarning',
 'PermissionError', 'ProcessLookupError', 'RecursionError',
 'ReferenceError', 'ResourceWarning', 'RuntimeError', 'RuntimeWarning',
 'StopAsyncIteration', 'StopIteration', 'SyntaxError', 'SyntaxWarning',
 'SystemError', 'SystemExit', 'TabError', 'TimeoutError', 'True',
 'TypeError', 'UnboundLocalError', 'UnicodeDecodeError',
 'UnicodeEncodeError', 'UnicodeError', 'UnicodeTranslateError',
 'UnicodeWarning', 'UserWarning', 'ValueError', 'Warning',
 'ZeroDivisionError', '__build_class__', '__debug__', '__doc__',
 '__import__', '__loader__', '__name__', '__package__', '__spec__',
 'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray',
 'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex',
 'copyright', 'credits', 'delattr', 'dict', 'dir', 'divmod', 'enumerate',
 'eval', 'exec', 'exit', 'filter', 'float', 'format', 'frozenset',
 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input',
 'int', 'isinstance', 'issubclass', 'iter', 'len', 'license', 'list',
 'locals', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct',
 'open', 'ord', 'pow', 'print', 'property', 'quit', 'range', 'repr',
 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted',
 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip']
```

...yeah, there's a lot. But don't worry, we'll break these down into various groups, and knock them down one by one.

So let's tackle the biggest group by far:

## Exceptions

Python has 66 built-in exception classes, each one intended to be used by the user, the standard library and everyone else, to serve as meaningful ways to interpret and catch errors in your code.

To explain exactly why there's separate Exception classes in Python, here's a quick example:

```python
def fetch_from_cache(key):
    if key is None:
        raise ValueError('key must not be None')

    return cached_items[key]

def get_value(key):
    try:
        value = fetch_from_cache(key)
    except KeyError:
        value = fetch_from_api(key)

    return value
```

Focus on the `get_value` function. It's supposed to return a cached value if it exists, otherwise fetch data from an API.

There's 3 things that can happen in that function:

- If the `key` is not in the cache, trying to access `cached_items[key]` raises a `KeyError`. This is caught in the `try` block, and an API call is made to get the data.
- If they `key` _is_ present in the cache, it is returned as is.
- There's also a third case, where `key` is `None`.

  If the key is `None`, `fetch_from_cache` raises a `ValueError`, indicating that the value provided to this function was inappropriate. And since the `try` block only catches `KeyError`, this error is shown directly to the user.

  ```python
  >>> x = None
  >>> get_value(x)
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    File "<stdin>", line 3, in get_value
    File "<stdin>", line 3, in fetch_from_cache
  ValueError: key must not be None
  >>>
  ```

If `ValueError` and `KeyError` weren't predefined, meaningful error types, there wouldn't be any way to differentiate between error types in this way.

<details>
<summary>P.S. Some extra Exception trivia...</summary>
A fun fact about exceptions is that they can be sub-classed to make your own, more specific error types. For example, you can create a `InvalidEmailError` extending `ValueError`, to raise errors when you expected to receive an E-mail string, but it wasn't valid. If you do this, you'll be able to catch `InvalidEmailError` by doing `except ValueError` as well.

Another fact about exceptions is that every exception is a subclasses of `BaseException`, and nearly all of them are subclasses of `Exception`, other than a few that aren't supposed to be normally caught. So if you ever wanted to be able to catch any exception normally thrown by code, you could do

```python
except Exception: ...
```

and if you wanted to catch _every possible error_, you could do

```python
except BaseException: ...
```

Doing that would even catch `KeyboardInterrupt`, which would make you unable to close your program by pressing `Ctrl+C`. To read about the hierarchy of which Error is subclassed from which in Python, you can check the [Exception hierarchy](https://docs.python.org/3/library/exceptions.html#exception-hierarchy) in the docs.

</details>

Now I should point it out that now _all_ uppercase values in that output above were exception types, there's in-fact, 1 another type of built-in objects in Python that are uppercase: constants. So let's talk about those.

## Constants

There's exactly 5 constants: `True`, `False`, `None`, `Ellipsis`, and `NotImplemented`.

`True` `False` and `None` are the most obvious constants.

`Ellipsis` is an interesting one, and it's actually represented in two forms: the word `Ellipsis`, and the symbol `...`. It mostly exists to support [type annotations](/mypy-guide), and for some very fancy slicing support.

`NotImplemented` is the most interesting of them all _(other than the fact that `True` and `False` actually function as `1` and `0` if you didn't know that, but I digress)_. `NotImplemented` is used inside a class' operator definitions, when you want to tell Python that a certain operator isn't defined for this class.

Now I should mention that all objects in Python can add support for all Python operators, such as `+`, `-`, `+=`, etc., by defining special methods inside their class, such as `__add__` for `+`, `__iadd__` for `+=`, and so on.

Let's see a quick example of that:

```python
class MyNumber:
    def __add__(self, other):
        return other + 42
```

<details>
<summary>Extras: right-operators</summary>

If you're wondering from the code example above why I never tried to do `3 + n`, it's because it doesn't work yet:

```python
>>> 100 + n
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'MyNumber'
```

But, support for that can be added pretty easily by adding the `__radd__` operator, which adds support for _right-addition_:

```python
class MyNumber:
    def __add__(self, other):
        return other + 42

    def __radd__(self, other):
        return other + 42
```

As a bonus, this also adds support for adding two `MyNumber` classes:

```python
>>> n = MyNumber()
>>> n + 100
142
>>> 3 + n
45
>>> n + n
84
```

</details>

But let's say you only want to support integer addition with this class, and not floats. This is where you'd use `NotImplemented`:

```python
class MyNumber:
    def __add__(self, other):
        if isinstance(other, float):
            return NotImplemented

        return other + 42
```

Returning `NotImplemented` from an operator method tells Python that this is an unsupported operation. Python then conveniently wraps this into a `TypeError` with a meaningful message:

```python
>>> n + 0.12
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'MyNumber' and 'float'
>>> n + 10
52
```

A weird fact about constants is that they aren't even implemented in Python, they're implemented directly in C code, like [this](https://github.com/python/cpython/blob/7e246a3/Include/object.h#L610) for example.

## Funky globals

There's another group of odd-looking values in the builtins output we saw above: values like `__spec__`, `__loader__`, `__debug__` etc.

These are actually not unique to the `builtins` module. These properties are all present in the global scope of every module in Python, as they are _module attributes_. These hold information about the module that is required for the **import machinery**. Let's take a look at them:

### `__name__`

Contains the name of the module. `builtins.__name__` will be the string `'builtins'`. When you run a Python file, that is also run as a module, and the module name for that is `__main__`. This should explain why `if __name__ == '__main__'` is used in Python files.

### `__doc__`

Contains the module's docstring. It's what's shown as the module description when you do `help(module_name)`.

```python
>>> import time
>>> print(time.__doc__)
This module provides various functions to manipulate time values.

There are two standard representations of time.  One is the number...
>>> help(time)
Help on built-in module time:

NAME
    time - This module provides various functions to manipulate time values.

DESCRIPTION
    There are two standard representations of time.  One is the number...
```

> More Python trivia: this is why the [PEP8 style guide](https://python.org/dev/peps/pep-0008) says "docstrings should have a line length of 72 characters": because docstrings can be indented upto two levels in the `help()` message, so to neatly fit on an 80-character wide terminal they must be at a maximum, 72 characters wide.

### `__package__`

The package to which this module belongs. For top-level modules it is the same as `__name__`. For sub-modules it is the package's `__name__`. For example:

```python
>>> import urllib.request
>>> urllib.__package__
'urllib'
>>> urllib.request.__package__
'urllib'
```

### `__spec__`

This refers to the module spec. It contains metadata such as the module name, what kind of module it is, as well as how it was created and loaded.

```python
$ tree mytest
mytest
└── a
    └── b.py

1 directory, 1 file

$ python -q
>>> import mytest.a.b
>>> mytest.__spec__
ModuleSpec(name='mytest', loader=<_frozen_importlib_external._NamespaceLoader object at 0x7f28c767e5e0>, submodule_search_locations=_NamespacePath(['/tmp/mytest']))
>>> mytest.a.b.__spec__
ModuleSpec(name='mytest.a.b', loader=<_frozen_importlib_external.SourceFileLoader object at 0x7f28c767e430>, origin='/tmp/mytest/a/b.py')
```

You can see through it that, `mytest` was located using something called `NamespaceLoader` from the directory `/tmp/mytest`, and `mytest.a.b` was loaded using a `SourceFileLoader`, from the source file `b.py`.

### `__loader__`

Let's see what this is, directly in the REPL:

```python
>>> __loader__
<class '_frozen_importlib.BuiltinImporter'>
```

The `__loader__` is set to the loader object that the import machinery used when loading the module. This specific one is defined within the `_frozen_importlib` module, and is what's used to import the builtin modules.

Looking slightly more closely at the example before this, you might notice that the `loader` attributes of the module spec are `Loader` classes that come from the slightly different `_frozen_importlib_external` module.

So you might ask, what are these weird `_frozen` modules? Well, my friend, it's exactly as they say &mdash; they're _frozen modules_.

The _actual_ source code of these two modules is actually inside the `importlib.machinery` module. These `_frozen` aliases are frozen versions of the source code of these loaders. To create a frozen module, the Python code is compiled to a code object, marshalled into a file, and then added to the Python executable.

Python freezes these two modules because they implement the core of the import system and, thus, cannot be imported like other Python files when the interpreter boots up. Essentially, they are needed to exist to _bootstrap the import system_.

Funnily enough, there's another well-defined frozen module in Python: it's `__hello__`:

```python
>>> import __hello__
Hello world!
```

Is this the shortest hello world code in any language? :P

Well this `__hello__` module was originally added to Python as a test for frozen modules, to see whether or not they work properly. It has stayed in the language as an easter egg ever since.

### `__import__`

`__import__` is the builtin function that defines how import statements work in Python.

```python
>>> import random
>>> random
<module 'random' from '/usr/lib/python3.9/random.py'>
>>> __import__('random')
<module 'random' from '/usr/lib/python3.9/random.py'>
>>> np = __import__('numpy')  # Same as doing 'import numpy as np'
>>> np
<module 'numpy' from '/home/tushar/.local/lib/python3.9/site-packages/numpy/__init__.py'>
```

Essentially, every import statement can be translated into an `__import__` function call. Internally, that's pretty much what Python is doing to the import statements (but directly in C).

> Now, there's three more of these properties left: `__debug__` and `__build_class__` which are only present globally and are not module variables, and `__cached__`, which is only present in imported modules.

### `__debug__`

This is a global, constant value in Python, which is almost always set to `True`.

What it refers to, is Python running in _debug mode_. And Python always runs in debug mode by default.

The other mode that Python can run in, is _"optimized mode"_. To run python in "optimized mode", you can invoke it by passing the `-O` flag. And all it does, is prevents assert statements from doing anything (at least so far), which is in all honesty, not really useful at all.

```python
$ python
>>> __debug__
True
>>> assert False, 'some error'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError: some error
>>>

$ python -O
>>> __debug__
False
>>> assert False, 'some error'
>>>
```

Also, `__debug__`, `True` `False` and `None` are the only **true constants** in Python, i.e. these 4 are the only global variables in Python that you cannot overwrite with a new value.

```python
>>> True = 42
  File "<stdin>", line 1
    True = 42
    ^
SyntaxError: cannot assign to True
>>> __debug__ = False
  File "<stdin>", line 1
SyntaxError: cannot assign to __debug__
```

### `__build_class__`

This global was added in Python 3.1, to allow for class definitions to accept arbitrary positional and keyword arguments. There are long, technical reasons to why this is a feature, and it touches advanced topics like metaclasses, so unfortunately I won't be explaining why it exists.

But all you need to know is that this is what allows you to do things like this while making a class:

```python
>>> class C:
...     def __init_subclass__(self, **kwargs):
...         print(f'Subclass got data: {kwargs}')
...
>>> class D(C, num=42, data='xyz'):
...     pass
...
Subclass got data: {'num': 42, 'data': 'xyz'}
>>>
```

Before Python 3.1, The class creation syntax only allowed passing base classes to inherit from, and a metaclass property. The new requirements were to allow variable number of positional and keyword arguments. This would be a bit messy and complex to add to the language.

But, we already have this, of course, in the code for calling regular functions. So it was proposed that the `Class X(...)` syntax will simply delegate to a function call underneath: `__build_class__(cls, ...)`.

### `__cached__`

This is an interesting one.

When you import a module, the `__cached__` property stores the path of the cached file of the **compiled Python bytecode** of that module.

"What?!", you might be saying, "Python? Compiled?"

Yeah. Python _is_ compiled. In fact, all Python code is compiled, but not to machine code &mdash; to **bytecode**. Let me explain this point by explaining how Python runs your code.

Here are the steps that the Python interpreter does to run your code:

- It takes your source file, and parses it into a syntax tree. The syntax tree is a representation of your code that can be more easily understood by a program. It finds and reports any errors in the code's syntax, and ensures that there are no ambiguities.
- The next step is to compile the source file into _bytecode_. This bytecode is a set of micro-instructions for **Python's virtual machine**. This "virtual machine" is where Python's interpreter logic resides. It essentially _emulates_ a very simple stack-based computer on your machine, in order to execute the Python code written by you.
- This bytecode-form of your code is then run on the Python VM. The bytecode instructions are simple things like pushing and popping data off the current stack. Each of these instructions, when run one after the other, executes the entire program.

> We will take a really detailed example of the steps above, in the next section. Hang tight!

Now since the "compiling to bytecode" step above takes a noticeable amount of time when you import a module, Python stores _(marshalls)_ the bytecode into a `.pyc` file, and stores it in a folder called `__pycache__`. The `__cached__` parameter of the imported module then points to this `.pyc` file.

When the same module is imported again at a later time, Python checks if a `.pyc` version of the module exists, and then directly imports the already-compiled version instead, saving a bunch of time and computation.

If you're wondering: yes, you can directly run or import a `.pyc` file in Python code, just like a `.py` file:

```python
>>> import test
>>> test.__cached__
'/usr/lib/python3.9/test/__pycache__/__init__.cpython-39.pyc'
>>> exit()

$ cp '/usr/lib/python3.9/test/__pycache__/__init__.cpython-39.pyc' cached_test.pyc
$ python
>>> import cached_test  # Runs!
>>>
```

## All the builtins, one by one

Now we can finally get on with builtins. And, to build upon the last section, let's start this off with some of the most interesting ones, the ones that build the basis of Python as a language.

### `compile`, `exec` and `eval`

In the previous section, we saw the 3 steps required to run some python code. This section will get into details about the 3 steps, and how you can observe exactly what Python is doing.

Let's take this code as an example:

```python
x = [1, 2]
print(x)
```

You can save this code into a file and run it, or type it in the Python REPL. In both the cases, you'll get an output.

Or thirdly, you can give the program as a string to Python's builtin function `exec`:

```python
>>> code = '''
... x = [1, 2]
... print(x)
... '''
>>> exec(code)
[1, 2]
```

`exec` (short for execute) takes in some Python code as a string, and runs it as Python code. By default, `exec` will run in the same scope as the rest of your code, which means, that it can read and manipulate variables just like any other piece of code in your Python file.

```python
>>> x = 5
>>> exec('print(x)')
5
```

`exec` allows you to run truly dynamic code at runtime. You could, for example, download a Python file from the internet at runtime, pass its content to `exec` and it will run it for you. (But please, never, ever do that.)

For the most part, you don't really need `exec` while writing your code. It's useful for implementing some really dynamic behaviour (such as creating a dynamic class at runtime, like `collections.namedtuple` does), or to modify the code being read from a Python file (like in [zxpy](https://github.com/tusharsadhwani/zxpy/blob/3e4eb5e344601cc5a1b4e4f9f72ac3f30111cc93/zx.py#L304)).

But, that's not the main topic of discussion today. We must learn _how_ `exec` does all of these fancy runtime things.

`exec` can not only take in a string and run it as code, it can also take in a **code object**.

Code objects are the "bytecode" version of Python programs, as discussed before. They contain not only the exact instructions generated from your Python code, but it also stores things like the variables and the constants used inside that piece of code.

Code objects are generated from ASTs (abstract syntax trees), which are themselves generated by a parser that runs on a string of code.

Now, if you're still here after all that nonsense, let's try to learn this by example instead. We'll first generate an AST from our code using the `ast` module:

```python
>>> import ast
>>> code = '''
... x = [1, 2]
... print(x)
... '''
>>> tree = ast.parse(code)
>>> print(ast.dump(tree, indent=2))
Module(
  body=[
    Assign(
      targets=[
        Name(id='x', ctx=Store())],
      value=List(
        elts=[
          Constant(value=1),
          Constant(value=2)],
        ctx=Load())),
    Expr(
      value=Call(
        func=Name(id='print', ctx=Load()),
        args=[
          Name(id='x', ctx=Load())],
        keywords=[]))],
  type_ignores=[])
```

It might seem a bit too much at first, but let me break it down.

The `AST` is taken as a python module (the same as a Python file in this case).

```python
>>> print(ast.dump(tree, indent=2))
Module(
  body=[
    ...
```

The module's body has two children (two statements):

- The first is an `Assign` statement...

  ```python
  Assign(
      ...
  ```

  Which assigns to the target `x`...

  ```python
      targets=[
        Name(id='x', ctx=Store())],
      ...
  ```

  The value of a `list` with 2 constants `1` and `2`.

  ```python
      value=List(
        elts=[
          Constant(value=1),
          Constant(value=2)],
        ctx=Load())),
    ),
  ```

- The second is an `Expr` statement, which in this case is a function call...

  ```python
    Expr(
      value=Call(
        ...
  ```

  Of the name `print`, with the value `x`.

  ```python
      func=Name(id='print', ctx=Load()),
        args=[
          Name(id='x', ctx=Load())],
  ```

Doesn't seem that bad now, right?

So now we have an AST object. We can _compile_ it into a code object using `compile`. Running `exec` on the code object will do the same thing:

```python
>>> import ast
>>> code = '''
... x = [1, 2]
... print(x)
... '''
>>> tree = ast.parse(code)
>>> code_obj = compile(tree, 'myfile.py', 'exec')
>>> exec(code_obj)
[1, 2]
>>>
```

But now, we can look into what a code object looks like. Let's examine some of its properties:

```python
>>> code_obj.co_code
b'd\x00d\x01g\x02Z\x00e\x01e\x00\x83\x01\x01\x00d\x02S\x00'
>>> code_obj.co_filename
'myfile.py'
>>> code_obj.co_names
('x', 'print')
>>> code_obj.co_consts
(1, 2, None)
```

You can see that the variables `x` and `print` used in the code, as well as the constants `1` and `2`, plus a lot more information about our code file is available inside the code object. This has all the information needed to directly run in the Python virtual machine, in order to produce that output.

If you want to dive deep into what the bytecode means, the extras section below on the `dis` module will cover that.

<details>
<summary>Extras: the "dis" module</summary>

The `dis` module in Python ...

```python
>>> import dis
>>> dis.dis('''
... x = [1, 2]
... print(x)
... ''')
  1           0 LOAD_CONST               0 (1)
              2 LOAD_CONST               1 (2)
              4 BUILD_LIST               2
              6 STORE_NAME               0 (x)

  2           8 LOAD_NAME                1 (print)
             10 LOAD_NAME                0 (x)
             12 CALL_FUNCTION            1
             14 POP_TOP
             16 LOAD_CONST               2 (None)
             18 RETURN_VALUE
>>>
```

It shows that:

- Line 1 creates 4 bytecodes, to load 2 constants `1` and `2` onto the stack, build a list from the top `2` values on the stack, and store it into the variable `x`.
- Line 2 creates 6 bytecodes, it loads `print` and `x` onto the stack, and calls the function on the stack with the `1` argument on top of it. Then it gets rid of the return value from the call by doing `POP_TOP` because we didn't use or store the return value from `print(x)`. The two lines at the end returns `None` from the end of the file's execution, which does nothing.

Each of these bytecodes is 2 bytes long when stored as opcodes, that's why the numbers to the left of the opcodes are spaces 2 away from each other. It shows that this entire code is 20 bytes long. And indeed, if you do:

```python
>>> code_obj = compile('''
... x = [1, 2]
... print(x)
... ''', 'test', 'exec')
>>> code_obj.co_code
b'd\x00d\x01g\x02Z\x00e\x01e\x00\x83\x01\x01\x00d\x02S\x00'
>>> len(code_obj.co_code)
20
```

You can confirm that the bytecode generated is exactly 20 bytes.

</details>

`eval` is pretty similar to exec, except it only accepts expressions (not statements or a set of statements like `exec`), and unlike `exec`, it returns a value &mdash; the result of said expression.

Here's an example:

```python
>>> result = eval('1 + 1')
>>> result
2
```

You can also go the long, detailed route with `eval`, you just need to tell `ast.parse` and `compile` that you're expecting to evaluate this code for its value, instead of running it like a Python file.

```python
>>> expr = ast.parse('1 + 1', mode='eval')
>>> code_obj = compile(expr, '<code>', 'eval')
>>> eval(code_obj)
2
```

### `input`, `print`

### `bool`, `chr`, `complex`, `float`, `int`, `str`

### `object`

### `type`

### `bytes`, `bytearray`, `memoryview`

### `dict`, `frozenset`, `list`, `set`, `tuple`

### `ascii`, `bin`, `hex`, `oct`, `ord`

### `format`

### `all`, `any`

### `dir`, `vars`

### `hash`, `id`

### `abs`, `divmod`, `pow`, `round`

### `isinstance`, `issubclass`, `callable`

### `property`, `classmethod`, `staticmethod`

### `super`

### `len`, `max`, `min`, `sum`

### `map`, `filter`

### `iter`, `next`

### `range`, `enumerate`, `zip`

### `slice`

### `sorted`, `reversed`

### `globals`, `locals`

### `delattr`, `getattr`, `hasattr`, `setattr`

### `breakpoint`

### `repr`

### `open`

### `help`, `exit`, `quit`

-- defined in site module

### `copyright`, `credits`, `license`

## Where to learn more?

Through python's docs :D