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

// Get data on a form from the database.
// Returns the form_id, html_id, name, owner_id, and description.
func getForm(res http.ResponseWriter, req *http.Request) {
	log.Print("handlers.go: entered getForm()")
}
