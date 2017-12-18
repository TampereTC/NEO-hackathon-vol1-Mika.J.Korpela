FROM node:6.9.2
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 8080
ENV HTTP_PROXY http://10.144.1.10:8080
RUN npm --proxy $HTTP_PROXY install
CMD ["npm", "start"]