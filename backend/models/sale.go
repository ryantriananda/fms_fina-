package models

import "time"

type Sale struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	TipePenjualan string    `json:"tipePenjualan"`
	VehicleID    *uint      `json:"vehicleId"`
	AssetID      *uint      `json:"assetId"`
	Pembeli      string     `json:"pembeli"`
	HargaJual    float64    `json:"hargaJual"`
	TglPenjualan *time.Time `json:"tglPenjualan"`
	MetodePembayaran string `json:"metodePembayaran"`
	Status       string     `json:"status" gorm:"default:'pending'"`
	Catatan      string     `json:"catatan"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}
