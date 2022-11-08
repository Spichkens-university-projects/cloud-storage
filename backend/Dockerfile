FROM node

WORKDIR ./app

COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main" ]