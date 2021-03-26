FROM ubuntu:latest

RUN apt-get -y update
RUN apt-get -y upgrade

RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install ssh nodejs npm sshpass

WORKDIR /applications/shell-ssh-replicator

COPY ./package.json .
COPY ./cli.js .
COPY ./main.js .

RUN npm install

CMD node cli.js
