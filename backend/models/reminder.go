package models

import "time"

type Reminder struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Tipe        string     `json:"tipe"`
	RefID       uint       `json:"refId"`
	RefType     string     `json:"refType"`
	Judul       string     `json:"judul"`
	Deskripsi   string     `json:"deskripsi"`
	TglReminder *time.Time `json:"tglReminder"`
	Status      string     `json:"status" gorm:"default:'pending'"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
}
