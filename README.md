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
