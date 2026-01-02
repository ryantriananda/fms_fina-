package models

import "time"

type MasterApproval struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Modul       string    `json:"modul" gorm:"not null"`
	Level       int       `json:"level"`
	UserID      uint      `json:"userId"`
	MinAmount   float64   `json:"minAmount"`
	MaxAmount   float64   `json:"maxAmount"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type DeliveryLocation struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	KodeLokasi  string    `json:"kodeLokasi" gorm:"unique;not null"`
	NamaLokasi  string    `json:"namaLokasi" gorm:"not null"`
	Alamat      string    `json:"alamat"`
	Kota        string    `json:"kota"`
	PIC         string    `json:"pic"`
	Telepon     string    `json:"telepon"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type GeneralMaster struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Category    string    `json:"category" gorm:"not null;index"`
	Name        string    `json:"name" gorm:"not null"`
	Code        string    `json:"code" gorm:"not null"`
	Value       string    `json:"value"`
	Description string    `json:"description"`
	SortOrder   int       `json:"sortOrder" gorm:"default:0"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	IsDefault   bool      `json:"isDefault" gorm:"default:false"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type MasterCategory struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Code        string    `json:"code" gorm:"unique;not null"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
