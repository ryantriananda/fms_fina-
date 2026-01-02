# 📡 FMS API DOCUMENTATION

## Base URL
```
http://localhost:8080/api
```

## Authentication
Semua endpoint (kecuali `/auth/login` dan `/auth/register`) memerlukan JWT token di header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication

### 1.1 Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "fullName": "Administrator",
    "role": "Admin"
  }
}
```

### 1.2 Register
```http
POST /auth/register
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "New User",
  "role": "Staff",
  "department": "IT",
  "branch": "Jakarta"
}
```

---

## 2. Users

### 2.1 Get All Users
```http
GET /users?page=1&limit=10&search=admin
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "fullName": "Administrator",
      "role": "Admin",
      "department": "IT",
      "branch": "Jakarta",
      "status": "Active",
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### 2.2 Get User by ID
```http
GET /users/:id
```

### 2.3 Create User
```http
POST /users
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "New User",
  "role": "Staff",
  "department": "IT",
  "branch": "Jakarta",
  "phone": "08123456789"
}
```

### 2.4 Update User
```http
PUT /users/:id
```

### 2.5 Delete User
```http
DELETE /users/:id
```

---

## 3. Vehicles

### 3.1 Get All Vehicles
```http
GET /vehicles?page=1&limit=10&status=Active&channel=Retail&cabang=Jakarta
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "noPolisi": "B 1234 ABC",
      "noRangka": "MHKA1234567890",
      "noMesin": "1NZ1234567",
      "merek": "Toyota",
      "model": "Avanza",
      "tipeKendaraan": "MPV",
      "tahunPembuatan": "2023",
      "warna": "Putih",
      "ownership": "Own",
      "channel": "Retail",
      "cabang": "Jakarta",
      "penggunaUtama": "John Doe",
      "status": "Active",
      "stnkExpiry": "2026-12-31",
      "kirExpiry": "2026-06-30"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

### 3.2 Create Vehicle
```http
POST /vehicles
```

**Request Body:**
```json
{
  "noPolisi": "B 1234 ABC",
  "noRangka": "MHKA1234567890",
  "noMesin": "1NZ1234567",
  "merek": "Toyota",
  "model": "Avanza",
  "tipeKendaraan": "MPV",
  "tahunPembuatan": "2023",
  "warna": "Putih",
  "ownership": "Own",
  "channel": "Retail",
  "cabang": "Jakarta",
  "penggunaUtama": "John Doe",
  "stnkExpiry": "2026-12-31",
  "kirExpiry": "2026-06-30",
  "purchaseDate": "2023-01-15",
  "purchasePrice": 250000000
}
```

---

## 4. Buildings

### 4.1 Get All Buildings
```http
GET /buildings?page=1&limit=10&status=Active
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "assetNo": "BLD-001",
      "buildingName": "Showroom Jakarta Pusat",
      "address": "Jl. Sudirman No. 123",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "ownership": "Own",
      "buildingType": "Showroom",
      "totalFloors": 3,
      "totalArea": 1500.5,
      "status": "Active"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

### 4.2 Create Building
```http
POST /buildings
```

**Request Body:**
```json
{
  "assetNo": "BLD-001",
  "buildingName": "Showroom Jakarta Pusat",
  "address": "Jl. Sudirman No. 123",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "postalCode": "10220",
  "ownership": "Own",
  "buildingType": "Showroom",
  "totalFloors": 3,
  "totalArea": 1500.5,
  "landArea": 2000,
  "buildingArea": 1500.5,
  "yearBuilt": "2020",
  "channel": "Retail",
  "branch": "Jakarta",
  "pic": "Manager A",
  "phone": "021-1234567"
}
```

---

## 5. General Assets

### 5.1 Get All General Assets
```http
GET /general-assets?page=1&limit=10&category=IT
```

### 5.2 Get Assets by Category
```http
GET /general-assets/category/IT
GET /general-assets/category/HC
GET /general-assets/category/CS
```

### 5.3 Create General Asset
```http
POST /general-assets
```

**Request Body:**
```json
{
  "assetNumber": "IT-001",
  "assetCategory": "IT",
  "type": "Laptop",
  "assetName": "Laptop Dell Latitude 5520",
  "buildingId": 1,
  "assetLocation": "Jakarta",
  "department": "IT",
  "purchasePrice": 15000000,
  "purchaseDate": "2025-01-15",
  "brand": "Dell",
  "modelNumber": "Latitude 5520",
  "pic": "John Doe"
}
```

---

## 6. Vendors

### 6.1 Get All Vendors
```http
GET /vendors?page=1&limit=10&category=Bengkel
```

### 6.2 Create Vendor
```http
POST /vendors
```

