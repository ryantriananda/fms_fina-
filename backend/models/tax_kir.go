package models

import "time"

type TaxKir struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	VehicleID    uint       `json:"vehicleId"`
	Tipe         string     `json:"tipe"`
	TglBerlaku   *time.Time `json:"tglBerlaku"`
	TglBerakhir  *time.Time `json:"tglBerakhir"`
	Biaya        float64    `json:"biaya"`
	Status       string     `json:"status" gorm:"default:'active'"`
	Catatan      string     `json:"catatan"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}
