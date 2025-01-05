<h1 align="center">Befunge93Interpreter - Readme</h1>
<p align="center">
  <strong>
    BeFunge93 interpreter with grid visualisation, debugging tools and nyan cats animations
  </strong>
</p>

<!-- 
<div align="center">
  <a href="https://www.ur.edu.pl/pl/kolegia/kolegium-nauk-przyrodniczych">
    <img src="_for_readme/ur_banner.jpg?">
  </a>
</div>-->

<br>

# Table of Contents
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Features](#features)
  * [Technologies](#technologies)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details :scroll:](#details-scroll)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

# Overview :sparkles:

## About
This project is a visual interpreter and debugger for the [esoteric programming language](https://en.wikipedia.org/wiki/Esoteric_programming_language) [Befunge93](https://esolangs.org/wiki/Befunge). While this interpreter is not the fastest, I believe it is easy to use for beginners. It also includes five built-in Nyan Cat animations as a fun stress-relief feature.

Check out the [live version](https://pasek108.github.io/BeFunge93Interpreter/).

<br>

![preview](/_for_readme/preview.png)

## Technologies
Languages:
- HTML5
- CSS3
- JS ES2018

Libraries and frameworks:
- [LESS](https://lesscss.org)
- [FontAwesome](https://fontawesome.com) 6.4.0
- [GoogleFonts](https://fonts.google.com)
  
Programs:
- [VSCode](https://code.visualstudio.com)
- [Prepros](https://prepros.io) (auto preview, processing less)

## Features
- Interpretation of Befunge93 code programs
- Visualization of programs in a grid, stack, and interactive console
- Program controls:
  - Load
  - Execute
  - Run
  - Step
  - Stop
  - Breakpoints
- Settings:
  - Speed
  - Pointer and breakpoint colors
  - Grid line visibility
- Information about the language and a table with instructions
- Support for multiple languages
- Example programs
- Nyan cat animations:
  - Default Nyan Cat
  - Gameboy Nyan Cat
  - Rasta Nyan Cat
  - Christmas Nyan Cat
  - Mexican Nyan Cat

<br>

> [!NOTE]  
> Room for improvements:
> - Instructions on how to use the webiste
> - Editing the program directly on the grid
> - Unlimited program grid size
> - Zooming the grid in and out
> - Moving the grid by mouse
> - Highlighting the program path
> - Skipping over empty cells
> - Faster and parallel execution
> - Challenges to help users learn the language

## Setup
Ways to run this program: 
1. Use the [live version](https://pasek108.github.io/BeFunge93Interpreter/)
2. Download this repository and run index.html file
3. Download this repository and start live server ([VSCode LiveServer Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), Prepros preview etc.) 

To edit this program:
- Download this repository
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Start coding

## Acknowledgements
- [Befunge - esolangs wiki](https://esolangs.org/wiki/Befunge)
- [Befunge 93 documentation](https://github.com/catseye/Befunge-93/blob/master/doc/Befunge-93.markdown)
- [mikescher Project Euler with Befunge](https://www.mikescher.com/blog/1/Project_Euler_with_Befunge)
- [qiao visual befunge93 interpreter](http://qiao.github.io/javascript-playground/visual-befunge93-interpreter/) 
- [jsFunge IDE](https://rutteric.com/software/fungejs/index.html)
- [bedroomlan - befunge playground](https://www.bedroomlan.org/tools/befunge-playground/#prog=gcd,mode=run)

<br>

# Details :scroll:

## User interface


## Project structure
- :file_folder: Befunge93Interpreter (project folder)
  - :page_facing_up: *github and prepros config files*
  - :page_facing_up: *github readme file*
  - :page_facing_up: *index.html and favicon.ico files*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: js - :page_facing_up: *scripts used in the project*
  - :file_folder: css
    - :page_facing_up: *css files compiled by prepros*
    - :file_folder: less - :page_facing_up: *less files*
  - :file_folder: language
    - :file_folder: en - :page_facing_up: *files for english language*
    - :file_folder: pl - :page_facing_up: *files for polish language*
  - :file_folder: nyan_cats
    - :page_facing_up: *nyan cat icon*
    - :file_folder: default - :page_facing_up: *files for default nyan cat*
    - :file_folder: gameboy - :page_facing_up: *files for gameboy nyan cat*
    - :file_folder: rasta - :page_facing_up: *files for rasta nyan cat*
    - :file_folder: christmas - :page_facing_up: *files for christmas nyan cat*
    - :file_folder: mexican - :page_facing_up: *files for mexican nyan cat*

## Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

