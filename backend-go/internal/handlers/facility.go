package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type FacilityHandler struct {
	DB *gorm.DB
}

// Pods
func (h *FacilityHandler) GetPods(c *gin.Context) {
	var pods []models.Pod
	if err := h.DB.Order("created_at DESC").Find(&pods).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": pods})
}

func (h *FacilityHandler) GetPodByID(c *gin.Context) {
	id := c.Param("id")
	var pod models.Pod
	if err := h.DB.First(&pod, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Pod not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": pod})
}

func (h *FacilityHandler) CreatePod(c *gin.Context) {
	var pod models.Pod
	if err := c.ShouldBindJSON(&pod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	pod.ID = utils.GenerateID()
	if err := h.DB.Create(&pod).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": pod})
}

func (h *FacilityHandler) UpdatePod(c *gin.Context) {
	id := c.Param("id")
	var pod models.Pod
	if err := h.DB.First(&pod, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Pod not found"})
		return
	}
	if err := c.ShouldBindJSON(&pod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&pod).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": pod})
}

func (h *FacilityHandler) DeletePod(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.Pod{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Pod deleted"})
}

// Pod Requests
func (h *FacilityHandler) GetPodRequests(c *gin.Context) {
	var requests []models.PodRequest
	if err := h.DB.Order("created_at DESC").Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": requests})
}

func (h *FacilityHandler) CreatePodRequest(c *gin.Context) {
	var request models.PodRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	request.ID = utils.GenerateID()
	userID := c.GetString("userID")
	request.RequestedByID = userID
	if err := h.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": request})
}

// Lockers
func (h *FacilityHandler) GetLockers(c *gin.Context) {
	var lockers []models.Locker
	if err := h.DB.Order("created_at DESC").Find(&lockers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": lockers})
}

func (h *FacilityHandler) GetLockerByID(c *gin.Context) {
	id := c.Param("id")
	var locker models.Locker
	if err := h.DB.First(&locker, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Locker not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": locker})
}

func (h *FacilityHandler) CreateLocker(c *gin.Context) {
	var locker models.Locker
	if err := c.ShouldBindJSON(&locker); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	locker.ID = utils.GenerateID()
	if err := h.DB.Create(&locker).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": locker})
}

func (h *FacilityHandler) UpdateLocker(c *gin.Context) {
	id := c.Param("id")
	var locker models.Locker
	if err := h.DB.First(&locker, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Locker not found"})
		return
	}
	if err := c.ShouldBindJSON(&locker); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&locker).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": locker})
}

func (h *FacilityHandler) DeleteLocker(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.Locker{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Locker deleted"})
}

// Locker Requests
func (h *FacilityHandler) GetLockerRequests(c *gin.Context) {
	var requests []models.LockerRequest
	if err := h.DB.Order("created_at DESC").Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": requests})
}

func (h *FacilityHandler) CreateLockerRequest(c *gin.Context) {
	var request models.LockerRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	request.ID = utils.GenerateID()
	userID := c.GetString("userID")
	request.RequestedByID = userID
	if err := h.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": request})
}
