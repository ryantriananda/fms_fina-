package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	var users []models.User
	pagination := utils.GetPagination(c)
	
	var total int64
	config.DB.Model(&models.User{}).Count(&total)
	
	config.DB.Scopes(utils.Paginate(&pagination)).Find(&users)
	
	pagination.TotalRows = total
	pagination.TotalPages = int((total + int64(pagination.Limit) - 1) / int64(pagination.Limit))
	
	c.JSON(http.StatusOK, gin.H{"data": users, "pagination": pagination})
}

func GetUser(c *gin.Context) {
	var user models.User
	if err := config.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&user)
	c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
	var user models.User
	if err := config.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&user)
	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	var user models.User
	if err := config.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	config.DB.Delete(&user)
	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
