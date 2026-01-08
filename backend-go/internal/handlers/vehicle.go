package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type VehicleHandler struct {
	DB *gorm.DB
}

func (h *VehicleHandler) GetAll(c *gin.Context) {
	var vehicles []models.Vehicle
	if err := h.DB.Order("created_at DESC").Find(&vehicles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": vehicles})
}

func (h *VehicleHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	var vehicle models.Vehicle
	if err := h.DB.First(&vehicle, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Vehicle not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": vehicle})
}

func (h *VehicleHandler) Create(c *gin.Context) {
	var vehicle models.Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}

	vehicle.ID = utils.GenerateID()
	userID := c.GetString("userID")
	vehicle.CreatedByID = userID

	if err := h.DB.Create(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": vehicle})
}

func (h *VehicleHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var vehicle models.Vehicle
	if err := h.DB.First(&vehicle, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Vehicle not found"})
		return
	}

	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}

	if err := h.DB.Save(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": vehicle})
}

func (h *VehicleHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.Vehicle{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Vehicle deleted"})
}

// Contracts
func (h *VehicleHandler) GetContracts(c *gin.Context) {
	var contracts []models.VehicleContract
	if err := h.DB.Order("created_at DESC").Find(&contracts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": contracts})
}

func (h *VehicleHandler) CreateContract(c *gin.Context) {
	var contract models.VehicleContract
	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	contract.ID = utils.GenerateID()
	if err := h.DB.Create(&contract).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": contract})
}

// Services
func (h *VehicleHandler) GetServices(c *gin.Context) {
	var services []models.VehicleService
	if err := h.DB.Order("created_at DESC").Find(&services).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": services})
}

func (h *VehicleHandler) CreateService(c *gin.Context) {
	var service models.VehicleService
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	service.ID = utils.GenerateID()
	if err := h.DB.Create(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": service})
}
