from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import time

from deepgram import Deepgram
import asyncio, json, os

import os
import sys
code=""
def init():
    os.environ["pwd"]="/home/kali"
    os.system("export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/home/kali/os/OS-Project/file_bin/")
init()
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
    t=""
    cmd=replacer(cmd)
    cmd=cmd.split()
    global code
    # print("pwd:",os.environ["pwd"])
    if(len(cmd)>2):
        cmd[2]=os.environ["pwd"]+"/"+cmd[2]
    if len(cmd)>3:
        cmd[3]=os.environ["pwd"]+"/"+cmd[3]
    if (cmd[0]=="read"):
        code="/home/kali/os/OS-Project/file_bin/read "+cmd[2]
    elif(cmd[0]=="create" and cmd[1]=="file"):
        t="Copied"
        code="/home/kali/os/OS-Project/file_bin/create "+cmd[2]
    elif(cmd[0]=="create" and cmd[1]=="directory"):
        t="Created"
        code="/home/kali/os/OS-Project/file_bin/makedir "+cmd[2]
    elif(cmd[0]=="copy" and cmd[1]=="file"):
        t="Copied"
        code="/home/kali/os/OS-Project/file_bin/copy "+cmd[2]+" "+cmd[3]
    elif(cmd[0]=="copy" and cmd[1]=="directory"):
        t="Copied"
        code="/home/kali/os/OS-Project/file_bin/copy -r "+cmd[2]
    elif(cmd[0]=="rename" ):
        t="Renamed"
        code="/home/kali/os/OS-Project/file_bin/move "+cmd[2]+" "+cmd[3]
    elif(cmd[0]=="remove" and cmd[1]=="file"):
        t="Removed"
        code="/home/kali/os/OS-Project/file_bin/remove "+cmd[2]
    elif(cmd[0]=="remove" and cmd[1]=="directory"):
        t="Removed"
        code="/home/kali/os/OS-Project/file_bin/remove -rf "+cmd[2]
    elif(cmd[0]=="change"):

        os.environ["pwd"]=cmd[2]

    elif(cmd[0]=="go"):
        os.environ["pwd"]=os.environ["pwd"]+"/.."
        print("backked")
    elif(cmd[0]=="list"):
        code="/home/kali/os/OS-Project/file_bin/list "+os.environ["pwd"]
    else:
        print(cmd)
        return('Error')
    try:
        if(code!=""):
            print(code+" pwd:"+os.environ["pwd"])
            os.system(code+" >tmp.txt")
            code=""
            
            return(open("tmp.txt","r").read())
            
        code=""
       
    except:
        print(code)
        code=""
        return('Error')

def transcribe(audio_file):

  dg_key = '47751687a6d15fd18e646296e27333fdefb348dc'
  dg = Deepgram(dg_key)
  MIMETYPE = 'webm'
  DIRECTORY = '.'

  params = {
      "punctuate": False,
      "model": 'general',
      "tier": 'nova'
  }

  if audio_file.endswith(MIMETYPE):
    with open(f"{DIRECTORY}/{audio_file}", "rb") as f:
      source = {"buffer": f, "mimetype":'audio/'+MIMETYPE}
      res = dg.transcription.sync_prerecorded(source, params)
      with open(f"./{audio_file[:-4]}.json", "w") as transcript:
        json.dump(res, transcript)

  transcript = f"./{audio_file[:-4]}.json"

  with open(transcript, "r") as file:
    data = json.load(file)
    result = data['results']['channels'][0]['alternatives'][0]['transcript']
    
    return(executor(result))

@csrf_exempt
def converToText(req):
    if (req.method=='POST'):
        # file=req.FILES['voice']
        # print(file)
        # default_storage.save("backend/"+file.name,file)
        # backend\newvoice672.webm
        # backend\newvoice672.webm
        # res=transcribe("backend/"+file.name)
      return JsonResponse({"text":"Message sent"})

@csrf_exempt
def action(req):
    if (req.method=='POST'):
        file=req.FILES.get('voice')
        print(file)
        default_storage.save("backend/"+file.name,file)
        # backend\newvoice672.webm
        # backend\newvoice672.webm
        res=transcribe("backend/"+file.name)
        # os.remove("backend/"+file.name)
    # return JsonResponse({"text":res})
        print("RESPONSE",res)
        if not res:
           res=os.environ["pwd"]+",Executed without response."
    return JsonResponse({"status":res})

def home(req):
    return HttpResponse("HELLO")