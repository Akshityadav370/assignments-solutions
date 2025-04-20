FROM node:20-alpine

WORKDIR /app

COPY ./package* .

RUN npm install

COPY . . 

ENV DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres

RUN echo ${DATABASE_URL}
RUN DATABASE_URL=${DATABASE_URL} npx prisma migrate dev
RUN npx prisma generate 
RUN npm run build 

CMD ["npm", "start"]