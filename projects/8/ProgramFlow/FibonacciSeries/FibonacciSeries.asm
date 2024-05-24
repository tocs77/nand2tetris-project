@1 // push argument 1
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP // pop pointer 1
M=M-1
A=M
D=M
@THAT
M=D
@0 // push constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // pop that 0
M=M-1
A=M
D=M
@R13
M=D
@0
D=A
@THAT
A=M
D=D+A
@R14
M=D
@R13
A=M
D=A
@R14
A=M
M=D
@1 // push constant 1
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // pop that 1
M=M-1
A=M
D=M
@R13
M=D
@1
D=A
@THAT
A=M
D=D+A
@R14
M=D
@R13
A=M
D=A
@R14
A=M
M=D
@0 // push argument 0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@2 // push constant 2
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // sub
M=M-1
@SP
A=M
D=M
@SP
A=M
A=A-1
M=M-D
@SP // pop argument 0
M=M-1
A=M
D=M
@R13
M=D
@0
D=A
@ARG
A=M
D=D+A
@R14
M=D
@R13
A=M
D=A
@R14
A=M
M=D
(FibonacciSeries.LOOP) // label LOOP
@0 // push argument 0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP // if-goto COMPUTE_ELEMENT
AM=M-1
D=M
@FibonacciSeries.COMPUTE_ELEMENT
D;JNE
@FibonacciSeries.END // goto END
0;JMP
(FibonacciSeries.COMPUTE_ELEMENT) // label COMPUTE_ELEMENT
@0 // push that 0
D=A
@THAT
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@1 // push that 1
D=A
@THAT
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP // add
M=M-1
@SP
A=M
D=M
@SP
A=M
A=A-1
M=M+D
@SP // pop that 2
M=M-1
A=M
D=M
@R13
M=D
@2
D=A
@THAT
A=M
D=D+A
@R14
M=D
@R13
A=M
D=A
@R14
A=M
M=D
@THAT // push pointer 1
D=M
@SP
A=M
M=D
@SP
M=M+1
@1 // push constant 1
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // add
M=M-1
@SP
A=M
D=M
@SP
A=M
A=A-1
M=M+D
@SP // pop pointer 1
M=M-1
A=M
D=M
@THAT
M=D
@0 // push argument 0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@1 // push constant 1
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // sub
M=M-1
@SP
A=M
D=M
@SP
A=M
A=A-1
M=M-D
@SP // pop argument 0
M=M-1
A=M
D=M
@R13
M=D
@0
D=A
@ARG
A=M
D=D+A
@R14
M=D
@R13
A=M
D=A
@R14
A=M
M=D
@FibonacciSeries.LOOP // goto LOOP
0;JMP
(FibonacciSeries.END) // label END
