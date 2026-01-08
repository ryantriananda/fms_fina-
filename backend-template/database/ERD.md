# FMS Database ERD (Entity Relationship Diagram)

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FMS DATABASE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Total Tables: 24                                                            │
│  Database: PostgreSQL                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Entity Relationship Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                   USER                                        │
│  (Central Entity - relates to most modules)                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  email (unique), password, name, role, department, phone, status              │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   AtkRequest    │  │   ArkRequest    │  │   PodRequest    │  │ LockerRequest   │
│   (requesterId) │  │   (requesterId) │  │   (requesterId) │  │   (requesterId) │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                              VEHICLE MODULE
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                                 VEHICLE                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  noPolisi (unique), nama, merek, model, tipeKendaraan, tahunPembuatan        │
│  warna, ownership, channel, cabang, status, approvalStatus                    │
│  FK: createdById → User                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         ├──────────────────┬──────────────────┬──────────────────┐
         │ 1:N              │ 1:N              │ 1:N              │ 1:N
         ▼                  ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ VehicleContract │  │ VehicleService  │  │     TaxKir      │  │    Mutation     │
│   (vehicleId)   │  │   (vehicleId)   │  │   (vehicleId)   │  │   (vehicleId)   │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ noKontrak       │  │ jenisServis     │  │ jenis           │  │ tipeMutasi      │
│ vendor          │  │ vendor          │  │ jatuhTempo      │  │ lokasiAsal      │
│ tglMulai        │  │ masalah         │  │ estimasiBiaya   │  │ lokasiTujuan    │
│ tglBerakhir     │  │ cost            │  │ status          │  │ status          │
│ biayaSewa       │  │ status          │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                              BUILDING MODULE
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                                BUILDING                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  assetNo (unique), name, type, ownership, location, address                   │
│  city, province, status, rentCost, electricityPower, waterSource              │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         ├──────────────────┬──────────────────┬──────────────────┐
         │ 1:N              │ 1:N              │ 1:N              │
         ▼                  ▼                  ▼                  │
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│     Utility     │  │BuildingMaintena │  │    Reminder     │     │
│   (buildingId)  │  │   (buildingId)  │  │   (buildingId)  │     │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤     │
│ period          │  │ assetName       │  │ category        │     │
│ type            │  │ maintenanceType │  │ documentName    │     │
│ meterStart/End  │  │ vendor          │  │ expiryDate      │     │
│ usage, cost     │  │ cost, status    │  │ status          │     │
└─────────────────┘  └─────────────────┘  └─────────────────┘     │


═══════════════════════════════════════════════════════════════════════════════
                            GENERAL ASSET MODULE
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                              GENERAL ASSET                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  assetNumber (unique), assetName, assetCategory, type, ownership              │
│  assetLocation, department, status, purchasePrice, purchaseDate, brand        │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         ├──────────────────┬──────────────────┐
         │ 1:N              │ 1:N              │
         ▼                  ▼                  │
┌─────────────────┐  ┌─────────────────┐       │
│AssetMaintenance │  │    Mutation     │       │
│    (assetId)    │  │(generalAssetId) │       │
├─────────────────┤  ├─────────────────┤       │
│ frequency       │  │ (shared with    │       │
│ lastMaintenance │  │  Vehicle)       │       │
│ nextMaintenance │  │                 │       │
│ status, vendor  │  │                 │       │
└─────────────────┘  └─────────────────┘       │


═══════════════════════════════════════════════════════════════════════════════
                           CONSUMABLES MODULE (ATK/ARK)
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                               MASTER ITEM                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  itemCode (unique), itemName, category, type (ATK/ARK), uom                   │
│  remainingStock, minimumStock, maximumStock, lastPurchasePrice                │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   AtkRequest    │  │   ArkRequest    │  │   StockOpname   │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ transactionNo   │  │ transactionNo   │  │ opnameId        │
│ requesterId→User│  │ requesterId→User│  │ itemCode        │
│ itemName        │  │ itemName        │  │ systemQty       │
│ category, qty   │  │ category, qty   │  │ physicalQty     │
│ status          │  │ status          │  │ diff, status    │
└─────────────────┘  └─────────────────┘  └─────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                             FACILITY MODULE
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                               MASTER POD                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  nomorKamar (unique), lantai, jenisKamar, kapasitas, status, gender           │
│  biayaAwal, biayaTerbaru                                                      │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         ├──────────────────┬──────────────────┐
         │ 1:N              │ 1:N              │
         ▼                  ▼                  │
