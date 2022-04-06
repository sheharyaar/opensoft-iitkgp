/* Working Perfectly */

package controllers

import (
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
)

func AddCustomer(req map[string]interface{}, r *http.Request) (interface{}, int) {

	// Get Database instance
	db := utils.GetDB()
	defer db.Close()

	// Check if email already registered
	customer := models.Customers{}
	db.Where("email = ?", req["email"].(string)).First(&customer)
	if customer.Email != "" {
		return "duplicate entry", 400
	}

	// Check if phone number already registered
	db.Where("phone = ?", req["phone"].(string)).First(&customer)
	if customer.Phone != "" {
		return "duplicate entry", 400
	}

	// Creating an address struct pointer for DB create function below
	err := db.Create(&models.Customers{
		FullName: req["full_name"].(string),
		Phone:    req["phone"].(string),
		Email:    req["email"].(string),
		Password: req["password"].(string),
		Street:   req["street"].(string),
		City:     req["city"].(string),
		State:    req["state"].(string),
		Pincode:  uint64(req["pincode"].(float64)),
	}).Error
	if err != nil {
		return "database issue", 500
	}
	return "success", 200
}

func Login(req map[string]interface{}, r *http.Request) (interface{}, int) {

	//login takes email and password
	// Get Database instance
	db := utils.GetDB()
	defer db.Close()

	// search by email
	customer := models.Customers{}
	err := db.Model(&models.Customers{}).Where("email = ?", req["email"].(string)).First(&customer).Error
	if err != nil {
		return "database issue", 500
	}
	if customer.Email == "" {
		return "customer not found", 400
	}
	if customer.Password == req["password"].(string) {
		customer.Password = ""
		return customer, 200
	}
	return "password didnt match", 400
}
