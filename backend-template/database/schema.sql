-- =============================================
-- FMS DATABASE SCHEMA
-- PostgreSQL
-- =============================================

-- ==================== AUTH ====================
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Staff',
    "department" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "employeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- ==================== VEHICLE ====================
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noPolisi" TEXT NOT NULL UNIQUE,
    "nama" TEXT NOT NULL,
    "merek" TEXT NOT NULL,
    "model" TEXT,
    "tipeKendaraan" TEXT,
    "tahunPembuatan" TEXT,
    "warna" TEXT,
    "isiSilinder" TEXT,
    "noRangka" TEXT,
    "noMesin" TEXT,
    "ownership" TEXT NOT NULL DEFAULT 'Milik Modena',
    "channel" TEXT,
    "cabang" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "approvalStatus" TEXT NOT NULL DEFAULT 'Pending',
    "pengguna" TEXT,
    "tglBeli" TIMESTAMP(3),
    "hargaBeli" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE "VehicleContract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noKontrak" TEXT,
    "vehicleId" TEXT NOT NULL,
    "vendor" TEXT,
    "tglMulai" TIMESTAMP(3),
    "tglBerakhir" TIMESTAMP(3),
    "biayaSewa" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "approvalStatus" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE
);

CREATE TABLE "VehicleService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "tglRequest" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jenisServis" TEXT,
    "vendor" TEXT,
    "masalah" TEXT,
    "kmKendaraan" TEXT,
    "estimasiBiaya" TEXT,
    "cost" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "statusApproval" TEXT NOT NULL DEFAULT 'Pending',
    "completionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE
);

CREATE TABLE "TaxKir" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "tglRequest" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jatuhTempo" TIMESTAMP(3),
    "estimasiBiaya" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "statusApproval" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE
);

-- ==================== BUILDING ====================
CREATE TABLE "Building" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetNo" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "ownership" TEXT NOT NULL DEFAULT 'Rent',
    "location" TEXT,
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "rentCost" TEXT,
    "electricityPower" TEXT,
    "waterSource" TEXT,
    "landArea" TEXT,
    "buildingArea" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Utility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildingId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "meterStart" DOUBLE PRECISION NOT NULL,
    "meterEnd" DOUBLE PRECISION NOT NULL,
    "usage" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "cost" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Unpaid',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE
);

CREATE TABLE "BuildingMaintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildingId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "maintenanceType" TEXT NOT NULL,
    "vendor" TEXT,
    "description" TEXT,
    "cost" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "approvalStatus" TEXT NOT NULL DEFAULT 'Pending',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE
);

CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildingId" TEXT,
    "category" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Safe',
    "source" TEXT NOT NULL DEFAULT 'Manual',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL
);

-- ==================== GENERAL ASSET ====================
CREATE TABLE "GeneralAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetNumber" TEXT NOT NULL UNIQUE,
    "assetName" TEXT NOT NULL,
    "assetCategory" TEXT NOT NULL,
    "type" TEXT,
    "ownership" TEXT NOT NULL DEFAULT 'Own',
    "assetLocation" TEXT,
    "department" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "approvalStatus" TEXT NOT NULL DEFAULT 'Approved',
    "purchasePrice" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "brand" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "AssetMaintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT 'Yearly',
    "lastMaintenanceDate" TIMESTAMP(3),
    "nextMaintenanceDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Safe',
    "vendor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("assetId") REFERENCES "GeneralAsset"("id") ON DELETE CASCADE
);

CREATE TABLE "Mutation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetType" TEXT NOT NULL,
    "vehicleId" TEXT,
    "generalAssetId" TEXT,
    "tipeMutasi" TEXT,
    "lokasiAsal" TEXT,
    "lokasiTujuan" TEXT,
    "tglPermintaan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "statusApproval" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL,
    FOREIGN KEY ("generalAssetId") REFERENCES "GeneralAsset"("id") ON DELETE SET NULL
);

