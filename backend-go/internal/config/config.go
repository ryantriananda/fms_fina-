package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port            string
	GinMode         string
	JWTSecret       string
	JWTExpiresHours int
	DBPath          string
	FrontendURL     string
}

func Load() *Config {
	expiresHours, _ := strconv.Atoi(getEnv("JWT_EXPIRES_HOURS", "168"))

	return &Config{
		Port:            getEnv("PORT", "3001"),
		GinMode:         getEnv("GIN_MODE", "debug"),
		JWTSecret:       getEnv("JWT_SECRET", "fms-secret-key-2024"),
		JWTExpiresHours: expiresHours,
		DBPath:          getEnv("DB_PATH", "./data/fms.db"),
		FrontendURL:     getEnv("FRONTEND_URL", "http://localhost:3000"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
