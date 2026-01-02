package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Master Approvals
func GetMasterApprovals(c *gin.Context) {
	var items []models.MasterApproval
	pagination := utils.GetPagination(c)
	var total int64
	config.DB.Model(&models.MasterApproval{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&items)
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	c.JSON(http.StatusOK, gin.H{"data": items, "pagination": pagination})
}

func GetMasterApproval(c *gin.Context) {
	var item models.MasterApproval
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func CreateMasterApproval(c *gin.Context) {
	var item models.MasterApproval
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateMasterApproval(c *gin.Context) {
	var item models.MasterApproval
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.ShouldBindJSON(&item)
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteMasterApproval(c *gin.Context) {
	var item models.MasterApproval
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}

// Delivery Locations
func GetDeliveryLocations(c *gin.Context) {
	var items []models.DeliveryLocation
	pagination := utils.GetPagination(c)
	var total int64
	config.DB.Model(&models.DeliveryLocation{}).Count(&total)
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&items)
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	c.JSON(http.StatusOK, gin.H{"data": items, "pagination": pagination})
}

func GetDeliveryLocation(c *gin.Context) {
	var item models.DeliveryLocation
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func CreateDeliveryLocation(c *gin.Context) {
	var item models.DeliveryLocation
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateDeliveryLocation(c *gin.Context) {
	var item models.DeliveryLocation
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.ShouldBindJSON(&item)
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteDeliveryLocation(c *gin.Context) {
	var item models.DeliveryLocation
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}

// Master Categories
func GetMasterCategories(c *gin.Context) {
	var items []models.MasterCategory
	config.DB.Where("is_active = ?", true).Find(&items)
	c.JSON(http.StatusOK, items)
}

func CreateMasterCategory(c *gin.Context) {
	var item models.MasterCategory
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateMasterCategory(c *gin.Context) {
	var item models.MasterCategory
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.ShouldBindJSON(&item)
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteMasterCategory(c *gin.Context) {
	var item models.MasterCategory
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
