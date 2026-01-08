package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type InsuranceHandler struct {
	DB *gorm.DB
}

// Insurance Policies
func (h *InsuranceHandler) GetPolicies(c *gin.Context) {
	var policies []models.InsurancePolicy
	if err := h.DB.Order("created_at DESC").Find(&policies).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": policies})
}

func (h *InsuranceHandler) GetPolicyByID(c *gin.Context) {
	id := c.Param("id")
	var policy models.InsurancePolicy
	if err := h.DB.First(&policy, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Policy not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": policy})
}

func (h *InsuranceHandler) CreatePolicy(c *gin.Context) {
	var policy models.InsurancePolicy
	if err := c.ShouldBindJSON(&policy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	policy.ID = utils.GenerateID()
	if err := h.DB.Create(&policy).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": policy})
}

func (h *InsuranceHandler) UpdatePolicy(c *gin.Context) {
	id := c.Param("id")
	var policy models.InsurancePolicy
	if err := h.DB.First(&policy, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Policy not found"})
		return
	}
	if err := c.ShouldBindJSON(&policy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&policy).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": policy})
}

func (h *InsuranceHandler) DeletePolicy(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.InsurancePolicy{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Policy deleted"})
}

// Insurance Claims
func (h *InsuranceHandler) GetClaims(c *gin.Context) {
	var claims []models.InsuranceClaim
	if err := h.DB.Order("created_at DESC").Find(&claims).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": claims})
}

func (h *InsuranceHandler) CreateClaim(c *gin.Context) {
	var claim models.InsuranceClaim
	if err := c.ShouldBindJSON(&claim); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	claim.ID = utils.GenerateID()
	if err := h.DB.Create(&claim).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": claim})
}

func (h *InsuranceHandler) UpdateClaim(c *gin.Context) {
	id := c.Param("id")
	var claim models.InsuranceClaim
	if err := h.DB.First(&claim, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Claim not found"})
		return
	}
	if err := c.ShouldBindJSON(&claim); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&claim).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": claim})
}

// Insurance Providers
func (h *InsuranceHandler) GetProviders(c *gin.Context) {
	var providers []models.InsuranceProvider
	if err := h.DB.Order("created_at DESC").Find(&providers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": providers})
}

func (h *InsuranceHandler) CreateProvider(c *gin.Context) {
	var provider models.InsuranceProvider
	if err := c.ShouldBindJSON(&provider); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	provider.ID = utils.GenerateID()
	if err := h.DB.Create(&provider).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": provider})
}

func (h *InsuranceHandler) UpdateProvider(c *gin.Context) {
	id := c.Param("id")
	var provider models.InsuranceProvider
	if err := h.DB.First(&provider, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Provider not found"})
		return
	}
	if err := c.ShouldBindJSON(&provider); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&provider).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": provider})
}

func (h *InsuranceHandler) DeleteProvider(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.InsuranceProvider{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Provider deleted"})
}
