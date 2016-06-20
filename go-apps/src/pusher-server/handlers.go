package main

import (
	"fmt"
	"log"
	"net/http"
	// "net/http/httputil"
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

func submitForm(res http.ResponseWriter, req *http.Request) {
	log.Print("handlers.go: entered submitForm()")
	
	// dump, err := httputil.DumpRequest(req, true)
	// if err != nil {
	// 	http.Error(res, fmt.Sprint(err), http.StatusInternalServerError)
	// 	return
	// }
	// fmt.Printf("%q", dump)
	
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
		return
	}
	
	// fmt.Println("tax:", req.Form["tax"])
	
	res.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	res.Header().Set("Access-Control-Allow-Credentials", "true")
}
