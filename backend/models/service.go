package models

import "time"

type Service struct {
	ID            uint       `json:"id" gorm:"primaryKey"`
	VehicleID     uint       `json:"vehicleId"`
	VendorID      *uint      `json:"vendorId"`
	TglRequest    *time.Time `json:"tglRequest"`
	JenisServis   string     `json:"jenisServis"`
	Masalah       string     `json:"masalah"`
	EstimasiBiaya float64    `json:"estimasiBiaya"`
	TglSelesai    *time.Time `json:"tglSelesai"`
	BiayaAktual   float64    `json:"biayaAktual"`
	KmServis      int        `json:"kmServis"`
	Status        string     `json:"status" gorm:"default:'pending'"`
	Catatan       string     `json:"catatan"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}
