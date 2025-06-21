import os
import sys
code=""
def init():
    os.environ["pwd"]="/home/kali"
def replacer(cmd):
    t=""
    for i in cmd:
        if (i==',' or i==";"):
            t=t+" "
        else:
            t=t+i
    cmd=t
    return(cmd)

def executor(cmd):
    cmd=replacer(cmd)
    cmd=cmd.split()
    global code
    # print("pwd:",os.environ["pwd"])
    if(len(cmd)>2):
        cmd[2]=os.environ["pwd"]+"/"+cmd[2]
    if len(cmd)>3:
        cmd[3]=os.environ["pwd"]+"/"+cmd[3]
    if (cmd[0]=="read"):
        code="./read "+cmd[2]
    elif(cmd[0]=="create" and cmd[1]=="file"):
        code="./create "+cmd[2]
    elif(cmd[0]=="create" and cmd[1]=="directory"):
        code="./makedir "+cmd[2]
    elif(cmd[0]=="copy" and cmd[1]=="file"):
        code="./copy "+cmd[2]+" "+cmd[3]
    elif(cmd[0]=="copy" and cmd[1]=="directory"):
        code="./copy -r "+cmd[2]
    elif(cmd[0]=="rename" ):
        code="./move "+cmd[2]+" "+cmd[3]
    elif(cmd[0]=="remove" and cmd[1]=="file"):
        code="./remove "+cmd[2]
    elif(cmd[0]=="remove" and cmd[1]=="directory"):
        code="./remove -rf "+cmd[2]
    elif(cmd[0]=="change"):

        os.environ["pwd"]=cmd[2]

    elif(cmd[0]=="go"):
        os.environ["pwd"]=os.environ["pwd"]+"/.."
    elif(cmd[0]=="list"):
        code="./list "+os.environ["pwd"]
    else:
        return('-1')
    try:
        if(code!=""):
            # print(code)
            os.system(code+" >tmp.txt")
            code=""
            return(open("tmp.txt","r").read())
        code=""
       
    except:
        # print(code)
        code=""
        return('-1')
    
init()
print(executor("change directory challs"))
print(executor("change directory jail"))
print(executor("list files"))
# print(executor("read file challenge.yml"))
print(executor("go back"))
print(executor("create file heelo"))