package models

import "time"

type Utility struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	BuildingID   uint       `json:"buildingId"`
	TipeUtilitas string     `json:"tipeUtilitas"`
	Periode      string     `json:"periode"`
	Pemakaian    float64    `json:"pemakaian"`
	Satuan       string     `json:"satuan"`
	Biaya        float64    `json:"biaya"`
	TglTagihan   *time.Time `json:"tglTagihan"`
	TglBayar     *time.Time `json:"tglBayar"`
	Status       string     `json:"status" gorm:"default:'unpaid'"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}
