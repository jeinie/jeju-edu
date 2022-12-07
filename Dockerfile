FROM node:latest
MAINTAINER DHAPARK
# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#COPY package.json /usr/src/app/package.json
# 소스를 작업폴더로 복사하고 빌드
#COPY . /usr/src/app
COPY client/* /usr/src/app
WORKDIR /usr/src/app/client
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
RUN npm run build





WORKDIR /usr/src/app
COPY server /usr/src/app
RUN rm -rf /usr/src/app/server/public
RUN mkdir /usr/src/app/server/public

COPY /usr/src/app/build/* /usr/src/app/server/public
#COPY package*.json ./
WORKDIR /usr/src/app/server
RUN npm install
#RUN cat /usr/src/app/client/build/index.html
#COPY . .

EXPOSE 80

CMD ["node","app.js"]