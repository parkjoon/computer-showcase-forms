// API between the Go application and the MySql database.
package main

import (
	// "database/sql"
	"fmt"
	"net/url"
	
    // _ "github.com/go-sql-driver/mysql"
)

func submitSABForm(formData url.Values) {
	fmt.Println("tax:", formData.Get("tax"))
	
	// Create the database query
	
	
	dbErr = db.Ping()
	if dbErr != nil {
		// Example purpose. Use proper error handling instead of panic.
		panic(dbErr.Error())
	}
}
