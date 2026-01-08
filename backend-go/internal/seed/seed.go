package seed

import (
	"log"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"gorm.io/gorm"
)

func SeedData(db *gorm.DB) {
	// Check if admin exists
	var count int64
	db.Model(&models.User{}).Where("email = ?", "admin@modena.com").Count(&count)
	if count > 0 {
		log.Println("📦 Database already seeded")
		return
	}

	log.Println("🌱 Seeding database...")

	// Create Admin User
	adminPassword, _ := utils.HashPassword("admin123")
	admin := models.User{
		ID:         utils.GenerateID(),
		Email:      "admin@modena.com",
		Password:   adminPassword,
		Name:       "Admin User",
		Role:       "Admin",
		Department: "GA",
		Status:     "Active",
	}
	db.Create(&admin)
	log.Println("✅ Admin user created:", admin.Email)

	// Create Staff User
	staffPassword, _ := utils.HashPassword("staff123")
	staff := models.User{
		ID:         utils.GenerateID(),
		Email:      "staff@modena.com",
		Password:   staffPassword,
		Name:       "Staff User",
		Role:       "Staff",
		Department: "IT",
		Status:     "Active",
	}
	db.Create(&staff)
	log.Println("✅ Staff user created:", staff.Email)

	// Create Sample Vehicle
	vehicle := models.Vehicle{
		ID:             utils.GenerateID(),
		NoPolisi:       "B 1234 ABC",
		Nama:           "Toyota Avanza",
		Merek:          "Toyota",
		Model:          "G MT",
		TipeKendaraan:  "MPV",
		TahunPembuatan: "2020",
		Warna:          "Hitam",
		Ownership:      "Milik Modena",
		Channel:        "HCO",
		Cabang:         "Jakarta",
		Status:         "Aktif",
		ApprovalStatus: "Approved",
		CreatedByID:    admin.ID,
	}
	db.Create(&vehicle)
	log.Println("✅ Sample vehicle created:", vehicle.NoPolisi)

	// Create Sample Building
	building := models.Building{
		ID:               utils.GenerateID(),
		AssetNo:          "BDG-001",
		Name:             "MODENA Head Office",
		Type:             "Office",
		Ownership:        "Rent",
		Location:         "Jakarta",
		Address:          "Jl. Satrio No. 1",
		Status:           "Active",
		RentCost:         "500000000",
		ElectricityPower: "100000 VA",
		WaterSource:      "PDAM",
	}
	db.Create(&building)
	log.Println("✅ Sample building created:", building.Name)

	// Create Master Data
	masterDataItems := []models.MasterData{
		{ID: utils.GenerateID(), Category: "Brand", Name: "Toyota"},
		{ID: utils.GenerateID(), Category: "Brand", Name: "Honda"},
		{ID: utils.GenerateID(), Category: "Brand", Name: "Daihatsu"},
		{ID: utils.GenerateID(), Category: "Color", Name: "Hitam"},
		{ID: utils.GenerateID(), Category: "Color", Name: "Putih"},
		{ID: utils.GenerateID(), Category: "Department", Name: "IT"},
		{ID: utils.GenerateID(), Category: "Department", Name: "HR"},
		{ID: utils.GenerateID(), Category: "Department", Name: "Finance"},
		{ID: utils.GenerateID(), Category: "Location", Name: "Jakarta"},
		{ID: utils.GenerateID(), Category: "Location", Name: "Surabaya"},
	}
	for _, item := range masterDataItems {
		db.Create(&item)
	}
	log.Println("✅ Master data created")

	// Create Sample Vendor
	vendor := models.Vendor{
		ID:         utils.GenerateID(),
		VendorCode: "VEN-001",
		VendorName: "PT ATK Jaya",
		Type:       "Goods",
		Category:   "ATK",
		Email:      "sales@atkjaya.com",
		Phone:      "021-555555",
		Address:    "Jakarta",
		PicName:    "Pak Budi",
		Status:     "Active",
	}
	db.Create(&vendor)
	log.Println("✅ Sample vendor created")

	log.Println("🎉 Seeding completed!")
}
