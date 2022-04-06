/* Incomplete */

/* 	- GetItembyId
 *		- Check if item id exists then return the item else
 *			return "item not found", 400
 * 	- GetItembyName
 *  	- Using LIKE for similar orders
 */
package controllers

import (
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
	"strconv"
	"strings"
)

func GetItemById(req map[string]interface{}, r *http.Request) (interface{}, int) {
	item_id, err := strconv.ParseUint((r.URL.Query().Get("item_id")), 10, 32)
	if err != nil {
		return "error request", 400
	}
	item := models.Items{}
	item.ItemId = 0 // to check later if item was found
	items := []models.Items{}

	// Get db instance
	db := utils.GetDB()
	defer db.Close()

	// If item_id received in response = 0
	// Return all the items
	// Use case : To view all available items and to filter it on frontend

	if item_id == 0 {
		db.Find(&items)
		return items, 200
	}

	/* If specific item requested */

	db.Where(&models.Items{ItemId: item_id}).First(&item)
	if item.ItemId == 0 {
		return "no item", 400
	}

	return item, 200
}

func GetItemByName(req map[string]interface{}, r *http.Request) (interface{}, int) {
	// item name from request
	item_name := r.URL.Query().Get("item_name")
	item_name = strings.ToUpper(item_name)
	items := []models.Items{}

	// get db instance
	db := utils.GetDB()
	defer db.Close()

	if item_name == "" {
		db.Find(&items)
		return items, 200
	}

	db.Model(&models.Items{}).Where("name LIKE ?", item_name).Find(&items)

	//*********************DOUBT**************
	//Invalid Input Code..??
	//Id not found
	return items, 200
}



func VendorGetItemById(req map[string]interface{}, r *http.Request) (interface{}, int) {
	item_id, err := strconv.ParseUint((r.URL.Query().Get("item_id")), 10, 32)
	if err != nil {
		return "error request", 400
	}
	item := models.Items{}
	item.ItemId = 0 // to check later if item was found
	items := []models.Items{}

	// Get db instance
	db := utils.GetDB()
	defer db.Close()

	// If item_id received in response = 0
	// Return all the items
	// Use case : To view all available items and to filter it on frontend

	if item_id == 0 {
		db.Find(&items)
		return items, 200
	}

	/* If specific item requested */

	db.Where(&models.Items{ItemId: item_id}).First(&item)
	if item.ItemId == 0 {
		return "no item", 400
	}

	return item, 200
}

func VendorGetItemByName(req map[string]interface{}, r *http.Request) (interface{}, int) {
	// item name from request
	item_name := r.URL.Query().Get("item_name")
	item_name = strings.ToUpper(item_name)
	items := []models.Items{}

	// get db instance
	db := utils.GetDB()
	defer db.Close()

	db.Model(&models.Items{}).Where("name LIKE ?", item_name).Find(&items)

	//*********************DOUBT**************
	//Invalid Input Code..??
	//Id not found
	return items, 200
}
