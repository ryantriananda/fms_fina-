package models

import "time"

type BuildingAsset struct {
	ID             uint       `json:"id" gorm:"primaryKey"`
	BuildingID     uint       `json:"buildingId"`
	KodeAset       string     `json:"kodeAset" gorm:"unique;not null"`
	NamaAset       string     `json:"namaAset" gorm:"not null"`
	TipeAset       string     `json:"tipeAset"`
	Merk           string     `json:"merk"`
	Model          string     `json:"model"`
	Kapasitas      string     `json:"kapasitas"`
	TahunPerolehan int        `json:"tahunPerolehan"`
	NilaiPerolehan float64    `json:"nilaiPerolehan"`
	Kondisi        string     `json:"kondisi"`
	TglPerolehan   *time.Time `json:"tglPerolehan"`
	Status         string     `json:"status" gorm:"default:'active'"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
}

type BuildingMaintenance struct {
	ID            uint       `json:"id" gorm:"primaryKey"`
	BuildingID    uint       `json:"buildingId"`
	AssetID       *uint      `json:"assetId"`
	VendorID      *uint      `json:"vendorId"`
	TipePemeliharaan string  `json:"tipePemeliharaan"`
	Deskripsi     string     `json:"deskripsi"`
	TglRequest    *time.Time `json:"tglRequest"`
	TglSelesai    *time.Time `json:"tglSelesai"`
	EstimasiBiaya float64    `json:"estimasiBiaya"`
	BiayaAktual   float64    `json:"biayaAktual"`
	Status        string     `json:"status" gorm:"default:'pending'"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}
