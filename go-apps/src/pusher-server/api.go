// API between the Go application and the MySql database.
package main

import (
	// "database/sql"
	// "fmt"
	"log"
	"net/url"
	
    // _ "github.com/go-sql-driver/mysql"
)

func submitSABForm(formData url.Values) {
	// fmt.Println("tax:", formData.Get("tax"))
	
	// Prepare the query
	stmt, err := db.Prepare("INSERT INTO sab_form_submissions (date_submitted, uniqname, is_medical_student, phone_number, subtotal, tax, total, rms_transaction, register) VALUES (NOW(),?,?,?,?,?,?,?,?)")
	checkError(err)
	defer stmt.Close()
	
	res, err := stmt.Exec(formData.Get("uniqname"), formData.Get("isMedicalStudent"), formData.Get("phoneNumber"), formData.Get("subtotal"), formData.Get("tax"), formData.Get("total"), formData.Get("rmsTransaction"), formData.Get("register"))
    checkError(err)
}
