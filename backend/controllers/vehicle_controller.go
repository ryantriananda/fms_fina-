package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetVehicles(c *gin.Context) {
	var vehicles []models.Vehicle
	pagination := utils.GetPagination(c)
	
	var total int64
	config.DB.Model(&models.Vehicle{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&vehicles)
	
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	
	c.JSON(http.StatusOK, gin.H{"data": vehicles, "pagination": pagination})
}

func GetVehicle(c *gin.Context) {
	var vehicle models.Vehicle
	if err := config.DB.First(&vehicle, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}
	c.JSON(http.StatusOK, vehicle)
}

func CreateVehicle(c *gin.Context) {
	var vehicle models.Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&vehicle)
	c.JSON(http.StatusCreated, vehicle)
}

func UpdateVehicle(c *gin.Context) {
	var vehicle models.Vehicle
	if err := config.DB.First(&vehicle, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&vehicle)
	c.JSON(http.StatusOK, vehicle)
}

func DeleteVehicle(c *gin.Context) {
	var vehicle models.Vehicle
	if err := config.DB.First(&vehicle, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}
	config.DB.Delete(&vehicle)
	c.JSON(http.StatusOK, gin.H{"message": "Vehicle deleted"})
}
