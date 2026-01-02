package utils

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Pagination struct {
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	TotalRows  int64 `json:"totalRows"`
	TotalPages int   `json:"totalPages"`
}

func GetPagination(c *gin.Context) Pagination {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	return Pagination{Page: page, Limit: limit}
}

func Paginate(pagination *Pagination) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		offset := (pagination.Page - 1) * pagination.Limit
		return db.Offset(offset).Limit(pagination.Limit)
	}
}
