# Forsure MVP Architecture

## Goal

Build the smallest complete teaching loop before adding a large course catalog.

```text
Browser
  ├── Tutor UI
  ├── Visual lesson
  └── Code editor
        ↓
     Forsure API
        ├── Tutor engine
        ├── Learner state
        └── Sandboxed code runner
                ↓
          mastery + feedback
                ↓
          next teaching step
```

## First milestone

A complete beginner should finish one lesson and independently write and explain a small Python program.

## Initial concepts

1. What is a program?
2. Values and variables
3. Numbers and strings
4. Input and output
5. Conditions
6. Loops
7. Functions
8. Lists
9. Dictionaries
10. Debugging
11. Small project

This is a starting curriculum, not a rigid path.

## Learner state

Eventually track:

- mastery
- confidence
- recent attempts
- recurring misconceptions
- examples that worked
- last reviewed
- next review
- independent performance

## Safety

Code execution must be sandboxed. Never execute learner code directly inside the application server process.

## Engineering rule

Build the teaching loop first. Add voice, rich animations, more languages, social features, and advanced career tracks after the core experience works.
