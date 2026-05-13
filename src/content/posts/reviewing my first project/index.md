---
title: THE HALL OF SHAME INDUCTION CEREMONY
published: 2026-05-13
description: "Reviewing the first project I made 3 years ago"
tags: []
category: Yapping
draft: false
featured: false
---

Three years ago I made my very first programming project: a calculator written in Python. And, oh boy, the code is a masterpiece of chaos.

## LET THE CEREMONY BEGIN

Alright, buckle up, because this is going to be a wild ride. First, this isn't even a calculator. This is a `SyntaxError` waiting to happen that occasionally, by sheer accident, adds two numbers together. It's held together by `try/except` blocks like a sinking ship held together by duct tape and prayers. This is like summoning a demon and asking it to do algebra.  

This is __Gold Tier__ ... in the __Hall of Shame__. It's not the worst, but it's definitely the kind that makes experienced developers develop a sudden, deep interest in professional decaffeination.

## The `eval()` Apocalypse

Hooray! I made a calculator that can wipe the entire hard drive. Look at this:

```python
# insertion de la valeur de resultat dans l'entrée
formule.insert(0, eval(resultat))
```

Yes, I used `eval()` in a calculator, on a string built by concatenating user input. It's the programming equivalent of saying _"I'm not sure if this is poison, so I'll just drink it and see what happens"_. One day, someone will type `__import__('os').system('rm -rf /')` and the calculator will politely ask for sudo permission.

## The String Replacement Parser From Hell

Look at this mess, it's so beautiful:

```python
resultat = formule.get(){
resultat = resultat.replace(")(", ")*(")
resultat = resultat.replace("cos(", "math.cos(")
resultat = resultat.replace("sin(", "math.sin(")
resultat = resultat.replace("^", "**")
resultat = resultat.replace("log(", "math.log10(")
resultat = resultat.replace("tan(", "math.tan(")
resultat = resultat.replace("÷", "/")
resultat = resultat.replace("e(", "math.exp(")
resultat = resultat.replace("ln(", "math.log(")
resultat = resultat.replace("√(", "math.sqrt(")
resultat = resultat.replace("!(", "math.factorial(")
resultat = resultat.replace("%", "/100")
resultat = resultat.replace("π", "math.pi")

if "∛" in resultat:
    resultat = resultat.replace("∛", "")
    resultat = resultat+"** (1/3)"}
```

This is not a parser, it's a regex crime scene. What if someone types __"cosplay"__? The calculator will try to compute `math.cosplay(`. What happens with nested functions? __CHAOS__. What happens with whitespace? __PRAY__. I've essentially built a leper colony of `str.replace()` calls and hoped for the best.

## The `ANS` Button: A Disaster

```python
def ANS():
    formule.insert(0, eval(resultat))
```

Where is `resultat` defined? Oh wait, it's a `global` from the `calcul()` function! So if the user presses `ANS` before any calculation? __BOOM__. `NameError`. The program doesn't crash because I have no error handling there. Also, `eval()`-ing the previous result again. Why? __I DON'T KNOW__, just... insert the result string? Nope, let's just evaluate it for no reason.

## The Cube Root "Logic"

I assigned `racine_cubique = "∛"` — a whole named variable for the cube root symbol, and then never used the variable. Two lines later I hardcode "∛" directly. `racine_cubique` just sits there, unemployed, collecting dust, wondering why it was born — just like you and me.

```python
if "∛" in resultat:
    resultat = resultat.replace("∛", "")
    resultat = resultat+"** (1/3)"
```

So `"∛8"` becomes `"8** (1/3)"`. What about `"∛(27)"`? That becomes `"(27)** (1/3)"`. What about `"∛8+∛27"`? That becomes `"8+∛27** (1/3)"` (because I only check once, why, me from back then?). Absolute chaos.

This is not an implementation of cube root. It's an implementation of "hope and pray".

## The ON/OFF Buttons: A Theater of Absurdity

Yes, I destroy and recreate widgets, and I'm not ashamed!

```python
def create_off():
    formule.destroy()
    bouton_on.destroy()
    # create dead entry
    # create OFF button

def create_on():
    bouton_off.destroy()
    x.destroy()
    # recreate entry
    # recreate ON button
```

This is like turning off a car by removing the engine, then turning it back on by building a new engine from scratch. Why not just `.config(state='disabled')`? Why destroy and recreate? WHY ARE THERE TWO DIFFERENT ENTRY VARIABLES (`formule` AND `x`) FOR THE SAME THING? Because I was not a Googler back then, and hated the idea of using ChatGPT — it makes me look like I can't use my brain.  

This is spaghetti code written by a caffeinated raccoon, i.e. __ME__ !!!

## The Factorial Button: `"!("`

```python
bouton_parenthese1 = ctk.CTkButton(..., command=lambda: nombre("!("))
```

So if the user types `5` and presses `x!`, they get `5!(`. Then the parser replaces `!("` with `math.factorial(`. So `5!` becomes `5math.factorial(`. That's just painful to look at. That's not how math works. That's not how anything works.

## The Title: Unintentional Comedy

```python
titre = ctk.CTkLabel(maitre, text="1+1=2", font=("DS-Digital Italic", 72))
```

The title of the calculator is `"1+1=2"` in big font. It never changes. It will always say "1+1=2". Eternal. Immovable. Wait, that's not even a title. That's a captcha. That's the kind of confidence a toddler has when they say _"I'm a big kid now"_.

## The `effacer_dernier()` Function: A Masterpiece of Confusion

```python
def effacer_dernier():
    y = formule.get()
    z = y[:-1]
    if y == "Syntax Error":
        formule.delete(0, END)
    if y == "Math Error":
        formule.delete(0, END)
    else:
        formule.delete(0, END)
        formule.insert(0, z)
```

So if the display says `"Syntax Error"`, it just deletes it. Good. But why two separate `if` statements? Why not `elif`? Why does `"Math Error"` also get deleted but then the `else` runs because `y` isn't `"Syntax Error"`? Wait, the second `if` is independent, so if `y == "Math Error"`, it deletes the entry (leaving it empty), then the `else` runs because the condition `y == "Syntax Error"` was false, and it inserts the now-empty `z` (which is `""` because `y[:-1]` on `"Math Error"` gives `"Math Erro"` — but it already deleted it, so it's empty anyway).  

I got a headache just thinking that I wrote that. This function is a logic labyrinth.

# Verdict: Gloriously Bad

The code is a crime scene.

- Category: __"Works on My Machine"__ Delusion Tier
- Score: 4/10 Functional, 9/10 Educational
- Shame Rating: 11/10

This is it, guys. I created a glorious disaster. I will wear it like a badge of honor.

## Punishment

As a punishment, I wrote a reflective [PE loader](https://github.com/0xSolitar/PE-loader/blob/main/main.cpp). It takes a Windows executable and maps it into memory manually — headers, sections, relocations, imports, TLS callbacks, exception tables — and jumps to its entry point. There are things missing, and I made the error handling very minimal (never do that), but at least it's working and my eyes are not bleeding just by looking at it. I won't say where the source code for the calculator is, but it's somewhere very easy to find.
