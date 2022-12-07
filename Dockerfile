FROM node:latest
MAINTAINER DHAPARK
# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
RUN pwd
COPY server /usr/src/app/
RUN pwd
COPY client /usr/src/app/
RUN pwd
RUN mkdir /usr/src/app/server/public

#RUN rm -rf /usr/src/app/server/public


WORKDIR /usr/src/app/client
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
#RUN export NODE_OPTIONS=--max-old-space-size=8192
RUN export NODE_OPTIONS="--max-old-space-size=3072"
RUN npm run build

#서버
#WORKDIR /usr/src/app/server
#COPY server /usr/src/app/


WORKDIR /usr/src/app
COPY client/build/* server/public/

#COPY usr/src/app/client/build/* usr/src/app/server/public/
WORKDIR /usr/src/app/server
RUN npm install

EXPOSE 80

CMD ["node","app.js"]
