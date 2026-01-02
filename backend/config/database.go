package config

import (
	"fmt"
	"log"
	"os"

	"fms-backend/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	godotenv.Load()

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate models
	db.AutoMigrate(
		&models.User{},
		&models.Vehicle{},
		&models.Building{},
		&models.GeneralAsset{},
		&models.Vendor{},
		&models.Insurance{},
		&models.Service{},
		&models.TaxKir{},
		&models.Mutation{},
		&models.Sale{},
		&models.Utility{},
		&models.Timesheet{},
		&models.LogBook{},
		&models.StationeryRequest{},
		&models.MasterItem{},
		&models.Purchase{},
		&models.VehicleContract{},
		&models.BuildingAsset{},
		&models.BuildingMaintenance{},
		&models.MasterApproval{},
		&models.DeliveryLocation{},
		&models.GeneralMaster{},
		&models.MasterCategory{},
		&models.Compliance{},
	)

	DB = db
	log.Println("Database connected successfully")
}
