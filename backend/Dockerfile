FROM golang:1.16-alpine as builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/opensoft-backend

FROM alpine
RUN apk add --no-cache ca-certificates && update-ca-certificates
COPY --from=builder /app/opensoft-backend /app/

#ENV PORT=8080

EXPOSE 80

ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=opensoft-database
ENV DATABASE_HOST=opensoft-database.ccqfjspwhh85.ap-south-1.rds.amazonaws.com
ENV DATABASE_NAME=opensoft_db
ENV DATABASE_PORT=5432
ENV SERVER_PORT=80

RUN chmod +x /app/opensoft-backend
ENTRYPOINT ["/app/opensoft-backend"]
