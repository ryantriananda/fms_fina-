package main

import (
	"fms-backend/config"
	"fms-backend/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	config.ConnectDatabase()

	// Setup Gin router
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Setup routes
	routes.SetupRoutes(r)

	// Start server
	log.Println("Server starting on port 8080")
	r.Run(":8080")
}
