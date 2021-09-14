FROM node:lts-alpine
ENV PORT=80

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "nx.json", "./"]
RUN npm install
COPY . .

RUN npm install -g @angular/cli
RUN npm install -g @nrwl/cli

CMD npm run serve:api:prod
