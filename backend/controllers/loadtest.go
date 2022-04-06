package controllers

import (
	"net/http"
)

func LoadTest(req map[string]interface{}, r *http.Request) (interface{}, int) {
	var i int64
	var arr []int64
	for i = 0; i < 1000000000; i++ {
		if i < 1000000 {
			arr = append(arr, i)
		}
		_ = 1
	}
	return "success", 200
}
