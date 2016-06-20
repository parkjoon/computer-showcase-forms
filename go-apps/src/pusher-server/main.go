package main

import (
	"database/sql"
	"log"
	"net/http"
	
	"github.com/pusher/pusher-http-go"
	_ "github.com/go-sql-driver/mysql"
)

// Instantiate a global instance of the Pusher client.
var pusherClient = pusher.Client{
	AppId:	"217780",
	Key:	"ff391f34967f5ad6ba1c",
	Secret:	"c4825c4c1ba449f209a9",
}

// Instantiate a global instance of the database connection.
var db, dbErr = sql.Open("mysql", "root:1234@/computer-showcase-forms")

func main(){
	checkError(dbErr)
	defer db.Close()
	
	// Open doesn't open a connection. Validate DSN data:
	dbErr = db.Ping()
	checkError(dbErr)
	
	// Instantiate a custom router defined in 'router.go'.
	log.Println("Creating a new router instance...")
	router := NewRouter()
	
	log.Println("Starting the HTTP server...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
