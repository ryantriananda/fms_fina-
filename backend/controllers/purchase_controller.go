package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPurchases(c *gin.Context) {
	var items []models.Purchase
	pagination := utils.GetPagination(c)
	var total int64
	config.DB.Model(&models.Purchase{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&items)
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	c.JSON(http.StatusOK, gin.H{"data": items, "pagination": pagination})
}

func GetPurchase(c *gin.Context) {
	var item models.Purchase
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func CreatePurchase(c *gin.Context) {
	var item models.Purchase
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdatePurchase(c *gin.Context) {
	var item models.Purchase
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.ShouldBindJSON(&item)
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeletePurchase(c *gin.Context) {
	var item models.Purchase
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
