# google-image-speaker


## Frontend


### Production Usage
(Stay in speaker-frontend directory for this commands)
#### Build Image
docker build -t googlespeaker:prod --file Dockerfile_prod .
#### Create Container on Port 33000 with Name googlespeakerprod and 300 MB RAM
docker run -d -p 33000:80 --memory=300m --name googlespeakerprod googlespeaker:prod




### Development Usage
(Stay in speaker-frontend directory for this commands)
#### Build Image
docker build -t googlespeaker:deve --file Dockerfile_deve .
#### Create Container on Port 33000 with Name googlespeakerdeve and 700 MB RAM
docker run -d -p 33000:4200 -v <FullPath/to/speaker-frontendDirectory>:/app --memory=700m --name googlespeakerdev googlespeaker:deve
(This will host the container on host port 33000 on ngserve )

#### Go Into Container
docker exec -it googlespeakerdev /bin/sh
####  Start Server
ng serve --host 0.0.0.0 --poll 10000
### Maybe it is needed to delete modules in node_modules. The system will tell if the node_module exists


## Backend
(Stay in speaker-backend directory for this command)

### Prerequisites
You should set the GoogleCredential Variable.
For windows use this in Powershell:
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\[FILE_NAME].json"

### Start Application (Will be http://localhost:5000/api/text, http://localhost:5000/api/image or https://localhost:5001/api/text,https://localhost:5001/api/image  by Default)
dotnet run
