FROM java:8-jdk
MAINTAINER Corentin Drouet <corentin.drouet@nanocloud.com>

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y apt-utils \
    && apt-get install -y node \
    && apt-get install -y nodejs npm \
    && apt-get install -y curl \
    && apt-get install -y gconf-service libgconf-2-4 libnspr4 libnss3 libpango1.0-0 \
    libappindicator1 libcurl3 libasound2 libxss1 libxtst6 fonts-liberation xdg-utils \
    && apt-get install -y xvfb \
    && wget  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb \
    && apt-get --only-upgrade install -y google-chrome-stable

COPY ./ /nanocloud
WORKDIR /nanocloud

RUN npm install -g n && n stable
RUN npm install -g minimatch
RUN npm install -g pug
RUN npm install -g graceful-fs
RUN npm install -g selenium-webdriver
RUN npm install -g selenium-server
RUN npm install -g selenium-server-standalone-jar
RUN npm install -g nightwatch

RUN ./install.sh
EXPOSE 4444
CMD ["sh", "-c", "./runtests"]
