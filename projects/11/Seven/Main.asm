(Main.main) // function Main.main 0
D=0
@1 // push constant 1
D=A
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
@3 // push constant 3
D=A
@SP
A=M
M=D
@SP
M=M+1
@Math.multiply$ret.0.2826817039023499 // call Math.multiply 2
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@2
D=A
@5
D=D+A
@SP
D=M-D
@ARG
M=D
@SP
D=M
@LCL
M=D
@Math.multiply
0;JMP
(Math.multiply$ret.0.2826817039023499)
@SP // add
M=M-1
@SP
A=M
D=M
@SP
A=M
A=A-1
M=M+D
@Output.printInt$ret.0.2820029150769954 // call Output.printInt 1
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@1
D=A
@5
D=D+A
@SP
D=M-D
@ARG
M=D
@SP
D=M
@LCL
M=D
@Output.printInt
0;JMP
(Output.printInt$ret.0.2820029150769954)
