# 📚 FACILITY MANAGEMENT SYSTEM (FMS)
## Dokumentasi Teknis Lengkap

---

## 📋 DAFTAR ISI

1. [Gambaran Umum Sistem](#1-gambaran-umum-sistem)
2. [Arsitektur Sistem](#2-arsitektur-sistem)
3. [Modul-Modul Sistem](#3-modul-modul-sistem)
4. [Database Schema](#4-database-schema)
5. [API Endpoints](#5-api-endpoints)
6. [Panduan Instalasi](#6-panduan-instalasi)
7. [Alur Bisnis](#7-alur-bisnis)

---

## 1. GAMBARAN UMUM SISTEM

### 1.1 Deskripsi
Facility Management System (FMS) adalah aplikasi web untuk mengelola aset perusahaan secara komprehensif, meliputi:
- Manajemen Kendaraan
- Manajemen Gedung
- Manajemen Aset Umum (HC, IT, Customer Service)
- Manajemen ATK & ARK
- Manajemen Vendor
- Manajemen User & Approval

### 1.2 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| UI Framework | Tailwind CSS |
| State Management | React Context API |
| Routing | React Router v6 |
| Backend | Go (Golang) + Gin Framework |
| ORM | GORM |
| Database | PostgreSQL |
| Authentication | JWT |

### 1.3 Struktur Folder

```
fms/
├── backend/                    # Go Backend
│   ├── config/                 # Database configuration
│   ├── controllers/            # Request handlers
│   ├── middleware/             # Auth middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── utils/                  # Helper functions
│   └── main.go                 # Entry point
├── components/                 # React components
├── contexts/                   # React contexts
├── layouts/                    # Layout components
├── pages/                      # Page components
│   ├── gedung/                 # Building pages
│   ├── kendaraan/              # Vehicle pages
│   ├── general-asset/          # General asset pages
│   ├── atk/                    # ATK pages
│   ├── ark/                    # ARK pages
│   └── master/                 # Master data pages
├── router.tsx                  # Route definitions
├── routeMap.ts                 # Route mapping
├── types.ts                    # TypeScript types
└── constants.ts                # Constants
```

---

## 2. ARSITEKTUR SISTEM

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    React Frontend                        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │    │
│  │  │  Pages   │  │Components│  │ Contexts │  │ Router  │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Go Backend (Gin)                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │    │
│  │  │  Routes  │  │Controllers│ │Middleware│  │  Utils  │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ GORM ORM
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE LAYER                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     PostgreSQL                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │    │
│  │  │ Vehicles │  │ Buildings│  │  Assets  │  │ Masters │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Request Flow

```
User Action → React Component → API Call → Gin Router → Controller → GORM → PostgreSQL
     ↑                                                                           │
     └───────────────────────── JSON Response ←──────────────────────────────────┘
```

---

## 3. MODUL-MODUL SISTEM

### 3.1 MODUL KENDARAAN (Vehicle Module)

#### 3.1.1 Daftar Aset Kendaraan
**Path:** `/kendaraan/daftar-aset`
**Deskripsi:** Mengelola data master kendaraan perusahaan

**Fitur:**
- CRUD data kendaraan
- Upload foto kendaraan (depan, belakang, kiri, kanan)
- Upload dokumen (STNK, KIR)
- Filter berdasarkan status, cabang, channel
- Pagination server-side

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| noPolisi | string | Nomor polisi (unique) |
| noRangka | string | Nomor rangka |
| noMesin | string | Nomor mesin |
| merek | string | Merek kendaraan |
| model | string | Model kendaraan |
| tahunPembuatan | string | Tahun pembuatan |
| warna | string | Warna kendaraan |
| ownership | string | Own/Sewa |
| status | string | Active/Inactive/Sold |
| channel | string | Channel bisnis |
| cabang | string | Cabang |
| penggunaUtama | string | Pengguna utama |

#### 3.1.2 Kontrak Kendaraan
**Path:** `/kendaraan/kontrak`
**Deskripsi:** Mengelola kontrak sewa kendaraan

**Fitur:**
- CRUD kontrak sewa
- Tracking masa berlaku kontrak
- Link ke vendor
- Upload dokumen kontrak

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| noKontrak | string | Nomor kontrak (unique) |
| noPolisi | string | Nomor polisi kendaraan |
| vendorId | uint | FK ke Vendor |
| tglMulai | date | Tanggal mulai kontrak |
| tglBerakhir | date | Tanggal berakhir |
| biayaSewa | float | Biaya sewa |
| status | string | Active/Expired |

#### 3.1.3 Servis Kendaraan
**Path:** `/kendaraan/servis`
**Deskripsi:** Mengelola permintaan servis kendaraan

**Fitur:**
- Request servis dengan approval workflow
- Input spare part yang digunakan
- Tracking status servis
- Link ke vendor bengkel

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| vehicleId | uint | FK ke Vehicle |
| vendorId | uint | FK ke Vendor |
| tglRequest | date | Tanggal request |
| jenisServis | string | Jenis servis |
| masalah | string | Deskripsi masalah |
| estimasiBiaya | float | Estimasi biaya |
| status | string | Pending/In Progress/Done |
| statusApproval | string | Pending/Approved/Rejected |
| spareParts | []SparePart | Daftar spare part |

#### 3.1.4 Pajak & KIR
**Path:** `/kendaraan/pajak-kir`
**Deskripsi:** Mengelola pembayaran pajak STNK dan KIR

**Fitur:**
- Request pembayaran pajak/KIR
- Approval workflow
- Tracking jatuh tempo
- Upload bukti pembayaran

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| vehicleId | uint | FK ke Vehicle |
| jenis | string | Pajak STNK/KIR |
| jatuhTempo | date | Tanggal jatuh tempo |
| estimasiBiaya | float | Estimasi biaya |
| status | string | Pending/Paid |

#### 3.1.5 Reminder Pajak & KIR
**Path:** `/kendaraan/reminder`
**Deskripsi:** Dashboard reminder untuk pajak dan KIR yang akan jatuh tempo

**Fitur:**
- Auto-generate reminder dari data kendaraan
- Status: Safe (>30 hari), Warning (15-30 hari), Critical (<15 hari), Expired

#### 3.1.6 Asuransi Kendaraan
**Path:** `/kendaraan/asuransi`
**Deskripsi:** Mengelola polis asuransi kendaraan

**Fitur:**
- CRUD polis asuransi
- Tracking klaim asuransi
- Link ke vendor asuransi
- Reminder masa berlaku

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| policyNumber | string | Nomor polis (unique) |
| assetId | uint | ID kendaraan |
| vendorId | uint | FK ke Vendor |
| type | string | All Risk/TLO |
| startDate | date | Tanggal mulai |
| endDate | date | Tanggal berakhir |
| premium | float | Premi |
| sumInsured | float | Nilai pertanggungan |

#### 3.1.7 Mutasi Kendaraan
**Path:** `/kendaraan/mutasi`
**Deskripsi:** Mengelola perpindahan kendaraan antar cabang

**Fitur:**
- Request mutasi dengan approval
- Tracking lokasi asal dan tujuan
- Biaya mutasi

#### 3.1.8 Penjualan Kendaraan
**Path:** `/kendaraan/penjualan`
**Deskripsi:** Mengelola penjualan kendaraan bekas

**Fitur:**
- Open bidding system
- Multiple bidder
- Tracking penawaran tertinggi
- Approval workflow



---

### 3.2 MODUL GEDUNG (Building Module)

#### 3.2.1 Daftar Gedung
**Path:** `/gedung/daftar`
**Deskripsi:** Mengelola data master gedung/properti perusahaan

**Fitur:**
- CRUD data gedung
- Upload foto gedung
- Tracking status kepemilikan
- Filter berdasarkan channel, cabang

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| assetNo | string | Nomor aset (unique) |
| buildingName | string | Nama gedung |
| address | string | Alamat lengkap |
| city | string | Kota |
| province | string | Provinsi |
| ownership | string | Own/Sewa |
| buildingType | string | Tipe gedung |
| totalFloors | int | Jumlah lantai |
| totalArea | float | Luas total (m²) |
| status | string | Active/Inactive |

#### 3.2.2 Utility Monitoring
**Path:** `/gedung/utility`
**Deskripsi:** Monitoring penggunaan utilitas (listrik, air, internet)

**Fitur:**
- Input meter bulanan
- Kalkulasi pemakaian otomatis
- Tracking biaya per gedung
- Upload bukti pembayaran

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| buildingId | uint | FK ke Building |
| period | string | Periode (YYYY-MM) |
| type | string | Listrik/Air/Internet |
| meterStart | float | Meter awal |
| meterEnd | float | Meter akhir |
| usage | float | Pemakaian |
| cost | float | Biaya |
| status | string | Paid/Unpaid/Pending |

#### 3.2.3 Branch Improvement
**Path:** `/gedung/branch-improvement`
**Deskripsi:** Mengelola aset-aset yang ada di dalam gedung

**Fitur:**
- CRUD aset gedung (AC, Genset, Lift, dll)
- Tracking pemeliharaan
- Jadwal maintenance preventif

**Fields (BuildingAsset):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| assetCode | string | Kode aset (unique) |
| assetName | string | Nama aset |
| assetType | string | AC/Genset/Lift/dll |
| buildingId | uint | FK ke Building |
| floor | string | Lantai |
| maintenanceFrequency | string | Monthly/Quarterly/Yearly |
| status | string | Active/Inactive |

**Fields (BuildingMaintenance):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| assetId | uint | FK ke BuildingAsset |
| vendorId | uint | FK ke Vendor |
| maintenanceType | string | Preventive/Corrective/Emergency |
| requestDate | date | Tanggal request |
| completionDate | date | Tanggal selesai |
| cost | float | Biaya |
| status | string | Scheduled/In Progress/Completed |

#### 3.2.4 Compliance & Legal
**Path:** `/gedung/compliance`
**Deskripsi:** Tracking dokumen legal dan perizinan gedung

**Fitur:**
- CRUD dokumen compliance
- Reminder masa berlaku
- Upload dokumen

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| documentName | string | Nama dokumen |
| documentType | string | Contract/Permit/License/Certificate |
| buildingId | uint | FK ke Building |
| issueDate | date | Tanggal terbit |
| expiryDate | date | Tanggal kadaluarsa |
| issuingBody | string | Instansi penerbit |
| status | string | Safe/Warning/Urgent/Expired |

#### 3.2.5 Asuransi Gedung
**Path:** `/gedung/asuransi`
**Deskripsi:** Mengelola polis asuransi gedung (Property All Risk)

**Fitur:**
- CRUD polis asuransi
- Tracking klaim
- Link ke vendor asuransi

#### 3.2.6 Log Book
**Path:** `/gedung/logbook`
**Deskripsi:** Pencatatan kunjungan tamu ke gedung

**Fitur:**
- Input data tamu
- Tracking jam datang/pulang
- Kategorisasi tamu

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| buildingId | uint | FK ke Building |
| kategoriTamu | string | Customer/Supplier/dll |
| namaTamu | string | Nama tamu |
| tanggalKunjungan | date | Tanggal kunjungan |
| jamDatang | string | Jam datang |
| jamPulang | string | Jam pulang |
| wanita | int | Jumlah wanita |
| lakiLaki | int | Jumlah laki-laki |
| anakAnak | int | Jumlah anak-anak |

---

### 3.3 MODUL ASET UMUM (General Asset Module)

#### 3.3.1 Asset HC (Human Capital)
**Path:** `/general-asset/hc`
**Deskripsi:** Mengelola aset-aset HC seperti furniture, peralatan kantor

**Fitur:**
- CRUD aset HC
- Tracking lokasi dan PIC
- Status approval

#### 3.3.2 Asset IT
**Path:** `/general-asset/it`
**Deskripsi:** Mengelola aset-aset IT seperti komputer, laptop, printer

**Fitur:**
- CRUD aset IT
- Tracking spesifikasi
- Assignment ke user

#### 3.3.3 Customer Service Asset
**Path:** `/general-asset/cs`
**Deskripsi:** Mengelola aset-aset untuk customer service

**Fields (GeneralAsset):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| assetNumber | string | Nomor aset (unique) |
| assetCategory | string | HC/IT/CS |
| assetName | string | Nama aset |
| buildingId | uint | FK ke Building |
| assetLocation | string | Lokasi |
| department | string | Department |
| purchasePrice | float | Harga beli |
| purchaseDate | date | Tanggal beli |
| brand | string | Merek |
| modelNumber | string | Model |
| pic | string | Person in charge |
| status | string | Active/Inactive/Sold |

#### 3.3.4 Pemeliharaan Asset
**Path:** `/general-asset/pemeliharaan`
**Deskripsi:** Mengelola pemeliharaan aset umum

#### 3.3.5 Reminder Pemeliharaan
**Path:** `/general-asset/reminder`
**Deskripsi:** Dashboard reminder untuk jadwal pemeliharaan aset

#### 3.3.6 Mutasi Aset
**Path:** `/general-asset/mutasi`
**Deskripsi:** Mengelola perpindahan aset antar lokasi

#### 3.3.7 Penjualan Aset
**Path:** `/general-asset/penjualan`
**Deskripsi:** Mengelola penjualan aset bekas

---

### 3.4 MODUL ATK (Alat Tulis Kantor)

#### 3.4.1 Master ATK
**Path:** `/atk/master`
**Deskripsi:** Mengelola data master item ATK

**Fitur:**
- CRUD item ATK
- Tracking stok
- Minimum/maximum stock alert

**Fields (MasterItem):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| itemCode | string | Kode item (unique) |
| itemName | string | Nama item |
| category | string | ATK/ARK |
| uom | string | Unit of measure |
| remainingStock | int | Stok tersisa |
| minimumStock | int | Stok minimum |
| maximumStock | int | Stok maksimum |
| lastPurchasePrice | float | Harga beli terakhir |

#### 3.4.2 Request ATK
**Path:** `/atk/request`
**Deskripsi:** Pengajuan permintaan ATK

**Fitur:**
- Multi-item request
- Approval workflow
- Tracking status pengiriman

**Fields (StationeryRequest):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| type | string | ATK/ARK |
| deliveryType | string | Tipe pengiriman |
| locationId | uint | FK ke DeliveryLocation |
| requestedBy | uint | FK ke User |
| date | date | Tanggal request |
| status | string | Pending/Approved/Delivered |
| items | []StationeryRequestItem | Daftar item |

#### 3.4.3 Approval ATK
**Path:** `/atk/approval`
**Deskripsi:** Approval permintaan ATK

---

### 3.5 MODUL ARK (Alat Rumah Tangga Kantor)

#### 3.5.1 Master ARK
**Path:** `/ark/master`
**Deskripsi:** Mengelola data master item ARK

#### 3.5.2 Daftar ARK
**Path:** `/ark/daftar`
**Deskripsi:** Daftar permintaan ARK

---

### 3.6 MODUL MASTER DATA

#### 3.6.1 Master Vendor
**Path:** `/master/vendor`
**Deskripsi:** Mengelola data vendor/supplier

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| vendorCode | string | Kode vendor (unique) |
| vendorName | string | Nama vendor |
| category | string | Kategori vendor |
| address | string | Alamat |
| phone | string | Telepon |
| email | string | Email |
| picName | string | Nama PIC |
| bankName | string | Nama bank |
| bankAccount | string | Nomor rekening |
| npwp | string | NPWP |
| status | string | Active/Inactive |

#### 3.6.2 Master Approval
**Path:** `/master/approval`
**Deskripsi:** Konfigurasi workflow approval per modul

**Fields (MasterApproval):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| module | string | Nama modul |
| branch | string | Cabang |

**Fields (ApprovalTier):**
| Field | Type | Deskripsi |
|-------|------|-----------|
| masterApprovalId | uint | FK ke MasterApproval |
| level | int | Level approval |
| type | string | Role/User |
| value | string | Nama role/user |
| sla | int | SLA dalam jam |

#### 3.6.3 General Master
**Deskripsi:** Master data dinamis untuk dropdown

**Kategori yang tersedia:**
- PPN (Pajak)
- BRAND (Merek)
- COLOR (Warna)
- VEHICLE_TYPE (Tipe Kendaraan)
- BUILDING_TYPE (Tipe Gedung)
- ASSET_CATEGORY (Kategori Aset)
- CHANNEL (Channel Bisnis)
- BRANCH (Cabang)
- DEPARTMENT (Department)
- UOM (Unit of Measure)

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| category | string | Kategori master |
| name | string | Nama item |
| code | string | Kode item |
| value | string | Nilai tambahan |
| parentId | uint | FK untuk hierarki |
| sortOrder | int | Urutan tampil |
| isActive | bool | Status aktif |
| isDefault | bool | Default selection |

#### 3.6.4 Delivery Location
**Deskripsi:** Master lokasi pengiriman untuk ATK/ARK

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| name | string | Nama lokasi |
| address | string | Alamat |
| type | string | Warehouse/Branch |

---

### 3.7 MODUL USER MANAGEMENT

#### 3.7.1 Manajemen User
**Path:** `/manajemen-user`
**Deskripsi:** Mengelola data user sistem

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| username | string | Username (unique) |
| email | string | Email (unique) |
| password | string | Password (hashed) |
| fullName | string | Nama lengkap |
| role | string | Admin/Manager/Staff |
| department | string | Department |
| branch | string | Cabang |
| status | string | Active/Inactive |

---

### 3.8 MODUL TIMESHEET

**Path:** `/timesheet`
**Deskripsi:** Pencatatan kehadiran karyawan

**Fields:**
| Field | Type | Deskripsi |
|-------|------|-----------|
| employeeId | uint | FK ke User |
| location | string | Lokasi |
| date | date | Tanggal |
| shift | string | Shift kerja |
| clockIn | time | Jam masuk |
| clockOut | time | Jam keluar |
| status | string | Tepat Waktu/Terlambat/Absen |



---

## 4. DATABASE SCHEMA

### 4.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              ENTITY RELATIONSHIP DIAGRAM                                 │
└─────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│      USERS       │          │     VENDORS      │          │    BUILDINGS     │
├──────────────────┤          ├──────────────────┤          ├──────────────────┤
│ id (PK)          │          │ id (PK)          │          │ id (PK)          │
│ username         │          │ vendor_code      │          │ asset_no         │
│ email            │          │ vendor_name      │          │ building_name    │
│ password         │          │ category         │          │ address          │
│ full_name        │          │ address          │          │ city             │
│ role             │          │ phone            │          │ ownership        │
│ department       │          │ email            │          │ status           │
│ branch           │          │ status           │          │ ...              │
│ status           │          │ ...              │          └────────┬─────────┘
└────────┬─────────┘          └────────┬─────────┘                   │
         │                             │                              │
         │ 1:N                         │ 1:N                          │ 1:N
         ▼                             ▼                              ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│   TIMESHEETS     │          │   INSURANCES     │          │    UTILITIES     │
├──────────────────┤          ├──────────────────┤          ├──────────────────┤
│ id (PK)          │          │ id (PK)          │          │ id (PK)          │
│ employee_id (FK) │──────────│ vendor_id (FK)   │          │ building_id (FK) │
│ location         │          │ policy_number    │          │ period           │
│ date             │          │ asset_id         │          │ type             │
│ clock_in         │          │ type             │          │ meter_start      │
│ clock_out        │          │ start_date       │          │ meter_end        │
│ status           │          │ end_date         │          │ usage            │
└──────────────────┘          │ premium          │          │ cost             │
                              │ ...              │          │ status           │
         │                    └────────┬─────────┘          └──────────────────┘
         │                             │
         │                             │ 1:N                 ┌──────────────────┐
         │                             ▼                     │    LOG_BOOKS     │
         │                    ┌──────────────────┐          ├──────────────────┤
         │                    │ INSURANCE_CLAIMS │          │ id (PK)          │
         │                    ├──────────────────┤          │ building_id (FK) │
         │                    │ id (PK)          │          │ nama_tamu        │
         │                    │ insurance_id(FK) │          │ tanggal_kunjungan│
         │                    │ incident_date    │          │ jam_datang       │
         │                    │ claim_amount     │          │ jam_pulang       │
         │                    │ status           │          │ ...              │
         │                    └──────────────────┘          └──────────────────┘
         │
         │                                                   ┌──────────────────┐
         │                                                   │   COMPLIANCES    │
         │                                                   ├──────────────────┤
         │                                                   │ id (PK)          │
         │                                                   │ building_id (FK) │
         │                                                   │ document_name    │
         │                                                   │ document_type    │
         │                                                   │ issue_date       │
         │                                                   │ expiry_date      │
         │                                                   │ status           │
         │                                                   └──────────────────┘
         │
         ▼
┌──────────────────┐                                        ┌──────────────────┐
│STATIONERY_REQUESTS                                        │  BUILDING_ASSETS │
├──────────────────┤                                        ├──────────────────┤
│ id (PK)          │                                        │ id (PK)          │
│ requested_by(FK) │                                        │ building_id (FK) │
│ location_id (FK) │──────┐                                 │ asset_code       │
│ type             │      │                                 │ asset_name       │
│ delivery_type    │      │                                 │ asset_type       │
│ date             │      │                                 │ floor            │
│ status           │      │                                 │ status           │
└────────┬─────────┘      │                                 └────────┬─────────┘
         │                │                                          │
         │ 1:N            │                                          │ 1:N
         ▼                ▼                                          ▼
┌──────────────────┐  ┌──────────────────┐               ┌──────────────────┐
│STATIONERY_REQUEST│  │DELIVERY_LOCATIONS│               │BUILDING_MAINTENAN│
│     _ITEMS       │  ├──────────────────┤               ├──────────────────┤
├──────────────────┤  │ id (PK)          │               │ id (PK)          │
│ id (PK)          │  │ name             │               │ asset_id (FK)    │
│ request_id (FK)  │  │ address          │               │ vendor_id (FK)   │
│ item_id (FK)     │──│ type             │               │ maintenance_type │
│ qty              │  └──────────────────┘               │ request_date     │
│ uom              │                                     │ cost             │
└────────┬─────────┘                                     │ status           │
         │                                               └──────────────────┘
         │ N:1
         ▼
┌──────────────────┐
│   MASTER_ITEMS   │
├──────────────────┤
│ id (PK)          │
│ item_code        │
│ item_name        │
│ category         │
│ uom              │
│ remaining_stock  │
│ minimum_stock    │
│ maximum_stock    │
└────────┬─────────┘
         │
         │ 1:N
         ▼
┌──────────────────┐
│    PURCHASES     │
├──────────────────┤
│ id (PK)          │
│ vendor_id (FK)   │
│ item_id (FK)     │
│ qty              │
│ unit_price       │
│ total_price      │
│ status           │
└──────────────────┘
```

### 4.2 Vehicle Related Tables

```
┌──────────────────┐
│     VEHICLES     │
├──────────────────┤
│ id (PK)          │
│ no_polisi        │
│ no_rangka        │
│ no_mesin         │
│ merek            │
│ model            │
│ tahun_pembuatan  │
│ warna            │
│ ownership        │
│ status           │
│ channel          │
│ cabang           │
└────────┬─────────┘
         │
    ┌────┴────┬─────────────┬─────────────┬─────────────┐
    │         │             │             │             │
    │ 1:N     │ 1:N         │ 1:N         │ 1:N         │ 1:N
    ▼         ▼             ▼             ▼             ▼
┌────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│SERVICES│ │TAX_KIRS│ │MUTATIONS │ │  SALES   │ │VEHICLE_REMIND│
├────────┤ ├────────┤ ├──────────┤ ├──────────┤ ├──────────────┤
│id (PK) │ │id (PK) │ │id (PK)   │ │id (PK)   │ │id (PK)       │
│vehicle_│ │vehicle_│ │vehicle_id│ │vehicle_id│ │vehicle_id(FK)│
│  id(FK)│ │  id(FK)│ │  (FK)    │ │  (FK)    │ │no_polisi     │
│vendor_ │ │no_polis│ │general_  │ │general_  │ │type          │
│  id(FK)│ │jenis   │ │asset_id  │ │asset_id  │ │expiry_date   │
│tgl_req │ │jatuh_  │ │  (FK)    │ │  (FK)    │ │status        │
│jenis_  │ │  tempo │ │tipe_     │ │harga_    │ └──────────────┘
│ servis │ │estimasi│ │ mutasi   │ │ pembuka  │
│masalah │ │ _biaya │ │lokasi_   │ │harga_    │
│estimasi│ │status  │ │ asal     │ │tertinggi │
│ _biaya │ └────────┘ │lokasi_   │ │status    │
│status  │            │ tujuan   │ └────┬─────┘
└───┬────┘            │status    │      │
    │                 └──────────┘      │ 1:N
    │ 1:N                               ▼
    ▼                            ┌──────────┐
┌──────────┐                     │   BIDS   │
│SPARE_PART│                     ├──────────┤
├──────────┤                     │id (PK)   │
│id (PK)   │                     │sale_id   │
│service_id│                     │  (FK)    │
│  (FK)    │                     │amount    │
│name      │                     │bidder_   │
│qty       │                     │ name     │
│price     │                     │timestamp │
└──────────┘                     └──────────┘

┌──────────────────┐
│VEHICLE_CONTRACTS │
├──────────────────┤
│ id (PK)          │
│ vendor_id (FK)   │
│ no_kontrak       │
│ no_polisi        │
│ tgl_mulai        │
│ tgl_berakhir     │
│ biaya_sewa       │
│ status           │
└──────────────────┘
```

### 4.3 General Asset Tables

```
┌──────────────────┐
│  GENERAL_ASSETS  │
├──────────────────┤
│ id (PK)          │
│ asset_number     │
│ asset_category   │  ◄── HC, IT, CS
│ asset_name       │
│ building_id (FK) │──────► BUILDINGS
│ asset_location   │
│ department       │
│ purchase_price   │
│ purchase_date    │
│ brand            │
│ model_number     │
│ pic              │
│ status           │
└──────────────────┘
         │
         │ Referenced by
         ▼
┌──────────────────┐     ┌──────────────────┐
│    MUTATIONS     │     │      SALES       │
│ (general_asset_  │     │ (general_asset_  │
│      id FK)      │     │      id FK)      │
└──────────────────┘     └──────────────────┘
```

### 4.4 Master Data Tables

```
┌──────────────────┐          ┌──────────────────┐
│ MASTER_APPROVALS │          │ GENERAL_MASTERS  │
├──────────────────┤          ├──────────────────┤
│ id (PK)          │          │ id (PK)          │
│ module           │          │ category         │  ◄── PPN, BRAND, COLOR, etc.
│ branch           │          │ name             │
└────────┬─────────┘          │ code             │
         │                    │ value            │
         │ 1:N                │ parent_id (FK)   │──┐ Self-reference
         ▼                    │ sort_order       │  │ for hierarchy
┌──────────────────┐          │ is_active        │◄─┘
│  APPROVAL_TIERS  │          │ is_default       │
├──────────────────┤          └──────────────────┘
│ id (PK)          │
│ master_approval_ │          ┌──────────────────┐
│   id (FK)        │          │ MASTER_CATEGORIES│
│ level            │          ├──────────────────┤
│ type             │          │ id (PK)          │
│ value            │          │ code             │
│ sla              │          │ name             │
└──────────────────┘          │ description      │
                              │ module           │
                              │ is_editable      │
                              │ is_active        │
                              └──────────────────┘
```

### 4.5 Reminder Tables

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ VEHICLE_REMINDERS│     │BUILDING_REMINDERS│     │MAINTENANCE_SCHED │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id (PK)          │     │ id (PK)          │     │ id (PK)          │
│ vehicle_id (FK)  │     │ building_id (FK) │     │ asset_id (FK)    │
│ no_polisi        │     │ document_name    │     │ vendor_id (FK)   │
│ vehicle_name     │     │ building_name    │     │ asset_name       │
│ type             │     │ expiry_date      │     │ frequency        │
│ expiry_date      │     │ category         │     │ last_maintenance │
│ branch           │     │ source           │     │ next_maintenance │
│ status           │     │ status           │     │ status           │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```



---

## 5. API ENDPOINTS

### 5.1 Authentication

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register user baru |
| POST | `/api/auth/logout` | Logout user |

### 5.2 Users

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### 5.3 Vehicles

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/vehicles` | Get all vehicles (paginated) |
| GET | `/api/vehicles/:id` | Get vehicle by ID |
| POST | `/api/vehicles` | Create vehicle |
| PUT | `/api/vehicles/:id` | Update vehicle |
| DELETE | `/api/vehicles/:id` | Delete vehicle |

### 5.4 Buildings

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/buildings` | Get all buildings (paginated) |
| GET | `/api/buildings/:id` | Get building by ID |
| POST | `/api/buildings` | Create building |
| PUT | `/api/buildings/:id` | Update building |
| DELETE | `/api/buildings/:id` | Delete building |

### 5.5 General Assets

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/general-assets` | Get all assets (paginated) |
| GET | `/api/general-assets/:id` | Get asset by ID |
| GET | `/api/general-assets/category/:category` | Get assets by category |
| POST | `/api/general-assets` | Create asset |
| PUT | `/api/general-assets/:id` | Update asset |
| DELETE | `/api/general-assets/:id` | Delete asset |

### 5.6 Vendors

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/vendors` | Get all vendors (paginated) |
| GET | `/api/vendors/:id` | Get vendor by ID |
| POST | `/api/vendors` | Create vendor |
| PUT | `/api/vendors/:id` | Update vendor |
| DELETE | `/api/vendors/:id` | Delete vendor |

### 5.7 Services

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/services` | Get all services (paginated) |
| GET | `/api/services/:id` | Get service by ID |
| POST | `/api/services` | Create service request |
| PUT | `/api/services/:id` | Update service |
| DELETE | `/api/services/:id` | Delete service |

### 5.8 Tax & KIR

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/tax-kirs` | Get all tax/KIR (paginated) |
| GET | `/api/tax-kirs/:id` | Get tax/KIR by ID |
| POST | `/api/tax-kirs` | Create tax/KIR request |
| PUT | `/api/tax-kirs/:id` | Update tax/KIR |
| DELETE | `/api/tax-kirs/:id` | Delete tax/KIR |

### 5.9 Insurances

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/insurances` | Get all insurances (paginated) |
| GET | `/api/insurances/:id` | Get insurance by ID |
| POST | `/api/insurances` | Create insurance |
| PUT | `/api/insurances/:id` | Update insurance |
| DELETE | `/api/insurances/:id` | Delete insurance |
| POST | `/api/insurances/:id/claims` | Add claim to insurance |

### 5.10 Mutations

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/mutations` | Get all mutations (paginated) |
| GET | `/api/mutations/:id` | Get mutation by ID |
| POST | `/api/mutations` | Create mutation request |
| PUT | `/api/mutations/:id` | Update mutation |
| DELETE | `/api/mutations/:id` | Delete mutation |

### 5.11 Sales

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/sales` | Get all sales (paginated) |
| GET | `/api/sales/:id` | Get sale by ID |
| POST | `/api/sales` | Create sale |
| PUT | `/api/sales/:id` | Update sale |
| DELETE | `/api/sales/:id` | Delete sale |
| POST | `/api/sales/:id/bids` | Add bid to sale |

### 5.12 Utilities

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/utilities` | Get all utilities (paginated) |
| GET | `/api/utilities/:id` | Get utility by ID |
| POST | `/api/utilities` | Create utility record |
| PUT | `/api/utilities/:id` | Update utility |
| DELETE | `/api/utilities/:id` | Delete utility |

### 5.13 Timesheets

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/timesheets` | Get all timesheets (paginated) |
| GET | `/api/timesheets/:id` | Get timesheet by ID |
| POST | `/api/timesheets` | Create timesheet |
| PUT | `/api/timesheets/:id` | Update timesheet |
| DELETE | `/api/timesheets/:id` | Delete timesheet |

### 5.14 Log Books

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/logbooks` | Get all logbooks (paginated) |
| GET | `/api/logbooks/:id` | Get logbook by ID |
| POST | `/api/logbooks` | Create logbook entry |
| PUT | `/api/logbooks/:id` | Update logbook |
| DELETE | `/api/logbooks/:id` | Delete logbook |

### 5.15 Stationery (ATK/ARK)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/stationery-requests` | Get all requests (paginated) |
| GET | `/api/stationery-requests/:id` | Get request by ID |
| POST | `/api/stationery-requests` | Create request |
| PUT | `/api/stationery-requests/:id` | Update request |
| DELETE | `/api/stationery-requests/:id` | Delete request |

### 5.16 Master Items

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/master-items` | Get all items (paginated) |
| GET | `/api/master-items/:id` | Get item by ID |
| GET | `/api/master-items/category/:category` | Get items by category |
| POST | `/api/master-items` | Create item |
| PUT | `/api/master-items/:id` | Update item |
| DELETE | `/api/master-items/:id` | Delete item |

### 5.17 Building Assets

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/building-assets` | Get all assets (paginated) |
| GET | `/api/building-assets/:id` | Get asset by ID |
| POST | `/api/building-assets` | Create asset |
| PUT | `/api/building-assets/:id` | Update asset |
| DELETE | `/api/building-assets/:id` | Delete asset |

### 5.18 Building Maintenances

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/building-maintenances` | Get all maintenances (paginated) |
| GET | `/api/building-maintenances/:id` | Get maintenance by ID |
| POST | `/api/building-maintenances` | Create maintenance |
| PUT | `/api/building-maintenances/:id` | Update maintenance |
| DELETE | `/api/building-maintenances/:id` | Delete maintenance |

### 5.19 Vehicle Contracts

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/vehicle-contracts` | Get all contracts (paginated) |
| GET | `/api/vehicle-contracts/:id` | Get contract by ID |
| POST | `/api/vehicle-contracts` | Create contract |
| PUT | `/api/vehicle-contracts/:id` | Update contract |
| DELETE | `/api/vehicle-contracts/:id` | Delete contract |

### 5.20 Reminders

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/vehicle-reminders` | Get vehicle reminders |
| GET | `/api/building-reminders` | Get building reminders |
| GET | `/api/maintenance-schedules` | Get maintenance schedules |

### 5.21 Master Approvals

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/master-approvals` | Get all approvals |
| GET | `/api/master-approvals/:id` | Get approval by ID |
| POST | `/api/master-approvals` | Create approval config |
| PUT | `/api/master-approvals/:id` | Update approval |
| DELETE | `/api/master-approvals/:id` | Delete approval |

### 5.22 General Masters

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/general-masters` | Get all masters |
| GET | `/api/general-masters/:id` | Get master by ID |
| GET | `/api/general-masters/category/:category` | Get by category |
| POST | `/api/general-masters` | Create master |
| POST | `/api/general-masters/bulk` | Bulk create masters |
| PUT | `/api/general-masters/:id` | Update master |
| DELETE | `/api/general-masters/:id` | Delete master |

### 5.23 Master Categories

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/master-categories` | Get all categories |
| POST | `/api/master-categories` | Create category |
| PUT | `/api/master-categories/:id` | Update category |
| DELETE | `/api/master-categories/:id` | Delete category |

### 5.24 Delivery Locations

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/delivery-locations` | Get all locations |
| GET | `/api/delivery-locations/:id` | Get location by ID |
| POST | `/api/delivery-locations` | Create location |
| PUT | `/api/delivery-locations/:id` | Update location |
| DELETE | `/api/delivery-locations/:id` | Delete location |

### 5.25 Compliances

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/compliances` | Get all compliances |
| GET | `/api/compliances/:id` | Get compliance by ID |
| POST | `/api/compliances` | Create compliance |
| PUT | `/api/compliances/:id` | Update compliance |
| DELETE | `/api/compliances/:id` | Delete compliance |

### 5.26 Purchases

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/purchases` | Get all purchases |
| GET | `/api/purchases/:id` | Get purchase by ID |
| POST | `/api/purchases` | Create purchase |
| PUT | `/api/purchases/:id` | Update purchase |
| DELETE | `/api/purchases/:id` | Delete purchase |

---

### 5.27 Query Parameters (Pagination & Filter)

Semua endpoint GET yang mendukung pagination menerima parameter berikut:

| Parameter | Type | Default | Deskripsi |
|-----------|------|---------|-----------|
| page | int | 1 | Nomor halaman |
| limit | int | 10 | Jumlah data per halaman |
| search | string | - | Kata kunci pencarian |
| status | string | - | Filter berdasarkan status |
| channel | string | - | Filter berdasarkan channel |
| branch | string | - | Filter berdasarkan cabang |
| category | string | - | Filter berdasarkan kategori |
| startDate | string | - | Filter tanggal mulai |
| endDate | string | - | Filter tanggal akhir |

**Contoh Request:**
```
GET /api/vehicles?page=1&limit=10&status=Active&channel=Retail
```

**Response Format:**
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```



---

## 6. PANDUAN INSTALASI

### 6.1 Prerequisites

- Node.js v18+
- Go v1.21+
- PostgreSQL v14+
- Git

### 6.2 Clone Repository

```bash
git clone https://github.com/ryantriananda/fms.git
cd fms
```

### 6.3 Setup Database

1. Buat database PostgreSQL:
```sql
CREATE DATABASE fms_db;
```

2. Konfigurasi environment backend:
```bash
cd backend
cp .env.example .env
```

3. Edit file `.env`:
```env
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=12345
DB_NAME=fms_db
JWT_SECRET=your-secret-key
```

### 6.4 Setup Backend

```bash
cd backend
go mod download
go run main.go
```

Backend akan berjalan di `http://localhost:8080`

### 6.5 Setup Frontend

```bash
# Di root folder
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

### 6.6 Build Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd backend
go build -o fms-backend.exe main.go
```

---

## 7. ALUR BISNIS

### 7.1 Alur Request Servis Kendaraan

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Staff     │────►│   Submit    │────►│  Approval   │────►│   Vendor    │
│  Request    │     │   Request   │     │   Process   │     │   Execute   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                               │
                    ┌──────────────────────────┴──────────────────────────┐
                    │                                                      │
                    ▼                                                      ▼
            ┌─────────────┐                                        ┌─────────────┐
            │  Approved   │                                        │  Rejected   │
            └──────┬──────┘                                        └─────────────┘
                   │
                   ▼
            ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
            │ In Progress │────►│  Completed  │────►│   Closed    │
            └─────────────┘     └─────────────┘     └─────────────┘
```

### 7.2 Alur Request ATK/ARK

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Staff     │────►│   Select    │────►│   Submit    │────►│  Approval   │
│   Login     │     │   Items     │     │   Request   │     │   Queue     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                    ┌──────────────────────────────────────────────┤
                    │                                              │
                    ▼                                              ▼
            ┌─────────────┐                                ┌─────────────┐
            │  Approved   │                                │  Rejected   │
            └──────┬──────┘                                └─────────────┘
                   │
                   ▼
            ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
            │  Preparing  │────►│  Shipping   │────►│  Delivered  │
            └─────────────┘     └─────────────┘     └─────────────┘
                                                           │
                                                           ▼
                                                    ┌─────────────┐
                                                    │Stock Updated│
                                                    └─────────────┘
```

### 7.3 Alur Penjualan Aset

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Create    │────►│   Set       │────►│   Open      │────►│  Collect    │
│   Sale      │     │   Price     │     │   Bidding   │     │   Bids      │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
                                                           ┌─────────────┐
                                                           │  Close      │
                                                           │  Bidding    │
                                                           └──────┬──────┘
                                                                  │
                    ┌─────────────────────────────────────────────┤
                    │                                             │
                    ▼                                             ▼
            ┌─────────────┐                               ┌─────────────┐
            │  Winner     │                               │  No Bids    │
            │  Selected   │                               │  (Cancel)   │
            └──────┬──────┘                               └─────────────┘
                   │
                   ▼
            ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
            │  Approval   │────►│  Payment    │────►│   Asset     │
            │  Process    │     │  Received   │     │   Sold      │
            └─────────────┘     └─────────────┘     └─────────────┘
```

### 7.4 Alur Mutasi Aset

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Request   │────►│  Approval   │────►│  In Transit │
│   Mutation  │     │  Process    │     │             │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Received   │
                                        │  at Dest.   │
                                        └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Location   │
                                        │  Updated    │
                                        └─────────────┘
```

### 7.5 Alur Approval Multi-Level

```
┌─────────────┐
│   Request   │
│   Created   │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Level 1    │────►│  Level 2    │────►│  Level 3    │
│  Approver   │     │  Approver   │     │  Approver   │
│ (Supervisor)│     │  (Manager)  │     │  (Director) │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ Approve           │ Approve           │ Approve
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Next Level │     │  Next Level │     │  Fully      │
│             │     │             │     │  Approved   │
└─────────────┘     └─────────────┘     └─────────────┘

Note: Jika di-reject di level manapun, request akan kembali ke requester
```

---

## 8. STATUS CODES

| Status | Deskripsi |
|--------|-----------|
| **Asset Status** | |
| Active | Aset aktif dan dapat digunakan |
| Inactive | Aset tidak aktif |
| Sold | Aset sudah dijual |
| Under Maintenance | Aset sedang dalam pemeliharaan |
| **Approval Status** | |
| Draft | Belum disubmit |
| Pending | Menunggu approval |
| Approved | Sudah disetujui |
| Rejected | Ditolak |
| **Transaction Status** | |
| Pending | Menunggu proses |
| In Progress | Sedang diproses |
| Completed | Selesai |
| Cancelled | Dibatalkan |
| **Reminder Status** | |
| Safe | > 30 hari sebelum jatuh tempo |
| Warning | 15-30 hari sebelum jatuh tempo |
| Critical | < 15 hari sebelum jatuh tempo |
| Expired | Sudah melewati jatuh tempo |
| **Payment Status** | |
| Unpaid | Belum dibayar |
| Paid | Sudah dibayar |
| Overdue | Terlambat bayar |

---

## 9. KONFIGURASI ENVIRONMENT

### 9.1 Backend Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5433 |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | fms_db |
| JWT_SECRET | JWT secret key | - |
| PORT | Server port | 8080 |

### 9.2 Frontend Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| VITE_API_URL | Backend API URL | http://localhost:8080/api |

---

## 10. SECURITY

### 10.1 Authentication
- JWT-based authentication
- Token expiry: 24 hours
- Password hashing dengan bcrypt

### 10.2 Authorization
- Role-based access control (RBAC)
- Roles: Admin, Manager, Staff
- Permission per module

### 10.3 API Security
- CORS enabled
- Rate limiting
- Input validation
- SQL injection prevention (GORM)

---

## 11. CONTACT

**Developer:** Ryan Triananda
**Repository:** https://github.com/ryantriananda/fms

---

*Dokumentasi ini dibuat pada: 2 Januari 2026*
*Versi: 1.0.0*
