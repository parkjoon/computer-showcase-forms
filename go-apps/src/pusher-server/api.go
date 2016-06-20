// API between the Go application and the MySql database.
package main

import (
	// "database/sql"
	// "fmt"
	
    // _ "github.com/go-sql-driver/mysql"
)

func submitSABForm(formData *http.Request.Form) {
	dbErr = db.Ping()
	if dbErr != nil {
		// Example purpose. Use proper error handling instead of panic.
		panic(dbErr.Error())
	}
}
