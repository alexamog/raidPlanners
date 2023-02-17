FROM node:latest

WORKDIR /app
EXPOSE 5173
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm i 

COPY . ./

CMD ["npm", "run", "dev", "--", "--host"]