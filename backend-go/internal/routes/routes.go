package routes

import (
	"fms-backend/internal/config"
	"fms-backend/internal/handlers"
	"fms-backend/internal/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.Engine, db *gorm.DB, cfg *config.Config) {
	// Handlers
	authHandler := &handlers.AuthHandler{DB: db, Cfg: cfg}
	vehicleHandler := &handlers.VehicleHandler{DB: db}
	buildingHandler := &handlers.BuildingHandler{DB: db}
	adminHandler := &handlers.AdminHandler{DB: db}
	assetHandler := &handlers.AssetHandler{DB: db}
	consumableHandler := &handlers.ConsumableHandler{DB: db}
	facilityHandler := &handlers.FacilityHandler{DB: db}
	insuranceHandler := &handlers.InsuranceHandler{DB: db}

	// API group
	api := r.Group("/api")

	// Auth routes (public)
	auth := api.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
		auth.GET("/me", middleware.AuthMiddleware(cfg), authHandler.GetMe)
	}

	// Protected routes
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware(cfg))

	// Vehicle routes
	vehicles := protected.Group("/vehicles")
	{
		vehicles.GET("", vehicleHandler.GetAll)
		vehicles.GET("/:id", vehicleHandler.GetByID)
		vehicles.POST("", vehicleHandler.Create)
		vehicles.PUT("/:id", vehicleHandler.Update)
		vehicles.DELETE("/:id", vehicleHandler.Delete)

		// Contracts
		vehicles.GET("/contracts/all", vehicleHandler.GetContracts)
		vehicles.POST("/contracts", vehicleHandler.CreateContract)

		// Services
		vehicles.GET("/services/all", vehicleHandler.GetServices)
		vehicles.POST("/services", vehicleHandler.CreateService)
	}

	// Building routes
	buildings := protected.Group("/buildings")
	{
		buildings.GET("", buildingHandler.GetAll)
		buildings.GET("/:id", buildingHandler.GetByID)
		buildings.POST("", buildingHandler.Create)
		buildings.PUT("/:id", buildingHandler.Update)
		buildings.DELETE("/:id", buildingHandler.Delete)

		// Utilities
		buildings.GET("/utilities/all", buildingHandler.GetUtilities)
		buildings.POST("/utilities", buildingHandler.CreateUtility)
	}

	// Asset routes
	assets := protected.Group("/assets")
	{
		assets.GET("", assetHandler.GetAll)
		assets.GET("/:id", assetHandler.GetByID)
		assets.POST("", assetHandler.Create)
		assets.PUT("/:id", assetHandler.Update)
		assets.DELETE("/:id", assetHandler.Delete)
	}

	// Consumable routes (ATK/ARK)
	consumables := protected.Group("/consumables")
	{
		consumables.GET("/items", consumableHandler.GetItems)
		consumables.GET("/items/:id", consumableHandler.GetItemByID)
		consumables.POST("/items", consumableHandler.CreateItem)
		consumables.PUT("/items/:id", consumableHandler.UpdateItem)
		consumables.DELETE("/items/:id", consumableHandler.DeleteItem)

		consumables.GET("/mutations", consumableHandler.GetMutations)
		consumables.POST("/mutations", consumableHandler.CreateMutation)

		consumables.GET("/stock-opname", consumableHandler.GetStockOpname)
		consumables.POST("/stock-opname", consumableHandler.CreateStockOpname)
	}

	// Facility routes (Pods & Lockers)
	facility := protected.Group("/facility")
	{
		// Pods
		facility.GET("/pods", facilityHandler.GetPods)
		facility.GET("/pods/:id", facilityHandler.GetPodByID)
		facility.POST("/pods", facilityHandler.CreatePod)
		facility.PUT("/pods/:id", facilityHandler.UpdatePod)
		facility.DELETE("/pods/:id", facilityHandler.DeletePod)

		facility.GET("/pod-requests", facilityHandler.GetPodRequests)
		facility.POST("/pod-requests", facilityHandler.CreatePodRequest)

		// Lockers
		facility.GET("/lockers", facilityHandler.GetLockers)
		facility.GET("/lockers/:id", facilityHandler.GetLockerByID)
		facility.POST("/lockers", facilityHandler.CreateLocker)
		facility.PUT("/lockers/:id", facilityHandler.UpdateLocker)
		facility.DELETE("/lockers/:id", facilityHandler.DeleteLocker)

		facility.GET("/locker-requests", facilityHandler.GetLockerRequests)
		facility.POST("/locker-requests", facilityHandler.CreateLockerRequest)
	}

	// Insurance routes
	insurance := protected.Group("/insurance")
	{
		insurance.GET("/policies", insuranceHandler.GetPolicies)
		insurance.GET("/policies/:id", insuranceHandler.GetPolicyByID)
		insurance.POST("/policies", insuranceHandler.CreatePolicy)
		insurance.PUT("/policies/:id", insuranceHandler.UpdatePolicy)
		insurance.DELETE("/policies/:id", insuranceHandler.DeletePolicy)

		insurance.GET("/claims", insuranceHandler.GetClaims)
		insurance.POST("/claims", insuranceHandler.CreateClaim)
		insurance.PUT("/claims/:id", insuranceHandler.UpdateClaim)

		insurance.GET("/providers", insuranceHandler.GetProviders)
		insurance.POST("/providers", insuranceHandler.CreateProvider)
		insurance.PUT("/providers/:id", insuranceHandler.UpdateProvider)
		insurance.DELETE("/providers/:id", insuranceHandler.DeleteProvider)
	}

	// Admin routes
	admin := protected.Group("/admin")
	{
		admin.GET("/users", adminHandler.GetUsers)
		admin.POST("/users", adminHandler.CreateUser)

		admin.GET("/vendors", adminHandler.GetVendors)
		admin.POST("/vendors", adminHandler.CreateVendor)

		admin.GET("/master-data", adminHandler.GetMasterData)
		admin.POST("/master-data", adminHandler.CreateMasterData)
	}
}
