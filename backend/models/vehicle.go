package models

import "time"

type Vehicle struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	NoPolisi        string    `json:"noPolisi" gorm:"unique;not null"`
	NomorRangka     string    `json:"nomorRangka"`
	NomorMesin      string    `json:"nomorMesin"`
	Merk            string    `json:"merk"`
	Model           string    `json:"model"`
	Tahun           int       `json:"tahun"`
	Warna           string    `json:"warna"`
	TipeKendaraan   string    `json:"tipeKendaraan"`
	StatusKepemilikan string  `json:"statusKepemilikan"`
	TglPerolehan    *time.Time `json:"tglPerolehan"`
	NilaiPerolehan  float64   `json:"nilaiPerolehan"`
	Lokasi          string    `json:"lokasi"`
	Department      string    `json:"department"`
	PIC             string    `json:"pic"`
	Status          string    `json:"status" gorm:"default:'active'"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}
