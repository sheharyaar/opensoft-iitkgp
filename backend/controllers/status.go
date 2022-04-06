package controllers

import (
	"log"
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
)

func OrderTweakStatus(req map[string]interface{}, r *http.Request) (interface{}, int) {
	db := utils.GetDB()
	defer db.Close()

	order_id := int64(req["order_id"].(float64))
	status := req["status"].(string)

	err:= db.Model(&models.Orders{}).Where("order_id = ?",order_id).Update("status",status).Error
	if err != nil {
		log.Println(err)
		return "Error updating status", 400
	}
	return "success", 200
}
