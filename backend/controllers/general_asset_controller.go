package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetGeneralAssets(c *gin.Context) {
	var assets []models.GeneralAsset
	pagination := utils.GetPagination(c)
	
	var total int64
	config.DB.Model(&models.GeneralAsset{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&assets)
	
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	
	c.JSON(http.StatusOK, gin.H{"data": assets, "pagination": pagination})
}

func GetGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}
	c.JSON(http.StatusOK, asset)
}

func CreateGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&asset)
	c.JSON(http.StatusCreated, asset)
}

func UpdateGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&asset)
	c.JSON(http.StatusOK, asset)
}

func DeleteGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}
	config.DB.Delete(&asset)
	c.JSON(http.StatusOK, gin.H{"message": "Asset deleted"})
}
