@256  //Bootstrap code
D=A
@SP
M=D
@Sys.init$ret.0.17998697942647435 
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
@0
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
@Sys.init
0;JMP
(Sys.init$ret.0.17998697942647435)
//Class1.vm
(Class1.set) // function Class1.set 0
D=0
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
@SP // pop static 0
M=M-1
A=M
D=M
@Class1.vm.0
M=D
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
@SP // pop static 1
M=M-1
A=M
D=M
@Class1.vm.1
M=D
@0 // push constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL // return
D=M
@R13
M=D
@5
D=A
@R13
A=M-D
D=M
@R14
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@1
D=A
@R13
A=M-D
D=M
@THAT
M=D
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D
@R14
A=M
0;JMP
(Class1.get) // function Class1.get 0
D=0
@Class1.vm.0
D=M
@SP
A=M
M=D
@SP
M=M+1
@Class1.vm.1
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
@LCL // return
D=M
@R13
M=D
@5
D=A
@R13
A=M-D
D=M
@R14
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@1
D=A
@R13
A=M-D
D=M
@THAT
M=D
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D
@R14
A=M
0;JMP
//Class2.vm
(Class2.set) // function Class2.set 0
D=0
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
@SP // pop static 0
M=M-1
A=M
D=M
@Class2.vm.0
M=D
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
@SP // pop static 1
M=M-1
A=M
D=M
@Class2.vm.1
M=D
@0 // push constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL // return
D=M
@R13
M=D
@5
D=A
@R13
A=M-D
D=M
@R14
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@1
D=A
@R13
A=M-D
D=M
@THAT
M=D
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D
@R14
A=M
0;JMP
(Class2.get) // function Class2.get 0
D=0
@Class2.vm.0
D=M
@SP
A=M
M=D
@SP
M=M+1
@Class2.vm.1
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
@LCL // return
D=M
@R13
M=D
@5
D=A
@R13
A=M-D
D=M
@R14
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@1
D=A
@R13
A=M-D
D=M
@THAT
M=D
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D
@R14
A=M
0;JMP
//Sys.vm
(Sys.init) // function Sys.init 0
D=0
@6 // push constant 6
D=A
@SP
A=M
M=D
@SP
M=M+1
@8 // push constant 8
D=A
@SP
A=M
M=D
@SP
M=M+1
@Class1.set$ret.0.5816127086021692 // call Class1.set 2
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
@Class1.set
0;JMP
(Class1.set$ret.0.5816127086021692)
@SP // pop temp 0
M=M-1
A=M
D=M
@5
M=D
@23 // push constant 23
D=A
@SP
A=M
M=D
@SP
M=M+1
@15 // push constant 15
D=A
@SP
A=M
M=D
@SP
M=M+1
@Class2.set$ret.0.08332606388231323 // call Class2.set 2
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
@Class2.set
0;JMP
(Class2.set$ret.0.08332606388231323)
@SP // pop temp 0
M=M-1
A=M
D=M
@5
M=D
@Class1.get$ret.0.5270760093671747 // call Class1.get 0
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
@0
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
@Class1.get
0;JMP
(Class1.get$ret.0.5270760093671747)
@Class2.get$ret.0.8211905069245813 // call Class2.get 0
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
@0
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
@Class2.get
0;JMP
(Class2.get$ret.0.8211905069245813)
(Sys.vm.END) // label END
@Sys.vm.END // goto END
0;JMP