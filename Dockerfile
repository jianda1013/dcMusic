FROM debian
WORKDIR /usr/src/app
RUN apt-get update -y
RUN apt-get install python curl make g++ ffmpeg -y
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
COPY . .
RUN source .env
RUN npm install
CMD ["npm", "start"]