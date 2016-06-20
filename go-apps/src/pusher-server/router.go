package main

import (
	"net/http"
	
	"github.com/gorilla/mux"
)

// This function returns a customized instance of a mux router.
func NewRouter() *mux.Router {
	// 'StrictSlash' defines the trailing slash behavior for new routes.
	// The initial value is false. When true, if the route path is "/path/",
	// accessing "/path" will redirect to the former and vice versa. In other
	// words, your app will always see the path as specified in the route.
	router := mux.NewRouter().StrictSlash(true)

	// Incorporate all the routes from 'routes.go' into the router.
	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	return router
}
