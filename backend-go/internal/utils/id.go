package utils

import (
	"crypto/rand"
	"encoding/hex"
	"time"
)

func GenerateID() string {
	bytes := make([]byte, 12)
	rand.Read(bytes)
	return hex.EncodeToString(bytes) + time.Now().Format("20060102150405")
}
