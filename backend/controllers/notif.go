package controllers

import (
	"fmt"
	"log"
	"net/http"
	"opensoft-backend/models"
	"opensoft-backend/utils"
	"time"
)

func Notif(req map[string]interface{}, r *http.Request) (interface{}, int) {

	// Get Database instance
	db := utils.GetDB()
	defer db.Close()

	entry := &models.GrafanaTest{}

	timer := time.Now().Unix()
	timer_str := fmt.Sprintf("%d", timer)

	entry.Flag = timer_str

	result := db.Model(&models.GrafanaTest{}).Create(&entry)
	if result.Error != nil {
		log.Println("unable to upload to db")
		return "Unable to place order", 500
	}

	return "success", 200
}
