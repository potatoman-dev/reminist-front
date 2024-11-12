FROM node:20.11.0

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "dev", "-p", "4000"]
