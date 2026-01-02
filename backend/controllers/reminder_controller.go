package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GetVehicleReminders(c *gin.Context) {
	var taxKirs []models.TaxKir
	thirtyDaysLater := time.Now().AddDate(0, 0, 30)
	config.DB.Where("tgl_berakhir <= ? AND status = ?", thirtyDaysLater, "active").Find(&taxKirs)
	c.JSON(http.StatusOK, taxKirs)
}

func GetBuildingReminders(c *gin.Context) {
	var maintenances []models.BuildingMaintenance
	config.DB.Where("status = ?", "pending").Find(&maintenances)
	c.JSON(http.StatusOK, maintenances)
}
