# Whitespace

>Whitespace is an esoteric programming language developed by Edwin Brady and Chris Morris at the University of Durham (also developers of the Kaya and Idris programming languages). It was released on 1 April 2003 (April Fool's Day). Its name is a reference to whitespace characters. Unlike most programming languages, which ignore or assign little meaning to most whitespace characters, the Whitespace interpreter ignores any non-whitespace characters. Only spaces, tabs and linefeeds have meaning. A consequence of this property is that a Whitespace program can easily be contained within the whitespace characters of a program written in another language, except possibly in languages which depend on spaces for syntax validity such as Python, making the text a polyglot.
>
>The language itself is an imperative stack-based language. The virtual machine on which the programs run has a stack and a heap. The programmer is free to push arbitrary-width integers onto the stack (currently there is no implementation of floating point numbers) and can also access the heap as a permanent store for variables and data structures.

https://en.wikipedia.org/wiki/Whitespace_(programming_language)


# Syntax

IMP             | Meaning           
--------------- | ------------------
[Space]         | Stack Manipulation
[Tab][Space]    | Arithmetic        
[Tab][Tab]      | Heap Access       
[LF]            | Flow Control      
[Tab][LF]       | I/O               

IMP          | Command        | Parameter | Meaning                                                                    
------------ | -------------- | --------- | ---------------------------------------------------------------------------
[Space]      | [Space]        | Number    | Push the number onto the stack                                             
[Space]      | [LF][Space]    | -         | Duplicate the top item on the stack                                        
[Space]      | [LF][Tab]      | -         | Swap the top two items on the stack                                        
[Space]      | [LF][LF]       | -         | Discard the top item on the stack                                          
[Tab][Space] | [Space][Space] | -         | Addition                                                                   
[Tab][Space] | [Space][Tab]   | -         | Subtraction                                                                
[Tab][Space] | [Space][LF]    | -         | Multiplication                                                             
[Tab][Space] | [Tab][Space]   | -         | Integer Division                                                           
[Tab][Space] | [Tab][Tab]     | -         | Modulo
[Tab][Tab]   | [Space]        | -         | Store in heap                                                              
[Tab][Tab]   | [Tab]          | -         | Retrieve from heap                                                         
[LF]         | [Space][Space] | Label     | Mark a location in the program                                             
[LF]         | [Space][Tab]   | Label     | Call a subroutine                                                          
[LF]         | [Space][LF]    | Label     | Jump to a label                                                            
[LF]         | [Tab][Space]   | Label     | Jump to a label if the top of the stack is zero                            
[LF]         | [Tab][Tab]     | Label     | Jump to a label if the top of the stack is negative                        
[LF]         | [Tab][LF]      | -         | End a subroutine and transfer control back to the caller                   
[LF]         | [LF][LF]       | -         | End the program                                                            
[Tab][LF]    | [Space][Space] | -         | Output the character at the top of the stack                               
[Tab][LF]    | [Space][Tab]   | -         | Output the number at the top of the stack                                  

<!-- 
[Tab][LF]    | [Tab][Space]   | -         | Read a character and place it in the location given by the top of the stack
[Tab][LF]    | [Tab][Tab]     | -         | Read a number and place it in the location given by the top of the stack   
 -->
