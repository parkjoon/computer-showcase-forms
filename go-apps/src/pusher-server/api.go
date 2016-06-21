// API between the Go application and the MySql database.
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

type SABReports struct {
    central1 	float64		`json:"central1,string"`
    central2 	float64		`json:"central2,string"`
	central3 	float64		`json:"central3,string"`
	central4 	float64		`json:"central4,string"`
	central6	float64		`json:"central6,string"`
	north5  	float64		`json:"north5,string"`
	north6 		float64		`json:"north6,string"`
	north7 		float64		`json:"north7,string"`
    updatedTime	time.Time
}

func notifySABReports(res http.ResponseWriter) {
    rows, err := db.Query("SELECT sfs.register, sfs.total FROM sab_form_submission AS sfs WHERE DATE(sfs.date_submitted) = CURDATE()")
    checkError(err)
	defer rows.Close()

	reports := SABReports{
		central1: 0.00, 
	    central2: 0.00, 
		central3: 0.00, 
		central4: 0.00, 
		central6: 0.00,
		north5: 0.00,  
		north6: 0.00, 	
		north7: 0.00, 	
	    updatedTime: time.Now(),
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
				newTotal := reports.central1 + totalToAdd
				newTotalStr := newTotal
				reports.central1 = newTotalStr
			case "Central - 2":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.central2 + totalToAdd
				newTotalStr := newTotal
				reports.central2 = newTotalStr
			case "Central - 3":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.central3 + totalToAdd
				newTotalStr := newTotal
				reports.central3 = newTotalStr
			case "Central - 4 (Repair)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.central4 + totalToAdd
				newTotalStr := newTotal
				reports.central4 = newTotalStr
			case "Central - 6 (Shipping)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.central6 + totalToAdd
				newTotalStr := newTotal
				reports.central6 = newTotalStr
			case "North - 5":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.north5 + totalToAdd
				newTotalStr := newTotal
				reports.north5 = newTotalStr
			case "North - 6 (Manager's Desk)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.north6 + totalToAdd
				newTotalStr := newTotal
				reports.north6 = newTotalStr
			case "North - 7 (Repair)":
				totalToAdd, err := strconv.ParseFloat(total, 64)
				checkError(err)
				newTotal := reports.north7 + totalToAdd
				newTotalStr := newTotal
				reports.north7 = newTotalStr
			default:
			    panic("unrecognized reigster")
		}
    }
	
	res.WriteHeader(http.StatusOK)
	res.Header().Set("Content-Type", "application/json")
	
	if err := json.NewEncoder(res).Encode(reports); err != nil {
        panic(err)
    }
	
	log.Println(res)
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
