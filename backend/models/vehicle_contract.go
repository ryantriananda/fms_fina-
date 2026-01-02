package models

import "time"

type VehicleContract struct {
	ID            uint       `json:"id" gorm:"primaryKey"`
	NoKontrak     string     `json:"noKontrak" gorm:"unique;not null"`
	VehicleID     uint       `json:"vehicleId"`
	VendorID      *uint      `json:"vendorId"`
	TipeKontrak   string     `json:"tipeKontrak"`
	TglMulai      *time.Time `json:"tglMulai"`
	TglBerakhir   *time.Time `json:"tglBerakhir"`
	NilaiBulanan  float64    `json:"nilaiBulanan"`
	TotalNilai    float64    `json:"totalNilai"`
	Status        string     `json:"status" gorm:"default:'active'"`
	Catatan       string     `json:"catatan"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}
