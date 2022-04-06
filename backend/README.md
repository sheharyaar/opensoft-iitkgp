# Opensoft Backend
![](https://user-images.githubusercontent.com/79754058/160650788-dff64dd0-26b5-4ddb-aa39-6852aafd5755.jpg)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Features

- APIs for customers.
- APIs for vendors.
- Health Check API
- APIs differentiation into essentials and non-essentials

## Language
GoLang is used.
Advantages of using golang :
- simple language syntax - easy for C/Javascript programmers to use some type inference, which removes most variable declarations
- fast compilation, good error messages
- lots of libraries both standard and third-party
- single executable makes production upgrades easy, FreeBSD ports system has Go support.

## Database
PostgreSQL is used.
Advantages of using PostgreSQL:
- “the most advanced open-source relational database in the world !”
- Handles concurrency better than other databases.
- Easy to use SQL language

## Go Libraries

Backend uses a number of open source go libraries to work properly:

- Gorm - Database management github.com/jinzhu/gorm
- HTTP - Server deployment [net/http][dill]
- Gorilla Mux - handler functions Deployment github.com/gorilla/handlers

And of course Go itself is open source with a [public repository]() on GitHub.

## Installation

Requires [Golang](https://go.dev/) v1.18+ to run.

Install the dependencies and devDependencies using

```dockerfile
go get ./...
```



Set the environment variables in [database.go]()
```dockerfile
os.Setenv("DATABASE_USERNAME", "<database_username>")
os.Setenv("DATABASE_PASSWORD", "<database_password>")
os.Setenv("DATABASE_NAME", "<database_name>")
os.Setenv("DATABASE_HOST", "<database_host>")
os.Setenv("DATABASE_PORT", "<database_port>")
os.Setenv("SERVER_PORT", "<server_port>")
```
Start the server using
```dockerfile
go run main.go
```

## Docker

Backend is very easy to install and deploy in a Docker container.
Set the environment variables in the dockerfile itself.
```dockerfile
ENV DATABASE_USERNAME=<database_username>
ENV DATABASE_PASSWORD=<database_password>
ENV DATABASE_HOST=<database_host>
ENV DATABASE_NAME=<database_name>
ENV DATABASE_PORT=<database_port>
ENV SERVER_PORT=<server_port>
```
By default, the Docker will expose port 80, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.
```bash
cd opensoft-backend
```
Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 80 of the host to
port 80 of the Docker (or whatever port was exposed in the Dockerfile):

```console
# docker build -t opensoft .
# docker run -d -p 80:80  -t opensoft
```

Verify the deployment by navigating to your server address in
your preferred browser.

```dockerfile
127.0.0.1
```

## APIs

#### AddCustomer :
>Request
	Signup for customer
	Takes in full name, phone number, email, password, street, city, state, pincode
Response
	Success, 200
	Invalid request, 400

#### Login:
>Request
	Takes in email and password
Response
	Success, 200
	Invalid request, 400


#### GetItemById:
>Request
	Item id
Response
	Item_name
	Price


#### GetItemByName:
>Request
	Item name
Response
	Item_id
	Price

#### GetStores:
>Request
	Takes in City, State, Zip
Response
	List of stores


#### PlaceOrders:
>Request
Takes in store_id, customer_id and order items with quantity
Response
	List of all placed items


#### Recommend:

>Request
	Blank get request
Response
	List of 5 recommended items.




## License

MIT

