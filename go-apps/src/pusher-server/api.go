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
	stmt, err := db.Prepare("INSERT INTO sab_form_submission (date_submitted, uniqname, is_medical_student, medical_school_code, phone_number, subtotal, tax, total, rms_transaction, register) VALUES (NOW(), ?,?,?,?,?,?,?,?,?)")
	checkError(err)
	defer stmt.Close()
	
	res, err := stmt.Exec(formData.Get("uniqname"), formData.Get("isMedicalStudent"), formData.Get("medicalSchoolCode"), formData.Get("phoneNumber"), formData.Get("subtotal"), formData.Get("tax"), formData.Get("total"), formData.Get("rmsTransaction"), formData.Get("register"))
    checkError(err)
	log.Println(res)

	// Pusher event trigger
	register := formData.Get("register")

	// TODO: Implement the other registers
	if register == "Central - 1" {
		event_data := map[string]string{"register": "central1", "total": formData.Get("total")}
   		pusherClient.Trigger("reports_channel", "sab-form-submitted", event_data)
	}
}
