package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBuildings(c *gin.Context) {
	var buildings []models.Building
	pagination := utils.GetPagination(c)
	
	var total int64
	config.DB.Model(&models.Building{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&buildings)
	
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	
	c.JSON(http.StatusOK, gin.H{"data": buildings, "pagination": pagination})
}

func GetBuilding(c *gin.Context) {
	var building models.Building
	if err := config.DB.First(&building, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building not found"})
		return
	}
	c.JSON(http.StatusOK, building)
}

func CreateBuilding(c *gin.Context) {
	var building models.Building
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&building)
	c.JSON(http.StatusCreated, building)
}

func UpdateBuilding(c *gin.Context) {
	var building models.Building
	if err := config.DB.First(&building, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building not found"})
		return
	}
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&building)
	c.JSON(http.StatusOK, building)
}

func DeleteBuilding(c *gin.Context) {
	var building models.Building
	if err := config.DB.First(&building, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building not found"})
		return
	}
	config.DB.Delete(&building)
	c.JSON(http.StatusOK, gin.H{"message": "Building deleted"})
}
