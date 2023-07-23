## Build the iamge
docker build -f Dockerfile.dev -t jsalinas8/artventure-client .

## run the container
docker run -it -p 4002:3000 jsalinas8/artventure-client
