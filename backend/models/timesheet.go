package models

import "time"

type Timesheet struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	UserID      uint       `json:"userId"`
	Tanggal     *time.Time `json:"tanggal"`
	JamMasuk    string     `json:"jamMasuk"`
	JamKeluar   string     `json:"jamKeluar"`
	Aktivitas   string     `json:"aktivitas"`
	Lokasi      string     `json:"lokasi"`
	Status      string     `json:"status" gorm:"default:'pending'"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
}
