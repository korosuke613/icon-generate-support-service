FROM node:12.13.1

WORKDIR /app

RUN set -x && \
    apt-get update && \
    npm install yarn -g \
    yarn global add nuxt \
    yarn global add firebase-tools \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# localeの変更
ENV LANG=ja_JP.UTF-8

EXPOSE 3000
