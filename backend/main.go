/* TODO:
 *		- Who will do the sanitisation checks? if the inputs are there or not
			frontend or backend ???
 *		- Do we need to enforce login to just browse items ??
 * 		- Check for json IO for get request ?? nah
 *		- Make JWT work
*/
package main

import (
	"log"
	"net/http"
	"os"

	ob "opensoft-backend/routes"
	"opensoft-backend/utils"

	"github.com/gorilla/handlers"
)

func main() {
	var mainLogger = log.New(os.Stderr, "Message: ", log.LstdFlags|log.Lshortfile)
	utils.InitialMigration()

	mainLogger.Println("DatabaseUsername : ", os.Getenv("DATABASE_USERNAME"))
	mainLogger.Println("DatabasePassword : ", os.Getenv("DATABASE_PASSWORD"))
	mainLogger.Println("DatabaseName : ", os.Getenv("DATABASE_NAME"))
	mainLogger.Println("DatabaseHost : ", os.Getenv("DATABASE_HOST"))
	mainLogger.Println("DatabasePort : ", os.Getenv("DATABASE_PORT"))

	port := os.Getenv("SERVER_PORT")

	router := ob.NewRouter()

	mainLogger.Println("Starting server on port : " + port)

	headersOk := handlers.AllowedHeaders([]string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorisation", "Bearer"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	os.Setenv("DATACENTER", "1")		//datacenter is on


	err := http.ListenAndServe(":"+port, handlers.CORS(headersOk, originsOk, methodsOk)(router))
	if err != nil {
		mainLogger.Println("Error in Starting ", err)
		os.Exit(1)
	}
}
