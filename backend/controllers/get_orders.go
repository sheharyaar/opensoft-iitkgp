/* TODO:
 * 		- Check for loginrequired issue
 *		- If prev fixed then implement getOrders
 * 			- Check if the order_id is 0, then send all orders related to the customer_id
 *			- If order_id != 0 then send the order with matching id
 *			- If order_id not found => return "order not found", 400
 */
package controllers

import (
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
)

// After Being checked by LoginRequired Middleware
func GetOrders(req map[string]interface{}, r *http.Request) (interface{}, int) {
	db := utils.GetDB()
	defer db.Close()

	customer_id := int64(req["customer_id"].(float64))
	order_id := int64(req["order_id"].(float64))

	var cnt int
	_ = db.Model(&models.Orders{}).Where("customer_id = ?", customer_id).Count(&cnt)
	if(cnt==0){
		return "customer not found", 400
	}

	var orders []models.Orders
	if (order_id == 0){
		_ = db.Model(&models.Orders{}).Where("customer_id = ?", customer_id).Find(&orders)
	}else{
		_ = db.Model(&models.Orders{}).Where("customer_id = ? AND order_id = ?", customer_id, order_id).Find(&orders)
	}
	if(len(orders) == 0){
		return "no orders found", 400
	}
	return orders, 200
}


func VendorGetOrders(req map[string]interface{}, r *http.Request) (interface{}, int) {
	db := utils.GetDB()
	defer db.Close()

	store_id := int64(req["store_id"].(float64))
	order_id := int64(req["order_id"].(float64))

	var cnt int
	_ = db.Model(&models.Orders{}).Where("store_id = ?", store_id).Count(&cnt)
	if(cnt==0){
		return "orders not found for this store", 400
	}

	var orders []models.Orders
	if (order_id == 0){
		_ = db.Model(&models.Orders{}).Where("store_id = ?", store_id).Find(&orders)
	}else{
		_ = db.Model(&models.Orders{}).Where("store_id = ? AND order_id = ?", store_id, order_id).Find(&orders)
	}
	if(len(orders) == 0){
		return "no orders found", 400
	}
	return orders, 200
}
