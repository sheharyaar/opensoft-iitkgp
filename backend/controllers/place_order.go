/* Integer conversion from json not working */

/* TODO:
 * 		- Check if store_id is valid
 * 		- Check if item_id is correct and ignore the price received in request,
			retrieve price from DB (security reasons)
				- I feel taking price as request in json has 0 benefit
				 Lets just take in item_id and quantity as request.

		- Generate order ID with the first oredered item and subsequent items
			will use the same ID.
		- If the order is canclled, discard
*/
package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
	"time"
)

func PlaceOrder(req map[string]interface{}, r *http.Request) (interface{}, int) {
	db := utils.GetDB()
	defer db.Close()

	var store models.Stores

	_ = db.Model(&models.Stores{}).Where("store_id = ?", uint64(req["store_id"].(float64))).First(&store)

	if store.Status == 0 {
		return "store is closed", 400
	}

	var arr_orders []models.Iteminput
	jsonData, _ := json.Marshal(req["order_items"])
	json.Unmarshal(jsonData, &arr_orders)

	no_of_orders := len(arr_orders)
	var present_order_id uint64

	customer_id_int := int64(req["customer_id"].(float64))

	var cnt int64

	var last_order models.Orders
	_ = db.Model(&models.Orders{}).Where("customer_id = ?", customer_id_int).Last(&last_order)
	if last_order.OrderId == 0 {
		present_order_id = 1
	} else {
		present_order_id = last_order.OrderId + 1
	}
	customer_id := uint64(req["customer_id"].(float64))
	for _, i := range arr_orders {
		var order models.Orders
		order.StoreId = uint64(req["store_id"].(float64))
		order.OrderId = present_order_id
		_ = db.Model(&models.Stores{}).Where("store_id = ?", order.StoreId).Count(&cnt)
		if cnt == 0 {
			return "storeid does not exist", 400
		}
		order.CustomerId = customer_id
		_ = db.Model(&models.Items{}).Where("item_id = ?", i.ItemId).Count(&cnt)
		if cnt == 0 {
			return "one of the order items is not valid", 400
		}
		var orig_item models.Items
		_ = db.Model(&models.Items{}).Where("item_id = ?", i.ItemId).First(&orig_item)
		order.Quantity = i.Quantity
		order.Status = "Placed"
		order.OrderDate = time.Now()
		order.ItemId = orig_item.ItemId
		order.ItemName = orig_item.Name
		order.Price = orig_item.Price
		result := db.Model(&models.Orders{}).Create(&order)
		if result.Error != nil {
			log.Println("unable to upload to db")
			return "Unable to place order", 500
		}
	}
	log.Println(no_of_orders)
	var fetched_orders []models.Orders
	_ = db.Model(&models.Orders{}).Where("customer_id = ? AND order_id = ?", customer_id, present_order_id).Find(&fetched_orders)
	return fetched_orders, 200
}

//extra sent email in post and not customer_id

func VendorPlaceOrder(req map[string]interface{}, r *http.Request) (interface{}, int) {

	db := utils.GetDB()
	defer db.Close()

	var store models.Stores

	_ = db.Model(&models.Stores{}).Where("store_id = ?", uint64(req["store_id"].(float64))).First(&store)

	if store.Status == 0 {
		return "store is closed", 400
	}

	var arr_orders []models.Iteminput
	jsonData, _ := json.Marshal(req["order_items"])
	json.Unmarshal(jsonData, &arr_orders)

	no_of_orders := len(arr_orders)
	var present_order_id uint64

	var customer models.Customers
	err := db.Model(&models.Customers{}).Where("email = ?", req["email"]).First(&customer).Error

	if err != nil {
		return "database error", 500
	}

	customer_id_int := customer.CustomerId

	var cnt int64

	var last_order models.Orders
	_ = db.Model(&models.Orders{}).Where("customer_id = ?", customer_id_int).Last(&last_order)
	if last_order.OrderId == 0 {
		present_order_id = 1
	} else {
		present_order_id = last_order.OrderId + 1
	}
	customer_id := customer_id_int
	for _, i := range arr_orders {
		var order models.Orders
		order.StoreId = uint64(req["store_id"].(float64))
		order.OrderId = present_order_id
		_ = db.Model(&models.Stores{}).Where("store_id = ?", order.StoreId).Count(&cnt)
		if cnt == 0 {
			return "storeid does not exist", 400
		}
		order.CustomerId = customer_id
		_ = db.Model(&models.Items{}).Where("item_id = ?", i.ItemId).Count(&cnt)
		if cnt == 0 {
			return "one of the order items is not valid", 400
		}
		var orig_item models.Items
		_ = db.Model(&models.Items{}).Where("item_id = ?", i.ItemId).First(&orig_item)
		order.Quantity = i.Quantity
		order.Status = "Placed"
		order.OrderDate = time.Now()
		order.ItemId = orig_item.ItemId
		order.ItemName = orig_item.Name
		order.Price = orig_item.Price
		result := db.Model(&models.Orders{}).Create(&order)
		if result.Error != nil {
			log.Println("unable to upload to db")
			return "Unable to place order", 500
		}
	}
	log.Println(no_of_orders)
	var fetched_orders []models.Orders
	_ = db.Model(&models.Orders{}).Where("customer_id = ? AND order_id = ?", customer_id, present_order_id).Find(&fetched_orders)
	return fetched_orders, 200
}
