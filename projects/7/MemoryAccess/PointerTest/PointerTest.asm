@3030 // push constant 3030
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // pop pointer 0
M=M-1
A=M
D=M
@THIS
M=D
@3040 // push constant 3040
D=A
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
@32 // push constant 32
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // pop this 2
M=M-1
A=M
D=M
@R13
M=D
@2
D=A
@THIS
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
@46 // push constant 46
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // pop that 6
M=M-1
A=M
D=M
@R13
M=D
@6
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
@THIS // push pointer 0
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT // push pointer 1
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
@2 // push this 2
D=A
@THIS
A=M
A=D+A
D=M
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
@6 // push that 6
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
