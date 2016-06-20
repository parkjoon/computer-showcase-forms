package main

import (
	"log"
	"net/http"
	
	"github.com/pusher/pusher-http-go"
)

// Instantiate a global instance of the Pusher client.
var pusherClient = pusher.Client{
	AppId:	"217780",
	Key:	"ff391f34967f5ad6ba1c",
	Secret:	"c4825c4c1ba449f209a9",
}

func main(){
	// Instantiate a custom router defined in 'router.go'.
	log.Println("Creating a new router instance...")
	router := NewRouter()

	log.Println("Starting the HTTP server...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
