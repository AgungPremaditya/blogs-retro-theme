FROM oven/bun:alpine

RUN bun --version

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bunx next build

EXPOSE 3000

CMD ["bun", "dev"]