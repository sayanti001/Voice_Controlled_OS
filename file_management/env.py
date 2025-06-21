import os
import sys
os.system("echo $(pwd) >tmp.txt")
pwd=open("tmp.txt","r").read()
pwd=pwd[:-1:]
path=pwd+"/../file_bin'"
cmd="export PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:"+path+" >tmp.txt"
print(cmd)
os.system(cmd)
