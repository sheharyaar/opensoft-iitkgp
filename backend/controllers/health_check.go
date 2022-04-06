package controllers

import (
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
	"os"
)

func HealthCheck(req map[string]interface{}, r *http.Request) (interface{}, int) {

	db := utils.GetDB()
	defer db.Close()


	var health models.Health
	if(os.Getenv("DATACENTER") == "1"){
		health.Essentials = true
		health.NonEssentials = true
	}
	if(os.Getenv("DATACENTER") == "0"){
		health.Essentials = true
		health.NonEssentials = false
	}
	return health, 200
}