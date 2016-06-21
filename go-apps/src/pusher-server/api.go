// API between the Go application and the MySql database.
package main

import (
	"log"
	"net/url"
	"strconv"
	"time"
)

type SABReports struct {
    Central1 	float64		`json:"central1"`
    Central2 	float64		`json:"central2"`
	Central3 	float64		`json:"central3"`
	Central4 	float64		`json:"central4"`
	Central6	float64		`json:"central6"`
	North5  	float64		`json:"north5"`
	North6 		float64		`json:"north6"`
	North7 		float64		`json:"north7"`
    UpdatedTime	time.Time	`json:"updatedTime"`
}

func notifySABReports() SABReports {
    rows, err := db.Query("SELECT sfs.register, sfs.total FROM sab_form_submission AS sfs WHERE DATE(sfs.date_submitted) = CURDATE()")
    checkError(err)
	defer rows.Close()

	reports := SABReports{
		Central1: 0.00, 
	    Central2: 0.00, 
		Central3: 0.00, 
		Central4: 0.00, 
		Central6: 0.00,
		North5: 0.00,  
		North6: 0.00, 	
		North7: 0.00, 	
	    UpdatedTime: time.Now(),
	}

    for rows.Next() {
        var register 	string
        var total		string
        err = rows.Scan(&register, &total)
        checkError(err)
		switch register {
			case "Central - 1":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.Central1 + totalToAdd
				reports.Central1 = newTotal
			case "Central - 2":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.Central2 + totalToAdd
				reports.Central2 = newTotal
			case "Central - 3":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.Central3 + totalToAdd
				reports.Central3 = newTotal
			case "Central - 4 (Repair)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.Central4 + totalToAdd
				reports.Central4 = newTotal
			case "Central - 6 (Shipping)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.Central6 + totalToAdd
				reports.Central6 = newTotal
			case "North - 5":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.North5 + totalToAdd
				reports.North5 = newTotal
			case "North - 6 (Manager's Desk)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.North6 + totalToAdd
				reports.North6 = newTotal
			case "North - 7 (Repair)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.North7 + totalToAdd
				reports.North7 = newTotal
			default:
			    panic("unrecognized reigister")
		}
    }
	
	return reports
}

func submitSABForm(formData url.Values) {
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
