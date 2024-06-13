FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install

EXPOSE 3000

CMD ["bun", "start"]