-- ==================== CONSUMABLES (ATK/ARK) ====================
CREATE TABLE "MasterItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemCode" TEXT NOT NULL UNIQUE,
    "itemName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ATK',
    "uom" TEXT NOT NULL,
    "remainingStock" INTEGER NOT NULL DEFAULT 0,
    "minimumStock" INTEGER NOT NULL DEFAULT 0,
    "maximumStock" INTEGER NOT NULL DEFAULT 100,
    "lastPurchasePrice" TEXT,
    "averagePrice" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "AtkRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionNumber" TEXT NOT NULL UNIQUE,
    "requesterId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "uom" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "ArkRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionNumber" TEXT NOT NULL UNIQUE,
    "requesterId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "uom" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "StockOpname" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "opnameId" TEXT NOT NULL UNIQUE,
    "itemCode" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "systemQty" INTEGER NOT NULL,
    "physicalQty" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL,
    "performedBy" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'MATCHED',
    "statusApproval" TEXT NOT NULL DEFAULT 'Pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- ==================== FACILITY ====================
CREATE TABLE "MasterPod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomorKamar" TEXT NOT NULL UNIQUE,
    "lantai" TEXT NOT NULL,
    "jenisKamar" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "gender" TEXT,
    "biayaAwal" TEXT,
    "biayaTerbaru" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "TenantPod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "podId" TEXT NOT NULL,
    "namaPenghuni" TEXT NOT NULL,
    "posisi" TEXT,
    "departemen" TEXT,
    "gender" TEXT,
    "statusLokerBarang" TEXT,
    "statusLokerPantry" TEXT,
    "jadwalLaundry" TEXT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("podId") REFERENCES "MasterPod"("id") ON DELETE CASCADE
);

CREATE TABLE "PodRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requesterId" TEXT NOT NULL,
    "podId" TEXT,
    "floorPreference" TEXT,
    "roomType" TEXT,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("podId") REFERENCES "MasterPod"("id") ON DELETE SET NULL
);

CREATE TABLE "Locker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lockerNumber" TEXT NOT NULL UNIQUE,
    "floor" TEXT,
    "area" TEXT,
    "assignedTo" TEXT,
    "department" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Kosong',
    "lastAuditDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "LockerRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requesterId" TEXT NOT NULL,
    "lockerId" TEXT,
    "requestType" TEXT,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("lockerId") REFERENCES "Locker"("id") ON DELETE SET NULL
);

-- ==================== DAILY OPS ====================
CREATE TABLE "LogBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tanggalKunjungan" TIMESTAMP(3) NOT NULL,
    "jamDatang" TEXT NOT NULL,
    "jamPulang" TEXT,
    "lokasiModena" TEXT,
    "kategoriTamu" TEXT NOT NULL,
    "namaTamu" TEXT NOT NULL,
    "countAdult" INTEGER NOT NULL DEFAULT 0,
    "countChild" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "recordedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE "Timesheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shift" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Tepat Waktu',
    "totalHours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- ==================== INSURANCE ====================
CREATE TABLE "InsuranceProvider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contactPerson" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "InsurancePolicy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "policyNumber" TEXT NOT NULL UNIQUE,
    "providerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "premium" TEXT,
    "sumInsured" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("providerId") REFERENCES "InsuranceProvider"("id") ON DELETE CASCADE
);

CREATE TABLE "InsuranceClaim" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "policyId" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "claimAmount" TEXT,
    "coveredAmount" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Submitted',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy"("id") ON DELETE CASCADE
);

-- ==================== VENDOR ====================
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendorCode" TEXT NOT NULL UNIQUE,
    "vendorName" TEXT NOT NULL,
    "type" TEXT,
    "category" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "picName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- ==================== MASTER DATA ====================
CREATE TABLE "MasterData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    UNIQUE("category", "name")
);

CREATE TABLE "ApprovalWorkflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "module" TEXT NOT NULL,
    "branch" TEXT NOT NULL DEFAULT 'All Branches',
    "tiers" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES ====================
CREATE INDEX "Vehicle_status_idx" ON "Vehicle"("status");
CREATE INDEX "Vehicle_cabang_idx" ON "Vehicle"("cabang");
CREATE INDEX "Building_status_idx" ON "Building"("status");
CREATE INDEX "GeneralAsset_assetCategory_idx" ON "GeneralAsset"("assetCategory");
CREATE INDEX "MasterItem_type_idx" ON "MasterItem"("type");
CREATE INDEX "AtkRequest_status_idx" ON "AtkRequest"("status");
CREATE INDEX "ArkRequest_status_idx" ON "ArkRequest"("status");
CREATE INDEX "LogBook_tanggalKunjungan_idx" ON "LogBook"("tanggalKunjungan");
CREATE INDEX "Timesheet_date_idx" ON "Timesheet"("date");
