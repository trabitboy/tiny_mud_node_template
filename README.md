# tiny_mud_node_template
tiny proof of concept of a node js multi user game,
created to support a twitter argument :o)

minimal proof of concept of server communication and multiple user in the same room
note : no gameplay to speak of, but all the required technical plumbing is there 

cd to the directory using node command prompt ,
launch with 
> node mud.js 8000

open multiple http://localhost:8000/index.html

you can move your X with cursor keys ,  other player positions are showed with o

poc remarks:
I spent far too much time losing myself in the options of jquery.ajax(),
I should have tested very simply all the method call types I would have required

next step :
gameplay :)
rules validation would need that action type is sent to the server
( depends on gameplay type implemented )