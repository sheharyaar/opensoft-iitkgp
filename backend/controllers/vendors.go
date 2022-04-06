/* Working Perfectly */

package controllers

import (
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
)

func AddVendor(req map[string]interface{}, r *http.Request) (interface{}, int) {
	

	// Get Database instance
	db := utils.GetDB()
	defer db.Close()

	// Check if store already registered
	vendor := models.Vendors{}
	db.Where("store_id = ?", int64(req["store_id"].(float64))).First(&vendor)
	if vendor.StoreId != 0 {
		return "duplicate entry", 400
	}

	err := db.Create(&models.Vendors{
		StoreId:  uint64(req["store_id"].(float64)),
		Password: req["password"].(string),
	}).Error

	if err != nil {
		return "database issue", 500
	}
	return "success", 200
}

func VendorLogin(req map[string]interface{}, r *http.Request) (interface{}, int) {


	//login takes store_id and password
	// Get Database instance
	db := utils.GetDB()
	defer db.Close()

	// search by store_id
	vendor := models.Vendors{}
	err := db.Model(&models.Vendors{}).Where("store_id = ?", int64(req["store_id"].(float64))).First(&vendor).Error
	if err != nil {
		return "database issue", 500
	}
	if vendor.StoreId == 0 {
		return "vendor not found", 400
	}
	if vendor.Password == req["password"].(string) {
		return "success", 200
	}
	return "password didnt match", 400
}
