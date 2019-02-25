FROM node:10

WORKDIR /usr/src
COPY src ./
RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]