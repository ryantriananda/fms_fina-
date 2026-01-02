package models

import "time"

type Mutation struct {
	ID            uint       `json:"id" gorm:"primaryKey"`
	TipeMutasi    string     `json:"tipeMutasi"`
	VehicleID     *uint      `json:"vehicleId"`
	AssetID       *uint      `json:"assetId"`
	DariLokasi    string     `json:"dariLokasi"`
	KeLokasi      string     `json:"keLokasi"`
	DariDepartment string    `json:"dariDepartment"`
	KeDepartment  string     `json:"keDepartment"`
	TglMutasi     *time.Time `json:"tglMutasi"`
	Alasan        string     `json:"alasan"`
	Status        string     `json:"status" gorm:"default:'pending'"`
	ApprovedBy    *uint      `json:"approvedBy"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}
