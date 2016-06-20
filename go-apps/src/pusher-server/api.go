// API between the Go application and the MySql database.
package main

import (
	// "database/sql"
	// "fmt"
	"net/url"
	
    // _ "github.com/go-sql-driver/mysql"
)

func submitSABForm(formData url.Values) {
	// fmt.Println("tax:", formData.Get("tax"))
	
	// Prepare the query
	
	
	dbErr = db.Ping()
	checkError(dbErr)
}