**Request Body:**
```json
{
  "vendorCode": "VND-001",
  "vendorName": "PT Bengkel Jaya",
  "category": "Bengkel",
  "address": "Jl. Raya No. 123",
  "city": "Jakarta",
  "phone": "021-1234567",
  "email": "info@bengkeljaya.com",
  "picName": "Budi",
  "picPhone": "08123456789",
  "bankName": "BCA",
  "bankAccount": "1234567890",
  "bankAccountName": "PT Bengkel Jaya",
  "npwp": "12.345.678.9-012.000"
}
```

---

## 7. Services (Vehicle Service)

### 7.1 Get All Services
```http
GET /services?page=1&limit=10&status=Pending
```

### 7.2 Create Service Request
```http
POST /services
```

**Request Body:**
```json
{
  "vehicleId": 1,
  "noPolisi": "B 1234 ABC",
  "assetName": "Toyota Avanza",
  "tglRequest": "2026-01-02",
  "channel": "Retail",
  "cabang": "Jakarta",
  "vendorId": 1,
  "vendor": "PT Bengkel Jaya",
  "kmKendaraan": "50000",
  "masalah": "AC tidak dingin",
  "jenisServis": "Perbaikan AC",
  "estimasiBiaya": 1500000,
  "spareParts": [
    {
      "name": "Freon AC",
      "qty": 2,
      "price": 250000
    },
    {
      "name": "Filter AC",
      "qty": 1,
      "price": 150000
    }
  ]
}
```

---

## 8. Tax & KIR

### 8.1 Get All Tax/KIR
```http
GET /tax-kirs?page=1&limit=10&jenis=Pajak STNK
```

### 8.2 Create Tax/KIR Request
```http
POST /tax-kirs
```

**Request Body:**
```json
{
  "vehicleId": 1,
  "noPolisi": "B 1234 ABC",
  "assetName": "Toyota Avanza",
  "tglRequest": "2026-01-02",
  "jenis": "Pajak STNK",
  "channel": "Retail",
  "cabang": "Jakarta",
  "jatuhTempo": "2026-03-15",
  "estimasiBiaya": 2500000,
  "targetSelesai": "2026-03-10",
  "jenisPembayaran": "Transfer"
}
```

---

## 9. Insurances

### 9.1 Get All Insurances
```http
GET /insurances?page=1&limit=10&category=Vehicle
```

### 9.2 Create Insurance
```http
POST /insurances
```

**Request Body:**
```json
{
  "policyNumber": "POL-2026-001",
  "assetId": 1,
  "assetName": "B 1234 ABC - Toyota Avanza",
  "category": "Vehicle",
  "provider": "Asuransi ABC",
  "vendorId": 2,
  "type": "All Risk",
  "startDate": "2026-01-01",
  "endDate": "2027-01-01",
  "premium": 5000000,
  "sumInsured": 250000000,
  "deductible": 300000
}
```

### 9.3 Add Insurance Claim
```http
POST /insurances/:id/claims
```

**Request Body:**
```json
{
  "incidentDate": "2026-01-15",
  "description": "Kecelakaan ringan di parkiran",
  "claimAmount": 5000000
}
```

---

## 10. Mutations

### 10.1 Get All Mutations
```http
GET /mutations?page=1&limit=10&assetType=VEHICLE
```

### 10.2 Create Mutation
```http
POST /mutations
```

**Request Body:**
```json
{
  "vehicleId": 1,
  "noPolisi": "B 1234 ABC",
  "assetName": "Toyota Avanza",
  "cabangAset": "Jakarta",
  "tipeMutasi": "Pindah Cabang",
  "tglPermintaan": "2026-01-02",
  "lokasiAsal": "Jakarta",
  "lokasiTujuan": "Bandung",
  "picBefore": "John Doe",
  "picAfter": "Jane Doe",
  "assetType": "VEHICLE",
  "biayaMutasi": 500000
}
```

---

## 11. Sales

### 11.1 Get All Sales
```http
GET /sales?page=1&limit=10&status=Open Bidding
```

### 11.2 Create Sale
```http
POST /sales
```

**Request Body:**
```json
{
  "vehicleId": 1,
  "noPolisi": "B 1234 ABC",
  "assetName": "Toyota Avanza 2020",
  "tglRequest": "2026-01-02",
  "channel": "Retail",
  "cabang": "Jakarta",
  "hargaPembuka": 150000000,
  "assetType": "VEHICLE"
}
```

### 11.3 Add Bid
```http
POST /sales/:id/bids
```

**Request Body:**
```json
{
  "amount": 155000000,
  "bidderName": "PT ABC",
  "bidderRole": "Dealer",
  "bidderEmail": "buyer@abc.com",
  "bidderPhone": "08123456789",
  "bidderKtp": "3171234567890001"
}
```

---

## 12. Utilities

### 12.1 Get All Utilities
```http
GET /utilities?page=1&limit=10&type=Listrik&buildingId=1
```

### 12.2 Create Utility Record
```http
POST /utilities
```

**Request Body:**
```json
{
  "buildingId": 1,
  "period": "2026-01",
  "date": "2026-01-31",
  "location": "Showroom Jakarta",
  "type": "Listrik",
  "meterStart": 10000,
  "meterEnd": 12500,
  "usage": 2500,
  "unit": "kWh",
  "cost": 3750000
}
```

