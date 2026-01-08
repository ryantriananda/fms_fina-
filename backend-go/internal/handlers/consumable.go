package handlers

import (
	"net/http"

	"fms-backend/internal/models"
	"fms-backend/internal/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ConsumableHandler struct {
	DB *gorm.DB
}

// Master Items (ATK/ARK)
func (h *ConsumableHandler) GetItems(c *gin.Context) {
	itemType := c.Query("type") // ATK or ARK
	var items []models.MasterItem
	query := h.DB.Order("created_at DESC")
	if itemType != "" {
		query = query.Where("type = ?", itemType)
	}
	if err := query.Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": items})
}

func (h *ConsumableHandler) GetItemByID(c *gin.Context) {
	id := c.Param("id")
	var item models.MasterItem
	if err := h.DB.First(&item, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Item not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": item})
}

func (h *ConsumableHandler) CreateItem(c *gin.Context) {
	var item models.MasterItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	item.ID = utils.GenerateID()
	if err := h.DB.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": item})
}

func (h *ConsumableHandler) UpdateItem(c *gin.Context) {
	id := c.Param("id")
	var item models.MasterItem
	if err := h.DB.First(&item, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false, "error": "Item not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := h.DB.Save(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": item})
}

func (h *ConsumableHandler) DeleteItem(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.MasterItem{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Item deleted"})
}

// Stock Mutations
func (h *ConsumableHandler) GetMutations(c *gin.Context) {
	var mutations []models.StockMutation
	if err := h.DB.Order("created_at DESC").Find(&mutations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": mutations})
}

func (h *ConsumableHandler) CreateMutation(c *gin.Context) {
	var mutation models.StockMutation
	if err := c.ShouldBindJSON(&mutation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	mutation.ID = utils.GenerateID()
	userID := c.GetString("userID")
	mutation.CreatedByID = userID

	// Update stock based on mutation type
	var item models.MasterItem
	if err := h.DB.First(&item, "id = ?", mutation.ItemID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Item not found"})
		return
	}

	if mutation.Type == "IN" {
		item.RemainingStock += mutation.Quantity
	} else if mutation.Type == "OUT" {
		if item.RemainingStock < mutation.Quantity {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Insufficient stock"})
			return
		}
		item.RemainingStock -= mutation.Quantity
	}

	tx := h.DB.Begin()
	if err := tx.Save(&item).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	if err := tx.Create(&mutation).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	tx.Commit()

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": mutation})
}

// Stock Opname
func (h *ConsumableHandler) GetStockOpname(c *gin.Context) {
	var opnames []models.StockOpname
	if err := h.DB.Order("created_at DESC").Find(&opnames).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": opnames})
}

func (h *ConsumableHandler) CreateStockOpname(c *gin.Context) {
	var opname models.StockOpname
	if err := c.ShouldBindJSON(&opname); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": err.Error()})
		return
	}
	opname.ID = utils.GenerateID()
	if err := h.DB.Create(&opname).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"success": true, "data": opname})
}
