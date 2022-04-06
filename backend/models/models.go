package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type Customers struct {
	gorm.Model

	//primary key
	CustomerId uint64 `json:"customer_id" gorm:"primaryKey;AUTO_INCREMENT;not_null"` //autoincrement
	FullName   string `json:"full_name"`
	Phone      string `json:"phone"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Street     string `json:"street,omitempty"`
	City       string `json:"city,omitempty"`
	State      string `json:"state,omitempty"`
	Pincode    uint64 `json:"pincode,omitempty"`
}

type Health struct {
	Essentials    bool `json:"essentials"`
	NonEssentials bool `json:"non_essentials"`
}

type Vendors struct {
	gorm.Model

	//primary key
	StoreId  uint64 `json:"store_id" gorm:"primaryKey;not_null;default:0"`
	Password string `json:"password" gorm:"password"`
}

type Items struct {
	gorm.Model

	// primary key
	ItemId uint64  `gorm:"primaryKey;AUTO_INCREMENT" json:"item_id"` //auto_increment
	Name   string  `json:"name"`
	Price  float32 `json:"price"`
	Link   string  `json:"link"`
}

type Iteminput struct {
	ItemId   uint64 `json:"item_id"`
	Quantity uint64 `json:"quantity"`
}

type Loyalty struct {
	Points uint64 `json:"points"`
}

type Orders struct {
	gorm.Model

	CustomerId uint64    `json:"customer_id"`
	StoreId    uint64    `json:"store_id"`
	OrderId    uint64    `json:"order_id"`
	Status     string    `json:"status"`
	OrderDate  time.Time `json:"order_date"`
	ItemId     uint64    `json:"item_id"`
	ItemName   string    `json:"item_name"`
	Quantity   uint64    `json:"quantity"`
	Price      float32   `json:"price"`
}

type Stores struct {
	gorm.Model

	// primary key
	StoreId   uint64 `gorm:"primaryKey;AUTO_INCREMENT" json:"store_id"` //auto_increment
	StoreName string `json:"store_name"`
	Street    string `json:"street"`
	City      string `json:"city"`
	State     string `json:"state"`
	Pincode   uint64 `json:"pincode"`
	Status    uint64 `json:"status"` //0 or 1
}

type GrafanaTest struct {
	gorm.Model

	Flag string
}
