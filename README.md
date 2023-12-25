# BeFunge 93 IDE Readme
<details>
  <summary>❓Why my commits often have no names and I'm not using branches❓</summary>
  <ul>
    <li>I often create with bursts many things at once</li>
    <li>I don't plan things ahead, I just create things that seems good at that moment</li>
    <li>Sometimes I have bad internet connection and it is troublesome to send commits</li>
    <li>I'm coding alone so creating branches and describing commits is not useful for me</li>
  <ul>
</details>

## Table of Contents
* [Informations](#informations)
  * [Technologies](#technologies)
  * [Features](#features)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details](#details)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

## Informations
Befunge 93 interpreter with visualization on grid, debugger and nyan cats pixel animations.<br>
See [live demo](https://pas-artur.000webhostapp.com/BeFunge93Interpreter/).

![preview](/_for_readme/preview.png)

----------------------------------

### Technologies
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
  
----------------------------------

### Features
- Interpretation of given code program
- Visualisation of program in grid, stack and interactive console
- Program controls (load, execute, run, step, stop)
- Breakpoints that pause program execution
- Information about language and exapmle programs
- Table with instructions
- Settings:
  - Speed
  - Pointer and breakpoint color
  - Grid lines visibility
- Nyan cats animations:
  - Defualt nyan cat
  - Gameboy nyan cat
  - Rasta nyan cat
  - Christmas nyan cat
  - Mexican nyan cat
- Multiple languages:
  - Polish
  - English

<br>

> [!NOTE]  
> Room for improvements:
> - Instruction how to use the program
> - Unlimited program grid size
> - Editing program on the grid
> - Zooming grid in and out
> - Skipping over empty cells
> - Hilighting program path
> - Execution that is not blocking the webiste
> - Faster execution

----------------------------------

### Setup
Ways to run this program: 
1. Use the [live demo](https://pasek108.github.io/ConnectGame/)
2. Download this repo and run index.html file
3. Download this repo and start live server ([VSCode LiveServer Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), Prepros preview etc.) 

To edit this program:
- Download this repo
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Start coding

----------------------------------

### Acknowledgements
- [Befunge - esolangs wiki](https://esolangs.org/wiki/Befunge)
- [Befunge 93 documentation](https://github.com/catseye/Befunge-93/blob/master/doc/Befunge-93.markdown)
- [mikescher Project Euler with Befunge](https://www.mikescher.com/blog/1/Project_Euler_with_Befunge)
- [qiao visual befunge93 interpreter](http://qiao.github.io/javascript-playground/visual-befunge93-interpreter/) 
- [jsFunge IDE](https://rutteric.com/software/fungejs/index.html)
- [bedroomlan - befunge playground](https://www.bedroomlan.org/tools/befunge-playground/#prog=gcd,mode=run)

<br>

## Details
This section is a general description of the project required to understand how it works, the exact details are in the code or simply are the code.

### User interface
#### Main menu
![main menu](/_for_readme/main_menu.png)


----------------------------------

#### Main menu
![main menu](/_for_readme/main_menu.png)

----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: TicTacToe (project folder)
  - :page_facing_up: *github and prepros config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
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
  - :file_folder: js - :page_facing_up: *scripts used in the project*
  - :file_folder: css
    - :page_facing_up: *css files compiled by prepros*
    - :file_folder: less - :page_facing_up: *less files*

----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instance of each of the classes:
- MenuWindow (Credits)
- Difficulty
- TopScore
- Game

Difficulty and TopScore classes are extension of MenuWindow class which is responsible for showing and hiding menu window with transition

Game class creates and manages:
- One instance of RoadBackground class
- Two instances of treesBackground class (left and right side)
- One instance of classes:
  - HealthBar
  - EnergyBar
  - PointsCounter
  - GameOver
- One instance of Player class
- Many instances of classes:
  - Enemy
  - Deer
  - HappyDeer

