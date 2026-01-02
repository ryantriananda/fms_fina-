package models

import "time"

type Insurance struct {
	ID             uint       `json:"id" gorm:"primaryKey"`
	NoPolis        string     `json:"noPolis" gorm:"unique;not null"`
	TipeAsuransi   string     `json:"tipeAsuransi"`
	NamaAsuransi   string     `json:"namaAsuransi"`
	VehicleID      *uint      `json:"vehicleId"`
	BuildingID     *uint      `json:"buildingId"`
	TglMulai       *time.Time `json:"tglMulai"`
	TglBerakhir    *time.Time `json:"tglBerakhir"`
	NilaiPertanggungan float64 `json:"nilaiPertanggungan"`
	Premi          float64    `json:"premi"`
	Status         string     `json:"status" gorm:"default:'active'"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
}
