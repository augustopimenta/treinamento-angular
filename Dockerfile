FROM node:10.4 as builder
WORKDIR /app/src
COPY package*.json ./
RUN npm install --no-audit
COPY .  .
RUN npm run build -- --prod=true

FROM node:10.4
WORKDIR /app
COPY --from=builder /app/src/dist/treinamento-angular ./frontend
COPY --from=builder /app/src/front-server ./frontend/
COPY server ./backend
COPY start.sh .

RUN chmod +x start.sh && \
    cd frontend/ && npm install --no-audit && \
    cd ../backend/ && npm install --no-audit

EXPOSE 80
EXPOSE 8080

ENTRYPOINT ["./start.sh"]
