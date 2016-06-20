package main

import (
	"net/http"
)

// Define the structure of a route.
// Routes consist of names, HTTP method types, path patterns, and handlers.
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// Define the container of routes as an array of 'Route' objects.
type Routes []Route

// Instantiate a container of routes.
var routes = Routes {
	Route {
		"TestData",
		"GET",
		"/testData",
		getTestData,
	},
	Route {
		"Form",
		"GET",
		"/form",
		getForm,
	},
	Route {
		"SubmitForm",
		"POST",
		"/submitForm",
		submitForm,
	},
}
