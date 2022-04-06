package utils

import (
	"fmt"
	"log"
	"opensoft-backend/models"
	"os"

	//	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func InitialMigration() {

	// os.Setenv("DATABASE_USERNAME", "postgres")
	// os.Setenv("DATABASE_PASSWORD", "opensoft-database")
	// os.Setenv("DATABASE_NAME", "opensoft_db")
	// os.Setenv("DATABASE_HOST", "opensoft-database.ccqfjspwhh85.ap-south-1.rds.amazonaws.com")
	// os.Setenv("DATABASE_PORT", "5432")
	// os.Setenv("SERVER_PORT", "8080")

	DatabaseUsername := os.Getenv("DATABASE_USERNAME")
	DatabasePassword := os.Getenv("DATABASE_PASSWORD")
	DatabaseName := os.Getenv("DATABASE_NAME")
	DatabaseHost := os.Getenv("DATABASE_HOST")
	DatabasePort := os.Getenv("DATABASE_PORT")

	newURI := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		DatabaseHost,
		DatabaseUsername,
		DatabasePassword,
		DatabaseName,
		DatabasePort,
	)

	db, err := gorm.Open("postgres", newURI)
	if err != nil {
		LOG.Println(err)
		panic(err)
	}

	/* Automatically migrate your schema, to keep your schema up to date. */
	db.AutoMigrate(&models.Customers{})
	db.AutoMigrate(&models.Items{})
	db.AutoMigrate(&models.Orders{})
	db.AutoMigrate(&models.Stores{})
	db.AutoMigrate(&models.Vendors{})
	db.AutoMigrate(&models.GrafanaTest{})
}

func GetDB() *gorm.DB {
	var mainLogger = log.New(os.Stderr, "Message: ", log.LstdFlags|log.Lshortfile)

	DatabaseUsername := os.Getenv("DATABASE_USERNAME")
	DatabasePassword := os.Getenv("DATABASE_PASSWORD")
	DatabaseName := os.Getenv("DATABASE_NAME")
	DatabaseHost := os.Getenv("DATABASE_HOST")
	DatabasePort := os.Getenv("DATABASE_PORT")

	newURI := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		DatabaseHost,
		DatabaseUsername,
		DatabasePassword,
		DatabaseName,
		DatabasePort,
	)

	db, err := gorm.Open("postgres", newURI)
	if err != nil {
		mainLogger.Println(err)
		panic(err)
	}
	return db
}
