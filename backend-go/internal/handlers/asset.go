package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AssetHandler struct {
	DB *gorm.DB
}

// General Assets
func (h *AssetHandler) GetAll(c *gin.Context) {
	var assets []models.GeneralAsset
	if err := h.DB.Order("created_at DESC").Find(&assets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": assets})
}

func (h *AssetHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	var asset models.GeneralAsset
	if err := h.DB.First(&asset, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Asset not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": asset})
}

func (h *AssetHandler) Create(c *gin.Context) {
	var asset models.GeneralAsset
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	asset.ID = utils.GenerateID()
	if err := h.DB.Create(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": asset})
}

func (h *AssetHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var asset models.GeneralAsset
	if err := h.DB.First(&asset, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Asset not found"})
		return
	}
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": asset})
}

func (h *AssetHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.GeneralAsset{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Asset deleted"})
}
