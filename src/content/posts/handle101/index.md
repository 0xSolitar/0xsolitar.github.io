---
title: Handles for Beginners
published: 2026-03-29
description: "Practical guide to start Windows System Programming"
tags: ["C++", "Win32"]
category: Windows Internals
draft: false
---

> Yes, the Win32 API is a massive mess
## Introduction

Windows is an object-based operating system, exposing various types of object for use by user mode processes, and the kernel itself. An object, also called kernel object is a data structure that represents a system resource such as file, thread, and process.

## Handles 101
  
Those kernel objects reside in the kernel space, and can't be accessed directly. For an application to use them, it must use a __HANDLE__.
While the win32 api defines a handle as a __void__ pointer:
```c
typedef void *HANDLE;
```
it's an opaque identifier used by Windows to reference a kernel object, and should not be used like regular pointer and its value should never be manipulated directly.

## Working with handles

Before diving into code, it is worth to mention that we'll be working with Unicode as it is recommended over ASCII. I won't explain how it works since there's already an article dedicated to it. You can find it here: [Windows Programming/Unicode](https://en.wikibooks.org/wiki/Windows_Programming/Unicode).  
Unicode is the default on Visual Studio. On other IDE, defining the macro UNICODE will automatically translate all functions to the Unicode version. For this article I will be using Vscode and Clang to keep thing simple.

```c
#ifndef UNICODE
#define UNICODE
#endif
```

In this example, we are going to see how to create a file.  
First we need to include the header windows.h and iostream for I/O
```c
#include <windows.h>
#include <iostream>
```
The function for creating a file is the following:
```c
// 
HANDLE CreateFile(
  [in]           LPCWSTR                lpFileName,
  [in]           DWORD                 dwDesiredAccess,
  [in]           DWORD                 dwShareMode,
  [in, optional] LPSECURITY_ATTRIBUTES lpSecurityAttributes,
  [in]           DWORD                 dwCreationDisposition,
  [in]           DWORD                 dwFlagsAndAttributes,
  [in, optional] HANDLE                hTemplateFile
);
```
The documentation provided by [Windows](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessw) has the full description of each parameter, but there are few thing that need to be explained.  
First, what are those things between square bracket? It is called `Source Code Annotation Language` or `SAL` for short. It describe how functions use their parameters and return values.   
`[in]` means the parameter is an input, the function will read the value of the variable. `[optional]` for optional, `[in, optional]` then means its an optional input, you can pass __NULL__ or __nullptr__. And `[out]` means the function will write back to the parameter. It can also be all of it at the same time, if it is `[in, out]` then the parameter is both read and written by the function.  

You can read more about SAL here: [Microsoft SAL documentation](https://learn.microsoft.com/en-us/cpp/code-quality/understanding-sal)  

Now lets see the data type used here. The win32 api is notorious for having an unreadable and confusing data type. They are actually just typedefs for standard C types.  `LPWSTR` is a wide string pointer, not to be confused with `LPCSTR` which is the ASCII version. To make life easier, use `wchar_t*` or `std::wstring` when working with wide string. `LPCWSTR` is the `const` version, so you must use `const wchar_t*` or `const std::wstring`.  
`DWORD`is a 32-bit unsigned integer, defined as:
```c
typedef unsigned long DWORD
```
`LPVOID` is a generic pointer. The catch here is that if the data type start with `LP` like `LPDWORD` then you pass by pointer, not by value. Those 2 characters means __L=Long__ __P=Pointer__. The term long actually means nothing since all pointers are the same size on Windows (4 bytes in 32-bit processes and 8 bytes in 64-bit processes).  
I wont explain parameters that are optional, and if some of these doesn't make sense at first then it's fine. The more you use a function, the clearer it becomes.  

With this function, we can create a file, and receive a __handle__ to it. We can then work with this handle to do operation like reading or writing to the file.  

Here's how we can use this function:
```c
    HANDLE fileHandle = CreateFile(
        L"test.txt",
        GENERIC_READ | GENERIC_WRITE, // we want to both read and write
        FILE_SHARE_READ,
        NULL,
        OPEN_ALWAYS, // creates the file if it doesn't exist and opens it if it does
        FILE_ATTRIBUTE_NORMAL,
        NULL);
```
If the function failed, it returns an `INVALID_HANDLE_VALUE`. A call to `GetLastError()` will return a DWORD error code corresponding to the failure. It is always best to check if the function succeed or not.  
__NOTE:__ Some other Win32 functions return NULL on failure, but CreateFile uses INVALID_HANDLE_VALUE. Always check the docs!

```c
if (fileHandle == INVALID_HANDLE_VALUE) {
    DWORD error = GetLastError();
    std::cerr << "CreateFile failed, error: " << error;
    return 1;
}
```
There are better way to handle error, like formatting the error code into a string, but that is for another time. You can always take a look here [Error Handling](https://learn.microsoft.com/en-us/windows/win32/debug/retrieving-the-last-error-code).  

Now that we have a handle to the file, we can do various operation to it.  

### Exercise
A little challenge: write something to the file, read it back and output its content to the console.
You can use [ReadFile](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-readfile) and [WriteFile](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-writefile)

### Don't forget to close the handle after usage
```c
CloseHandle(fileHandle);
```

## Conclusion
Since the Win32 api is low level, getting started can be very overwhelming. But once you know how to read the documentation provided by Microsoft, you can easily do research on your own. Until next time!
