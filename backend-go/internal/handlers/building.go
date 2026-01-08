package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BuildingHandler struct {
	DB *gorm.DB
}

func (h *BuildingHandler) GetAll(c *gin.Context) {
	var buildings []models.Building
	if err := h.DB.Order("created_at DESC").Find(&buildings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": buildings})
}

func (h *BuildingHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	var building models.Building
	if err := h.DB.First(&building, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Building not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": building})
}

func (h *BuildingHandler) Create(c *gin.Context) {
	var building models.Building
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	building.ID = utils.GenerateID()
	if err := h.DB.Create(&building).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": building})
}

func (h *BuildingHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var building models.Building
	if err := h.DB.First(&building, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Building not found"})
		return
	}

	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}

	if err := h.DB.Save(&building).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": building})
}

func (h *BuildingHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.Building{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Building deleted"})
}

// Utilities
func (h *BuildingHandler) GetUtilities(c *gin.Context) {
	var utilities []models.Utility
	if err := h.DB.Order("created_at DESC").Find(&utilities).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": utilities})
}

func (h *BuildingHandler) CreateUtility(c *gin.Context) {
	var utility models.Utility
	if err := c.ShouldBindJSON(&utility); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	utility.ID = utils.GenerateID()
	if err := h.DB.Create(&utility).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": utility})
}
