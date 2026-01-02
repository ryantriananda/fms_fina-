package models

import "time"

type Purchase struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	NoPO         string     `json:"noPO" gorm:"unique;not null"`
	VendorID     uint       `json:"vendorId"`
	TglPO        *time.Time `json:"tglPO"`
	Items        string     `json:"items"`
	TotalHarga   float64    `json:"totalHarga"`
	PPN          float64    `json:"ppn"`
	GrandTotal   float64    `json:"grandTotal"`
	Status       string     `json:"status" gorm:"default:'pending'"`
	TglKirim     *time.Time `json:"tglKirim"`
	TglTerima    *time.Time `json:"tglTerima"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}
