// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/4/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, 
// the screen should be cleared.

@color
M=0

(LOOP)
@KBD
D=M

@CLEAR // if no key pressed clear screen
D;JEQ

@FILL // fill screen if key pressed
0;JMP



/////////////////////////////////////////////////////
// Fill proc
(FILL)
  @color
  D=M
  @LOOP
  D;JLT //if color -1 no need fill

  @color
  M=-1  // change color to -1   1111111111  to fill screen
  @PAINT
  0;JMP

/////////////////////////////////////////////////////
// Clear proc
(CLEAR)
  @color
  D=M
  @LOOP
  D;JEQ //if color 0 no need clear

  @color
  M=0 // change color to 0 to clear screen
  @PAINT
  0;JMP


(PAINT)
  @8160
  D=A
  @blocks
  M=D

  @SCREEN
  D=A
  @R0
  M=D // R0 keep current address of screen to fill

(PAINT_LOOP)
  @blocks
  D=M
  @LOOP
  D;JEQ // check if last block



  @color
  D=M
  @R0
  A=M
  M=D // fill screen

  @R0
  M=M+1

  
  @blocks
  M=M-1 //Decrease blocs

  @PAINT_LOOP
  0;JMP