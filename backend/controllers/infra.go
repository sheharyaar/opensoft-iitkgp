package controllers

import (
	"net/http"
	"os"
)

func Infra(req map[string]interface{}, r *http.Request) (interface{}, int) {

	// Get todo stat
	todo := (r.URL.Query().Get("datacenter"))


	if todo=="1"{
		os.Setenv("DATACENTER","1")
		return "success", 200
	}else if todo=="0"{
		os.Setenv("DATACENTER","0")
		return "success", 200
	}else{
		return "Invalid request", 400
	}
}
