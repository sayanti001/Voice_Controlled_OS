
# Voice Controlled OS

Our task is to build a system that will decode your speech and perform the operating system file operations.

Key features are as following:

- The operations that has to be performed are: Make a particular directory, Go to a particular directory, Show content of current directory, Create file, open file, rename file and delete file.
- Based on the voice commands, the corresponding operation will be performed. For example, if we say, “Create file program.cpp”, then a file named program.cpp will be created inside the current directory.
- Shows a completion status message (success or error if any) on the UI after performing certain voice command


## Brief Implementation
- The frontend is made with react and will run on localhost:3000. Voice will be recorded with help of react-audio-recorder and then converted to file and sent to a django backend server through post request [[Arghyadeep] and [Ayush]]
- In the backend server the voice file will be converted int text [Ayanak]. The interpreted text will be sent to frontend and shown on screen to the user .
- The interpreted text will be again sent to backend server and releveant OS tasks will be performed [Ankur] and a relevant completion/failure message will be generated and sent to frontend and displayed on screen .

## File manipulation Architecture
- The ML Model will converted the audio to text message and store it in a temporarily file. A scheduler will be run which will run another program every 1s. The program will check for new entries in the temporary file and in case any new entry is found it will call respective binary for the operation and as soon as the modification in file system is made, the entries will be cleared from the file. After that a signal of success/failure will be sent to thefrontend. This manipulation and scheduling work will be done by [Ankur]

## Architecture Diagram

Here's a brief Architecture Diagram of our Project
![AD](https://res.cloudinary.com/dpcmfysrj/image/upload/v1707986936/ad2_tri9y1.jpg)

## Authors

- [Arghyadeep Sadhukhan (22JE0159)](https://www.github.com/arghyadeep04)
- [Ankur Roy(22JE0131)](https://github.com/e4stw7nd)

