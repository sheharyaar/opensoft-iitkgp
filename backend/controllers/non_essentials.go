package controllers

import (
	"math/rand"
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
	"os"
)

func Recommend(req map[string]interface{}, r *http.Request) (interface{}, int) {

	if(os.Getenv("DATACENTER") == "0"){
		return "nonessentials are down", 404
	}


	num_items := 5
	items := []models.Items{}

	db := utils.GetDB()
	defer db.Close()

	/* Return num_items entires randomly from Items table */
	db.Model(&models.Items{}).Limit(num_items).Find(&items)

	return items, 200
}


func VendorRecommend(req map[string]interface{}, r *http.Request) (interface{}, int) {

	if(os.Getenv("DATACENTER") == "0"){
		return "nonessentials are down", 404
	}
	num_items := 5
	items := []models.Items{}

	db := utils.GetDB()
	defer db.Close()

	/* Return num_items entires randomly from Items table */
	db.Model(&models.Items{}).Limit(num_items).Find(&items)

	return items, 200
}

func Loyalty(req map[string]interface{}, r *http.Request) (interface{}, int) {

	if(os.Getenv("DATACENTER") == "0"){
		return "nonessentials are down", 404
	}
	var loyalty models.Loyalty
	loyalty.Points = uint64(rand.Intn(10-0) + 0)
	return loyalty, 200
}
