package models

import "time"

type LogBook struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	VehicleID   uint       `json:"vehicleId"`
	UserID      uint       `json:"userId"`
	Tanggal     *time.Time `json:"tanggal"`
	Tujuan      string     `json:"tujuan"`
	KmAwal      int        `json:"kmAwal"`
	KmAkhir     int        `json:"kmAkhir"`
	BBM         float64    `json:"bbm"`
	Keterangan  string     `json:"keterangan"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
}