┌─────────────────┐  ┌─────────────────┐       │
│    TenantPod    │  │   PodRequest    │       │
│     (podId)     │  │     (podId)     │       │
├─────────────────┤  ├─────────────────┤       │
│ namaPenghuni    │  │ requesterId→User│       │
│ posisi          │  │ floorPreference │       │
│ departemen      │  │ roomType        │       │
│ gender          │  │ reason, status  │       │
└─────────────────┘  └─────────────────┘       │

┌──────────────────────────────────────────────────────────────────────────────┐
│                                 LOCKER                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  lockerNumber (unique), floor, area, assignedTo, department, status           │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│  LockerRequest  │
│    (lockerId)   │
├─────────────────┤
│ requesterId→User│
│ requestType     │
│ reason, status  │
└─────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                             INSURANCE MODULE
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                           INSURANCE PROVIDER                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  name, contactPerson, phone, email, address, rating                           │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         │ 1:N
         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           INSURANCE POLICY                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  PK: id                                                                       │
│  policyNumber (unique), providerId→InsuranceProvider, type                    │
│  startDate, endDate, premium, sumInsured, status                              │
└──────────────────────────────────────────────────────────────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│ InsuranceClaim  │
│    (policyId)   │
├─────────────────┤
│ incidentDate    │
│ description     │
│ claimAmount     │
│ coveredAmount   │
│ status, remarks │
└─────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                             DAILY OPS MODULE
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────┐                    ┌─────────────────┐
│     LogBook     │                    │    Timesheet    │
├─────────────────┤                    ├─────────────────┤
│ tanggalKunjungan│                    │ employeeId→User │
│ jamDatang/Pulang│                    │ date            │
│ lokasiModena    │                    │ shift           │
│ kategoriTamu    │                    │ status          │
│ namaTamu        │                    │ totalHours      │
│ countAdult/Child│                    │ notes           │
│ recordedById→User                    │                 │
└─────────────────┘                    └─────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                             ADMIN MODULE
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│     Vendor      │  │   MasterData    │  │ApprovalWorkflow │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ vendorCode (UQ) │  │ category        │  │ module          │
│ vendorName      │  │ name            │  │ branch          │
│ type, category  │  │ status          │  │ tiers (JSON)    │
│ email, phone    │  │ (UQ: cat+name)  │  │                 │
│ address, picName│  │                 │  │                 │
│ status          │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Table Summary

| Module | Tables | Description |
|--------|--------|-------------|
| Auth | User | User management & authentication |
| Vehicle | Vehicle, VehicleContract, VehicleService, TaxKir | Vehicle fleet management |
| Building | Building, Utility, BuildingMaintenance, Reminder | Building/property management |
| General Asset | GeneralAsset, AssetMaintenance, Mutation | IT/HC asset management |
| Consumables | MasterItem, AtkRequest, ArkRequest, StockOpname | ATK/ARK inventory |
| Facility | MasterPod, TenantPod, PodRequest, Locker, LockerRequest | Pod & locker management |
| Insurance | InsuranceProvider, InsurancePolicy, InsuranceClaim | Insurance management |
| Daily Ops | LogBook, Timesheet | Visitor log & employee timesheet |
| Admin | Vendor, MasterData, ApprovalWorkflow | Master data & configuration |

## Key Relationships

1. **User** → Central entity, referenced by most request tables
2. **Vehicle** → Has contracts, services, tax/KIR records, and mutations
3. **Building** → Has utilities, maintenance records, and reminders
4. **GeneralAsset** → Has maintenance schedules and mutations
5. **MasterPod** → Has tenants and requests
6. **Locker** → Has requests
7. **InsuranceProvider** → Has policies → Has claims
