package main

type jsonError struct {
	Code int    `json:"code"`
	Text string `json:"text"`
}

func checkError(err error) {
	if err != nil {
		panic(err.Error())
	}
}
