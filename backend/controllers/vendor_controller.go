package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetVendors(c *gin.Context) {
	var vendors []models.Vendor
	pagination := utils.GetPagination(c)
	
	var total int64
	config.DB.Model(&models.Vendor{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&vendors)
	
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	
	c.JSON(http.StatusOK, gin.H{"data": vendors, "pagination": pagination})
}

func GetVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	c.JSON(http.StatusOK, vendor)
}

func CreateVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&vendor)
	c.JSON(http.StatusCreated, vendor)
}

func UpdateVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&vendor)
	c.JSON(http.StatusOK, vendor)
}

func DeleteVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	config.DB.Delete(&vendor)
	c.JSON(http.StatusOK, gin.H{"message": "Vendor deleted"})
}
