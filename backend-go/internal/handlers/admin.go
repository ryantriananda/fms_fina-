package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AdminHandler struct {
	DB *gorm.DB
}

// Users
func (h *AdminHandler) GetUsers(c *gin.Context) {
	var users []models.User
	if err := h.DB.Order("name ASC").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": users})
}

func (h *AdminHandler) CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}

	// Hash password
	hashedPassword, _ := utils.HashPassword("password123")
	user.ID = utils.GenerateID()
	user.Password = hashedPassword

	if err := h.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": user})
}

// Vendors
func (h *AdminHandler) GetVendors(c *gin.Context) {
	var vendors []models.Vendor
	if err := h.DB.Order("vendor_name ASC").Find(&vendors).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": vendors})
}

func (h *AdminHandler) CreateVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	vendor.ID = utils.GenerateID()
	if err := h.DB.Create(&vendor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": vendor})
}

// Master Data
func (h *AdminHandler) GetMasterData(c *gin.Context) {
	category := c.Query("category")
	var data []models.MasterData

	query := h.DB.Order("name ASC")
	if category != "" {
		query = query.Where("category = ?", category)
	}

	if err := query.Find(&data).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": data})
}

func (h *AdminHandler) CreateMasterData(c *gin.Context) {
	var data models.MasterData
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	data.ID = utils.GenerateID()
	if err := h.DB.Create(&data).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": data})
}
