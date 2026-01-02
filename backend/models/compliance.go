package models

import "time"

type Compliance struct {
	ID            uint       `json:"id" gorm:"primaryKey"`
	BuildingID    uint       `json:"buildingId"`
	TipeDokumen   string     `json:"tipeDokumen"`
	NoDokumen     string     `json:"noDokumen"`
	NamaDokumen   string     `json:"namaDokumen"`
	TglTerbit     *time.Time `json:"tglTerbit"`
	TglBerakhir   *time.Time `json:"tglBerakhir"`
	Penerbit      string     `json:"penerbit"`
	Status        string     `json:"status" gorm:"default:'active'"`
	FilePath      string     `json:"filePath"`
	Catatan       string     `json:"catatan"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}
