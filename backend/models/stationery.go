package models

import "time"

type StationeryRequest struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	NoRequest    string     `json:"noRequest" gorm:"unique;not null"`
	TipeRequest  string     `json:"tipeRequest"`
	UserID       uint       `json:"userId"`
	Department   string     `json:"department"`
	TglRequest   *time.Time `json:"tglRequest"`
	Items        string     `json:"items"`
	TotalHarga   float64    `json:"totalHarga"`
	Status       string     `json:"status" gorm:"default:'pending'"`
	ApprovedBy   *uint      `json:"approvedBy"`
	TglApproval  *time.Time `json:"tglApproval"`
	Catatan      string     `json:"catatan"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}

type MasterItem struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	KodeItem    string    `json:"kodeItem" gorm:"unique;not null"`
	NamaItem    string    `json:"namaItem" gorm:"not null"`
	Kategori    string    `json:"kategori"`
	Satuan      string    `json:"satuan"`
	HargaSatuan float64   `json:"hargaSatuan"`
	Stok        int       `json:"stok"`
	MinStok     int       `json:"minStok"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
