/* Working perfectly */

package controllers

import (
	"log"
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
	"strconv"
	"strings"
)

func GetStores(req map[string]interface{}, r *http.Request) (interface{}, int) {
	// get db instance
	db := utils.GetDB()
	defer db.Close()

	stores := []models.Stores{}

	// get query parameter
	Queryzip := r.URL.Query().Get("zipcode")
	Querycity := strings.ToLower(r.URL.Query().Get("city"))
	Querystate := strings.ToLower(r.URL.Query().Get("state"))

	zip, _ := strconv.ParseInt(Queryzip, 10, 64)

	if len(Queryzip) != 0 {
		_ = db.Model(&models.Stores{}).Where("Pincode = ?", zip).Find(&stores)
		log.Printf("STORES : %v", stores)
		if len(stores) == 0 {
			return "No stores", 400
		}
		//
	} else if len(Querycity) != 0 {
		_ = db.Model(&models.Stores{}).Where("City LIKE ?", "%"+Querycity+"%").Find(&stores)
		log.Printf("STORES : %v", stores)
		if len(stores) == 0 {
			return "No stores", 400
		}

	} else if len(Querystate) != 0 {
		_ = db.Model(&models.Stores{}).Where("State LIKE ?", "%"+Querystate+"%").Find(&stores)
		log.Printf("STORES : %v", stores)
		if len(stores) == 0 {
			return "No stores", 400
		}

	}
	return stores, 200
}

func VendorGetStores(req map[string]interface{}, r *http.Request) (interface{}, int) {
	// get db instance
	db := utils.GetDB()
	defer db.Close()

	stores := []models.Stores{}

	// get query parameter
	Queryzip := r.URL.Query().Get("zipcode")
	Querycity := r.URL.Query().Get("city")
	Querystate := r.URL.Query().Get("state")

	zip, _ := strconv.ParseInt(Queryzip, 10, 64)

	if len(Queryzip) != 0 {
		_ = db.Model(&models.Stores{}).Where("Pincode = ?", zip).First(&stores)
		log.Printf("STORES : %v", stores)
		if len(stores) == 0 {
			return "No stores", 400
		}
		//
	} else if len(Querycity) != 0 {
		_ = db.Model(&models.Stores{}).Where("City = ?", Querycity).First(&stores)
		log.Printf("STORES : %v", stores)
		if len(stores) == 0 {
			return "No stores", 400
		}

	} else if len(Querystate) != 0 {
		_ = db.Model(&models.Stores{}).Where("State = ?", Querystate).First(&stores)
		log.Printf("STORES : %v", stores)
		if len(stores) == 0 {
			return "No stores", 400
		}

	}
	return stores, 200
}

func VendorStoreStatus(req map[string]interface{}, r *http.Request) (interface{}, int) {
	// get db instance
	db := utils.GetDB()
	defer db.Close()

	store_id, _ := strconv.ParseUint((r.URL.Query().Get("store_id")), 0, 64)
	set, _ := strconv.Atoi(r.URL.Query().Get("set"))

	err := db.Model(&models.Stores{}).Where("store_id = ?", store_id).Update("status", set).Error

	if err != nil {
		log.Println(err)
		return "Error updating status", 400
	}
	return "success", 200
}
