package models

import "time"

type Vendor struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	KodeVendor  string    `json:"kodeVendor" gorm:"unique;not null"`
	NamaVendor  string    `json:"namaVendor" gorm:"not null"`
	Kategori    string    `json:"kategori"`
	Alamat      string    `json:"alamat"`
	Kota        string    `json:"kota"`
	Telepon     string    `json:"telepon"`
	Email       string    `json:"email"`
	PIC         string    `json:"pic"`
	NPWP        string    `json:"npwp"`
	NoRekening  string    `json:"noRekening"`
	NamaBank    string    `json:"namaBank"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
