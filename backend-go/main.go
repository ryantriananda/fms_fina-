package main

import (
	"fmt"
	"log"

	"fms-backend/internal/config"
	"fms-backend/internal/database"
	"fms-backend/internal/routes"
	"fms-backend/internal/seed"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize config
	cfg := config.Load()

	// Set Gin mode
	gin.SetMode(cfg.GinMode)

	// Initialize database
	db, err := database.Initialize(cfg.DBPath)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Run migrations
	if err := database.Migrate(db); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Seed initial data
	seed.SeedData(db)

	// Setup router
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.FrontendURL, "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "FMS Backend (Go) is running"})
	})

	// Setup routes
	routes.SetupRoutes(r, db, cfg)

	// Start server
	port := cfg.Port
	if port == "" {
		port = "3001"
	}

	fmt.Printf("🚀 Server running on http://localhost:%s\n", port)
	fmt.Printf("📚 Health check: http://localhost:%s/health\n", port)

	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
