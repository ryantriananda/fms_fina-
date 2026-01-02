package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetGeneralMasters(c *gin.Context) {
	var items []models.GeneralMaster
	config.DB.Where("is_active = ?", true).Order("category, sort_order, name").Find(&items)
	c.JSON(http.StatusOK, items)
}

func GetMastersByCategory(c *gin.Context) {
	category := c.Param("category")
	var items []models.GeneralMaster
	config.DB.Where("category = ? AND is_active = ?", category, true).Order("sort_order, name").Find(&items)
	c.JSON(http.StatusOK, items)
}

func GetGeneralMaster(c *gin.Context) {
	var item models.GeneralMaster
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func CreateGeneralMaster(c *gin.Context) {
	var item models.GeneralMaster
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateGeneralMaster(c *gin.Context) {
	var item models.GeneralMaster
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.ShouldBindJSON(&item)
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteGeneralMaster(c *gin.Context) {
	var item models.GeneralMaster
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}

func BulkCreateGeneralMasters(c *gin.Context) {
	var items []models.GeneralMaster
	if err := c.ShouldBindJSON(&items); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&items)
	c.JSON(http.StatusCreated, gin.H{"message": "Created", "count": len(items)})
}
