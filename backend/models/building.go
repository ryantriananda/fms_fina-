package models

import "time"

type Building struct {
	ID              uint       `json:"id" gorm:"primaryKey"`
	KodeGedung      string     `json:"kodeGedung" gorm:"unique;not null"`
	NamaGedung      string     `json:"namaGedung" gorm:"not null"`
	TipeGedung      string     `json:"tipeGedung"`
	Alamat          string     `json:"alamat"`
	Kota            string     `json:"kota"`
	Provinsi        string     `json:"provinsi"`
	KodePos         string     `json:"kodePos"`
	LuasTanah       float64    `json:"luasTanah"`
	LuasBangunan    float64    `json:"luasBangunan"`
	JumlahLantai    int        `json:"jumlahLantai"`
	TahunDibangun   int        `json:"tahunDibangun"`
	StatusKepemilikan string   `json:"statusKepemilikan"`
	NilaiAset       float64    `json:"nilaiAset"`
	TglPerolehan    *time.Time `json:"tglPerolehan"`
	NoSertifikat    string     `json:"noSertifikat"`
	NoIMB           string     `json:"noIMB"`
	Status          string     `json:"status" gorm:"default:'active'"`
	CreatedAt       time.Time  `json:"createdAt"`
	UpdatedAt       time.Time  `json:"updatedAt"`
}
