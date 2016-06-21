package main

import (
	"log"
	"net/http"
	"encoding/json"
)

// Return the static data provided in 'test_data.go'. 
func getReportsData(res http.ResponseWriter, req *http.Request) {
	log.Print("handlers.go: entered getReportsData()")
	res.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	res.Header().Set("Access-Control-Allow-Credentials", "true")
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	reports := notifySABReports()
	log.Println(reports)
	json.NewEncoder(res).Encode(reports)
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