---

## 13. Stationery Requests (ATK/ARK)

### 13.1 Get All Requests
```http
GET /stationery-requests?page=1&limit=10&type=ATK
```

### 13.2 Create Request
```http
POST /stationery-requests
```

**Request Body:**
```json
{
  "type": "ATK",
  "deliveryType": "Delivery",
  "locationId": 1,
  "location": "Kantor Pusat",
  "date": "2026-01-02",
  "remarks": "Kebutuhan bulanan",
  "requestedBy": 1,
  "items": [
    {
      "itemId": 1,
      "qty": 10,
      "uom": "Pcs"
    },
    {
      "itemId": 2,
      "qty": 5,
      "uom": "Box"
    }
  ]
}
```

---

## 14. Master Items

### 14.1 Get All Items
```http
GET /master-items?page=1&limit=10&category=ATK
```

### 14.2 Get Items by Category
```http
GET /master-items/category/ATK
GET /master-items/category/ARK
```

### 14.3 Create Item
```http
POST /master-items
```

**Request Body:**
```json
{
  "category": "ATK",
  "itemName": "Pulpen Pilot",
  "itemCode": "ATK-001",
  "uom": "Pcs",
  "remainingStock": 100,
  "minimumStock": 20,
  "maximumStock": 200,
  "lastPurchasePrice": 5000,
  "averagePrice": 4500
}
```

---

## 15. Building Assets

### 15.1 Get All Building Assets
```http
GET /building-assets?page=1&limit=10&buildingId=1
```

### 15.2 Create Building Asset
```http
POST /building-assets
```

**Request Body:**
```json
{
  "assetName": "AC Split 2 PK",
  "assetCode": "AC-001",
  "assetType": "AC",
  "buildingId": 1,
  "buildingName": "Showroom Jakarta",
  "floor": "1",
  "roomName": "Ruang Showroom",
  "maintenanceFrequency": "Quarterly",
  "ownership": "Own",
  "purchasePrice": 8000000,
  "purchaseDate": "2025-01-15",
  "pic": "Teknisi A",
  "brand": "Daikin"
}
```

---

## 16. Building Maintenances

### 16.1 Get All Maintenances
```http
GET /building-maintenances?page=1&limit=10&status=Scheduled
```

### 16.2 Create Maintenance
```http
POST /building-maintenances
```

**Request Body:**
```json
{
  "assetId": 1,
  "assetName": "AC Split 2 PK",
  "buildingLocation": "Showroom Jakarta - Lt. 1",
  "requestDate": "2026-01-02",
  "maintenanceType": "Preventive",
  "description": "Pembersihan filter dan pengecekan freon",
  "cost": 500000,
  "vendorId": 3,
  "vendor": "PT Maintenance Jaya",
  "technician": "Teknisi B"
}
```

---

## 17. General Masters

### 17.1 Get All Masters
```http
GET /general-masters?page=1&limit=100
```

### 17.2 Get Masters by Category
```http
GET /general-masters/category/BRAND
GET /general-masters/category/COLOR
GET /general-masters/category/VEHICLE_TYPE
GET /general-masters/category/PPN
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "category": "BRAND",
      "name": "Toyota",
      "code": "TOYOTA",
      "isActive": true,
      "isDefault": false
    },
    {
      "id": 2,
      "category": "BRAND",
      "name": "Honda",
      "code": "HONDA",
      "isActive": true,
      "isDefault": false
    }
  ]
}
```

### 17.3 Create Master
```http
POST /general-masters
```

**Request Body:**
```json
{
  "category": "BRAND",
  "name": "Nissan",
  "code": "NISSAN",
  "isActive": true
}
```

### 17.4 Bulk Create Masters
```http
POST /general-masters/bulk
```

**Request Body:**
```json
{
  "items": [
    {
      "category": "COLOR",
      "name": "Kuning",
      "code": "YELLOW"
    },
    {
      "category": "COLOR",
      "name": "Hijau",
      "code": "GREEN"
    }
  ]
}
```

---

## 18. Reminders

### 18.1 Get Vehicle Reminders
```http
GET /vehicle-reminders?status=Warning
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicleId": 1,
      "noPolisi": "B 1234 ABC",
      "vehicleName": "Toyota Avanza",
      "type": "STNK 1 Tahunan",
      "expiryDate": "2026-02-15",
      "branch": "Jakarta",
      "status": "Warning"
    }
  ]
}
```

### 18.2 Get Building Reminders
```http
GET /building-reminders?status=Urgent
```

### 18.3 Get Maintenance Schedules
```http
GET /maintenance-schedules?status=Overdue
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request body"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Pagination Response Format

Semua endpoint GET yang mendukung pagination mengembalikan format:

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

*API Documentation v1.0.0*
*Last Updated: 2 Januari 2026*
