package main

import (
	"log"
	"net/http"
	"time"
)

func Logger(httpHandler http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		start := time.Now()

		httpHandler.ServeHTTP(res, req)

		log.Printf(
			"%s\t%s\t%s\t%s",
			req.Method,
			req.RequestURI,
			name,
			time.Since(start),
		)
	})
}
