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
	var register string
	switch formData.Get("register") {
		case "Central - 1":
			register = "central1"
		case "Central - 2":
			register = "central2"
		case "Central - 3":
			register = "central3"
		case "Central - 4 (Repair)":
			register = "central4"
		case "Central - 6 (Shipping)":
			register = "central6"
		case "North - 5":
			register = "north5"
		case "North - 6 (Manager's Desk)":
			register = "north6"
		case "North - 7 (Repair)":
			register = "north7"
		default:
		    panic("unrecognized reigster")
	}

	event_data := map[string]string{"register": register, "total": formData.Get("total")}
	pusherClient.Trigger("reports_channel", "sab-form-submitted", event_data)
}
