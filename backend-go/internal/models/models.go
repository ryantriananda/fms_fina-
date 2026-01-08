package models

import (
	"time"

	"gorm.io/gorm"
)

// User model
type User struct {
	ID         string         `gorm:"primaryKey" json:"id"`
	Email      string         `gorm:"uniqueIndex;not null" json:"email"`
	Password   string         `gorm:"not null" json:"-"`
	Name       string         `gorm:"not null" json:"name"`
	Role       string         `gorm:"default:Staff" json:"role"`
	Department string         `json:"department,omitempty"`
	Phone      string         `json:"phone,omitempty"`
	Avatar     string         `json:"avatar,omitempty"`
	Status     string         `gorm:"default:Active" json:"status"`
	EmployeeID string         `json:"employeeId,omitempty"`
	CreatedAt  time.Time      `json:"createdAt"`
	UpdatedAt  time.Time      `json:"updatedAt"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// Vehicle model
type Vehicle struct {
	ID             string         `gorm:"primaryKey" json:"id"`
	NoPolisi       string         `gorm:"uniqueIndex;not null" json:"noPolisi"`
	Nama           string         `gorm:"not null" json:"nama"`
	Merek          string         `gorm:"not null" json:"merek"`
	Model          string         `json:"model,omitempty"`
	TipeKendaraan  string         `json:"tipeKendaraan,omitempty"`
	TahunPembuatan string         `json:"tahunPembuatan,omitempty"`
	Warna          string         `json:"warna,omitempty"`
	IsiSilinder    string         `json:"isiSilinder,omitempty"`
	NoRangka       string         `json:"noRangka,omitempty"`
	NoMesin        string         `json:"noMesin,omitempty"`
	Ownership      string         `gorm:"default:Milik Modena" json:"ownership"`
	Channel        string         `json:"channel,omitempty"`
	Cabang         string         `json:"cabang,omitempty"`
	Status         string         `gorm:"default:Aktif" json:"status"`
	ApprovalStatus string         `gorm:"default:Pending" json:"approvalStatus"`
	Pengguna       string         `json:"pengguna,omitempty"`
	TglBeli        *time.Time     `json:"tglBeli,omitempty"`
	HargaBeli      string         `json:"hargaBeli,omitempty"`
	CreatedByID    string         `json:"createdById,omitempty"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// VehicleContract model
type VehicleContract struct {
	ID             string         `gorm:"primaryKey" json:"id"`
	NoKontrak      string         `json:"noKontrak,omitempty"`
	VehicleID      string         `gorm:"not null" json:"vehicleId"`
	Vendor         string         `json:"vendor,omitempty"`
	TglMulai       *time.Time     `json:"tglMulai,omitempty"`
	TglBerakhir    *time.Time     `json:"tglBerakhir,omitempty"`
	BiayaSewa      string         `json:"biayaSewa,omitempty"`
	Status         string         `gorm:"default:Active" json:"status"`
	ApprovalStatus string         `gorm:"default:Pending" json:"approvalStatus"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// VehicleService model
type VehicleService struct {
	ID             string         `gorm:"primaryKey" json:"id"`
	VehicleID      string         `gorm:"not null" json:"vehicleId"`
	TglRequest     time.Time      `json:"tglRequest"`
	JenisServis    string         `json:"jenisServis,omitempty"`
	Vendor         string         `json:"vendor,omitempty"`
	Masalah        string         `json:"masalah,omitempty"`
	KmKendaraan    string         `json:"kmKendaraan,omitempty"`
	EstimasiBiaya  string         `json:"estimasiBiaya,omitempty"`
	Cost           string         `json:"cost,omitempty"`
	Status         string         `gorm:"default:Pending" json:"status"`
	StatusApproval string         `gorm:"default:Pending" json:"statusApproval"`
	CompletionDate *time.Time     `json:"completionDate,omitempty"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// Building model
type Building struct {
	ID               string         `gorm:"primaryKey" json:"id"`
	AssetNo          string         `gorm:"uniqueIndex;not null" json:"assetNo"`
	Name             string         `gorm:"not null" json:"name"`
	Type             string         `json:"type,omitempty"`
	Ownership        string         `gorm:"default:Rent" json:"ownership"`
	Location         string         `json:"location,omitempty"`
	Address          string         `json:"address,omitempty"`
	City             string         `json:"city,omitempty"`
	Province         string         `json:"province,omitempty"`
	Status           string         `gorm:"default:Active" json:"status"`
	RentCost         string         `json:"rentCost,omitempty"`
	ElectricityPower string         `json:"electricityPower,omitempty"`
	WaterSource      string         `json:"waterSource,omitempty"`
	LandArea         string         `json:"landArea,omitempty"`
	BuildingArea     string         `json:"buildingArea,omitempty"`
	CreatedAt        time.Time      `json:"createdAt"`
	UpdatedAt        time.Time      `json:"updatedAt"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

// Utility model
type Utility struct {
	ID         string         `gorm:"primaryKey" json:"id"`
	BuildingID string         `gorm:"not null" json:"buildingId"`
	Period     string         `gorm:"not null" json:"period"`
	Date       time.Time      `gorm:"not null" json:"date"`
	Type       string         `gorm:"not null" json:"type"`
	MeterStart float64        `gorm:"not null" json:"meterStart"`
	MeterEnd   float64        `gorm:"not null" json:"meterEnd"`
	Usage      float64        `gorm:"not null" json:"usage"`
	Unit       string         `gorm:"not null" json:"unit"`
	Cost       string         `json:"cost,omitempty"`
	Status     string         `gorm:"default:Unpaid" json:"status"`
	CreatedAt  time.Time      `json:"createdAt"`
	UpdatedAt  time.Time      `json:"updatedAt"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// GeneralAsset model
type GeneralAsset struct {
	ID             string         `gorm:"primaryKey" json:"id"`
	AssetNumber    string         `gorm:"uniqueIndex;not null" json:"assetNumber"`
	AssetName      string         `gorm:"not null" json:"assetName"`
	AssetCategory  string         `gorm:"not null" json:"assetCategory"`
	Type           string         `json:"type,omitempty"`
	Ownership      string         `gorm:"default:Own" json:"ownership"`
	AssetLocation  string         `json:"assetLocation,omitempty"`
	Department     string         `json:"department,omitempty"`
	Status         string         `gorm:"default:Active" json:"status"`
	ApprovalStatus string         `gorm:"default:Approved" json:"approvalStatus"`
	PurchasePrice  string         `json:"purchasePrice,omitempty"`
	PurchaseDate   *time.Time     `json:"purchaseDate,omitempty"`
	Brand          string         `json:"brand,omitempty"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// MasterItem model (ATK/ARK)
type MasterItem struct {
	ID                string         `gorm:"primaryKey" json:"id"`
	ItemCode          string         `gorm:"uniqueIndex;not null" json:"itemCode"`
	ItemName          string         `gorm:"not null" json:"itemName"`
	Category          string         `gorm:"not null" json:"category"`
	Type              string         `gorm:"default:ATK" json:"type"`
	Uom               string         `gorm:"not null" json:"uom"`
	RemainingStock    int            `gorm:"default:0" json:"remainingStock"`
	MinimumStock      int            `gorm:"default:0" json:"minimumStock"`
	MaximumStock      int            `gorm:"default:100" json:"maximumStock"`
	LastPurchasePrice string         `json:"lastPurchasePrice,omitempty"`
	AveragePrice      string         `json:"averagePrice,omitempty"`
	CreatedAt         time.Time      `json:"createdAt"`
	UpdatedAt         time.Time      `json:"updatedAt"`
	DeletedAt         gorm.DeletedAt `gorm:"index" json:"-"`
}

// Vendor model
type Vendor struct {
	ID         string         `gorm:"primaryKey" json:"id"`
	VendorCode string         `gorm:"uniqueIndex;not null" json:"vendorCode"`
	VendorName string         `gorm:"not null" json:"vendorName"`
	Type       string         `json:"type,omitempty"`
	Category   string         `json:"category,omitempty"`
	Email      string         `json:"email,omitempty"`
	Phone      string         `json:"phone,omitempty"`
	Address    string         `json:"address,omitempty"`
	PicName    string         `json:"picName,omitempty"`
	Status     string         `gorm:"default:Active" json:"status"`
	CreatedAt  time.Time      `json:"createdAt"`
	UpdatedAt  time.Time      `json:"updatedAt"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// MasterData model
type MasterData struct {
	ID        string         `gorm:"primaryKey" json:"id"`
	Category  string         `gorm:"not null;uniqueIndex:idx_category_name" json:"category"`
	Name      string         `gorm:"not null;uniqueIndex:idx_category_name" json:"name"`
	Status    string         `gorm:"default:Active" json:"status"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}


// StockMutation model
type StockMutation struct {
	ID          string         `gorm:"primaryKey" json:"id"`
	ItemID      string         `gorm:"not null" json:"itemId"`
	Type        string         `gorm:"not null" json:"type"` // IN or OUT
	Quantity    int            `gorm:"not null" json:"quantity"`
	Reference   string         `json:"reference,omitempty"`
	Notes       string         `json:"notes,omitempty"`
	CreatedByID string         `json:"createdById,omitempty"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

// StockOpname model
type StockOpname struct {
	ID            string         `gorm:"primaryKey" json:"id"`
	ItemID        string         `gorm:"not null" json:"itemId"`
	Period        string         `gorm:"not null" json:"period"`
	SystemStock   int            `gorm:"not null" json:"systemStock"`
	PhysicalStock int            `gorm:"not null" json:"physicalStock"`
	Difference    int            `gorm:"not null" json:"difference"`
	Notes         string         `json:"notes,omitempty"`
	Status        string         `gorm:"default:Pending" json:"status"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

// Pod model
type Pod struct {
	ID          string         `gorm:"primaryKey" json:"id"`
	PodCode     string         `gorm:"uniqueIndex;not null" json:"podCode"`
	PodName     string         `gorm:"not null" json:"podName"`
	Location    string         `json:"location,omitempty"`
	Capacity    int            `gorm:"default:1" json:"capacity"`
	Status      string         `gorm:"default:Available" json:"status"`
	Description string         `json:"description,omitempty"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

// PodRequest model
type PodRequest struct {
	ID            string         `gorm:"primaryKey" json:"id"`
	PodID         string         `gorm:"not null" json:"podId"`
	RequestedByID string         `gorm:"not null" json:"requestedById"`
	StartDate     time.Time      `gorm:"not null" json:"startDate"`
	EndDate       time.Time      `gorm:"not null" json:"endDate"`
	Purpose       string         `json:"purpose,omitempty"`
	Status        string         `gorm:"default:Pending" json:"status"`
	ApprovedByID  string         `json:"approvedById,omitempty"`
	ApprovedAt    *time.Time     `json:"approvedAt,omitempty"`
	Notes         string         `json:"notes,omitempty"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

// Locker model
type Locker struct {
	ID           string         `gorm:"primaryKey" json:"id"`
	LockerCode   string         `gorm:"uniqueIndex;not null" json:"lockerCode"`
	LockerNumber string         `gorm:"not null" json:"lockerNumber"`
	Location     string         `json:"location,omitempty"`
	Size         string         `json:"size,omitempty"`
	Status       string         `gorm:"default:Available" json:"status"`
	AssignedToID string         `json:"assignedToId,omitempty"`
	AssignedAt   *time.Time     `json:"assignedAt,omitempty"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// LockerRequest model
type LockerRequest struct {
	ID            string         `gorm:"primaryKey" json:"id"`
	LockerID      string         `json:"lockerId,omitempty"`
	RequestedByID string         `gorm:"not null" json:"requestedById"`
	RequestType   string         `gorm:"not null" json:"requestType"` // New, Return, Change
	Reason        string         `json:"reason,omitempty"`
	Status        string         `gorm:"default:Pending" json:"status"`
	ApprovedByID  string         `json:"approvedById,omitempty"`
	ApprovedAt    *time.Time     `json:"approvedAt,omitempty"`
	Notes         string         `json:"notes,omitempty"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

// InsurancePolicy model
type InsurancePolicy struct {
	ID           string         `gorm:"primaryKey" json:"id"`
	PolicyNumber string         `gorm:"uniqueIndex;not null" json:"policyNumber"`
	PolicyType   string         `gorm:"not null" json:"policyType"`
	ProviderID   string         `json:"providerId,omitempty"`
	AssetType    string         `json:"assetType,omitempty"`
	AssetID      string         `json:"assetId,omitempty"`
	StartDate    time.Time      `gorm:"not null" json:"startDate"`
	EndDate      time.Time      `gorm:"not null" json:"endDate"`
	Premium      string         `json:"premium,omitempty"`
	Coverage     string         `json:"coverage,omitempty"`
	Status       string         `gorm:"default:Active" json:"status"`
	Notes        string         `json:"notes,omitempty"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// InsuranceClaim model
type InsuranceClaim struct {
	ID           string         `gorm:"primaryKey" json:"id"`
	ClaimNumber  string         `gorm:"uniqueIndex;not null" json:"claimNumber"`
	PolicyID     string         `gorm:"not null" json:"policyId"`
	ClaimDate    time.Time      `gorm:"not null" json:"claimDate"`
	IncidentDate time.Time      `gorm:"not null" json:"incidentDate"`
	Description  string         `json:"description,omitempty"`
	ClaimAmount  string         `json:"claimAmount,omitempty"`
	ApprovedAmt  string         `json:"approvedAmount,omitempty"`
	Status       string         `gorm:"default:Pending" json:"status"`
	Documents    string         `json:"documents,omitempty"`
	Notes        string         `json:"notes,omitempty"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// InsuranceProvider model
type InsuranceProvider struct {
	ID          string         `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"not null" json:"name"`
	Code        string         `gorm:"uniqueIndex;not null" json:"code"`
	Email       string         `json:"email,omitempty"`
	Phone       string         `json:"phone,omitempty"`
	Address     string         `json:"address,omitempty"`
	PicName     string         `json:"picName,omitempty"`
	PicPhone    string         `json:"picPhone,omitempty"`
	Status      string         `gorm:"default:Active" json:"status"`
	Description string         `json:"description,omitempty"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
