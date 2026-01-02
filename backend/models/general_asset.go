package models

import "time"

type GeneralAsset struct {
	ID             uint       `json:"id" gorm:"primaryKey"`
	KodeAset       string     `json:"kodeAset" gorm:"unique;not null"`
	NamaAset       string     `json:"namaAset" gorm:"not null"`
	Kategori       string     `json:"kategori"`
	Merk           string     `json:"merk"`
	Model          string     `json:"model"`
	NoSeri         string     `json:"noSeri"`
	TahunPerolehan int        `json:"tahunPerolehan"`
	NilaiPerolehan float64    `json:"nilaiPerolehan"`
	Kondisi        string     `json:"kondisi"`
	Lokasi         string     `json:"lokasi"`
	Department     string     `json:"department"`
	PIC            string     `json:"pic"`
	Status         string     `json:"status" gorm:"default:'active'"`
	TglPerolehan   *time.Time `json:"tglPerolehan"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
}
