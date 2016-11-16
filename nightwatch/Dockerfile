FROM node:7.1.0-slim
MAINTAINER Corentin Drouet <corentin.drouet@nanocloud.com>

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y gconf-service libgconf-2-4 libnspr4 libnss3 libpango1.0-0 \
    libappindicator1 libcurl3 libasound2 libxss1 libxtst6 fonts-liberation xdg-utils \
    && wget  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb \
    && apt-get -y install default-jre default-jdk \
    && apt-get install -y curl \
    && npm install -g selenium-webdriver selenium-server nightwatch chromedriver

COPY ./ /nanocloud
WORKDIR /nanocloud

RUN ./install.sh
EXPOSE 4444
CMD ["sh", "-c", "./runtests"]
