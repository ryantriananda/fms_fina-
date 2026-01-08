package database

import (
	"os"
	"path/filepath"

	"fms-backend/internal/models"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Initialize(dbPath string) (*gorm.DB, error) {
	// Create directory if not exists
	dir := filepath.Dir(dbPath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return nil, err
	}

	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func Migrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Vehicle{},
		&models.VehicleContract{},
		&models.VehicleService{},
		&models.Building{},
		&models.Utility{},
		&models.GeneralAsset{},
		&models.MasterItem{},
		&models.Vendor{},
		&models.MasterData{},
		&models.StockMutation{},
		&models.StockOpname{},
		&models.Pod{},
		&models.PodRequest{},
		&models.Locker{},
		&models.LockerRequest{},
		&models.InsurancePolicy{},
		&models.InsuranceClaim{},
		&models.InsuranceProvider{},
	)
}
