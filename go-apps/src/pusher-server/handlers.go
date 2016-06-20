package main

import (
	"fmt"
	"log"
	"net/http"
)

// Return the static data provided in 'test_data.go'. 
func getTestData(res http.ResponseWriter, req *http.Request) {
	log.Print("handlers.go: entered getTestData()")
	fmt.Fprint(res, testData)
}

func submitForm(res http.ResponseWriter, req *http.Request) {
	log.Print("handlers.go: entered submitForm()")
	
	err := req.ParseForm()
	checkError(err)
	
	switch req.FormValue("shortName") {
		case "sabForm":
			submitSABForm(req.Form)
		default:
			panic("submitForm: Unrecognized form!")
	}
	
	res.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	res.Header().Set("Access-Control-Allow-Credentials", "true")
}
