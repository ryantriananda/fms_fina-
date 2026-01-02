package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMasterItems(c *gin.Context) {
	var items []models.MasterItem
	pagination := utils.GetPagination(c)
	var total int64
	config.DB.Model(&models.MasterItem{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&items)
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	c.JSON(http.StatusOK, gin.H{"data": items, "pagination": pagination})
}

func GetMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func CreateMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.ShouldBindJSON(&item)
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
