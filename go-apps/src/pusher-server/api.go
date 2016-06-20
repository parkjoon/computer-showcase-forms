// API between the Go application and the MySql database.
package main

import (
	// "database/sql"
	"net/url"
	"log"
	
    // _ "github.com/go-sql-driver/mysql"
)

func submitSABForm(formData url.Values) {
	// fmt.Println("tax:", formData.Get("tax"))
	
	// Prepare the query
	stmt, err := db.Prepare("INSERT INTO sab_form_submission (uniqname, is_medical_student, medical_school_code, phone_number, subtotal, tax, total, rms_transaction, register) VALUES (?,?,?,?,?,?,?,?,?)")
	checkError(err)
	defer stmt.Close()
	
	res, err := stmt.Exec(formData.Get("uniqname"), formData.Get("isMedicalStudent"), formData.Get("medicalSchoolCode"), formData.Get("phoneNumber"), formData.Get("subtotal"), formData.Get("tax"), formData.Get("total"), formData.Get("rmsTransaction"), formData.Get("register"))
    checkError(err)
	log.Println(res)
}
