import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@modena.com' },
    update: {},
    create: {
      email: 'admin@modena.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'Admin',
      department: 'GA',
      status: 'Active',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Staff User
  const staffPassword = await bcrypt.hash('staff123', 12);
  const staff = await prisma.user.upsert({
    where: { email: 'staff@modena.com' },
    update: {},
    create: {
      email: 'staff@modena.com',
      password: staffPassword,
      name: 'Staff User',
      role: 'Staff',
      department: 'IT',
      status: 'Active',
    },
  });
  console.log('✅ Staff user created:', staff.email);

  // Create Master Data
  const masterDataItems = [
    { category: 'Brand', name: 'Toyota' },
    { category: 'Brand', name: 'Honda' },
    { category: 'Brand', name: 'Daihatsu' },
    { category: 'Color', name: 'Hitam' },
    { category: 'Color', name: 'Putih' },
    { category: 'Color', name: 'Silver' },
    { category: 'Department', name: 'IT' },
    { category: 'Department', name: 'HR' },
    { category: 'Department', name: 'Finance' },
    { category: 'Department', name: 'GA' },
    { category: 'Location', name: 'Jakarta' },
    { category: 'Location', name: 'Surabaya' },
    { category: 'Location', name: 'Bandung' },
    { category: 'VehicleType', name: 'MPV' },
    { category: 'VehicleType', name: 'SUV' },
    { category: 'VehicleType', name: 'Sedan' },
    { category: 'ATKCategory', name: 'Kertas' },
    { category: 'ATKCategory', name: 'Tulis' },
    { category: 'ATKCategory', name: 'Folder' },
    { category: 'ARKCategory', name: 'Cleaning' },
    { category: 'ARKCategory', name: 'Pantry' },
  ];

  for (const item of masterDataItems) {
    await prisma.masterData.upsert({
      where: { category_name: { category: item.category, name: item.name } },
      update: {},
      create: item,
    });
  }
  console.log('✅ Master data created');

  // Create Sample Vehicle
  const vehicle = await prisma.vehicle.upsert({
    where: { noPolisi: 'B 1234 ABC' },
    update: {},
    create: {
      noPolisi: 'B 1234 ABC',
      nama: 'Toyota Avanza',
      merek: 'Toyota',
      model: 'G MT',
      tipeKendaraan: 'MPV',
      tahunPembuatan: '2020',
      warna: 'Hitam',
      ownership: 'Milik Modena',
      channel: 'HCO',
      cabang: 'Jakarta',
      status: 'Aktif',
      approvalStatus: 'Approved',
      createdById: admin.id,
    },
  });
  console.log('✅ Sample vehicle created:', vehicle.noPolisi);

  // Create Sample Building
  const building = await prisma.building.upsert({
    where: { assetNo: 'BDG-001' },
    update: {},
    create: {
      assetNo: 'BDG-001',
      name: 'MODENA Head Office',
      type: 'Office',
      ownership: 'Rent',
      location: 'Jakarta',
      address: 'Jl. Satrio No. 1',
      status: 'Active',
      rentCost: '500000000',
      electricityPower: '100000 VA',
      waterSource: 'PDAM',
    },
  });
  console.log('✅ Sample building created:', building.name);

  // Create Sample Master Items (ATK)
  const atkItems = [
    { itemCode: 'ATK-001', itemName: 'Kertas A4 80gr', category: 'Kertas', type: 'ATK', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100 },
    { itemCode: 'ATK-002', itemName: 'Pulpen Standard', category: 'Tulis', type: 'ATK', uom: 'Pcs', remainingStock: 120, minimumStock: 20, maximumStock: 200 },
  ];

  for (const item of atkItems) {
    await prisma.masterItem.upsert({
      where: { itemCode: item.itemCode },
      update: {},
      create: item,
    });
  }
  console.log('✅ Sample ATK items created');

  // Create Insurance Provider
  const provider = await prisma.insuranceProvider.create({
    data: {
      name: 'AXA Mandiri',
      contactPerson: 'John Doe',
      phone: '021-1234567',
      email: 'contact@axa.com',
      address: 'Jakarta',
      rating: 5,
    },
  });
  console.log('✅ Insurance provider created:', provider.name);

  // Create Sample Vendor
  await prisma.vendor.upsert({
    where: { vendorCode: 'VEN-001' },
    update: {},
    create: {
      vendorCode: 'VEN-001',
      vendorName: 'PT ATK Jaya',
      type: 'Goods',
      category: 'ATK',
      email: 'sales@atkjaya.com',
      phone: '021-555555',
      address: 'Jakarta',
      picName: 'Pak Budi',
      status: 'Active',
    },
  });
  console.log('✅ Sample vendor created');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
