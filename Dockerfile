FROM node:lts as ts-compiler

WORKDIR /bot

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8080

RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2-runtime", "start", "npm", "--", "start"]