import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Gedung
const DaftarGedung = React.lazy(() => import('./pages/gedung/DaftarGedung'));
const UtilityMonitoring = React.lazy(() => import('./pages/gedung/UtilityMonitoring'));
const BranchImprovement = React.lazy(() => import('./pages/gedung/BranchImprovement'));
const AsuransiGedung = React.lazy(() => import('./pages/gedung/AsuransiGedung'));
const ComplianceLegal = React.lazy(() => import('./pages/gedung/ComplianceLegal'));

// Kendaraan
const DaftarAset = React.lazy(() => import('./pages/kendaraan/DaftarAset'));
const KontrakKendaraan = React.lazy(() => import('./pages/kendaraan/KontrakKendaraan'));
const Servis = React.lazy(() => import('./pages/kendaraan/Servis'));
const PajakKir = React.lazy(() => import('./pages/kendaraan/PajakKir'));
const ReminderPajakKir = React.lazy(() => import('./pages/kendaraan/ReminderPajakKir'));
const AsuransiKendaraan = React.lazy(() => import('./pages/kendaraan/AsuransiKendaraan'));
const MutasiKendaraan = React.lazy(() => import('./pages/kendaraan/Mutasi'));
const PenjualanKendaraan = React.lazy(() => import('./pages/kendaraan/Penjualan'));

// General Asset
const AssetHC = React.lazy(() => import('./pages/general-asset/AssetHC'));
const AssetIT = React.lazy(() => import('./pages/general-asset/AssetIT'));
const CustomerService = React.lazy(() => import('./pages/general-asset/CustomerService'));
const PemeliharaanAsset = React.lazy(() => import('./pages/general-asset/PemeliharaanAsset'));
const ReminderPemeliharaan = React.lazy(() => import('./pages/general-asset/ReminderPemeliharaan'));
const MutasiAset = React.lazy(() => import('./pages/general-asset/MutasiAset'));
const PenjualanAset = React.lazy(() => import('./pages/general-asset/PenjualanAset'));

// ATK
const RequestATK = React.lazy(() => import('./pages/atk/RequestATK'));
const StationeryRequestApproval = React.lazy(() => import('./pages/atk/StationeryRequestApproval'));
const MasterATK = React.lazy(() => import('./pages/atk/MasterATK'));

// ARK
const DaftarARK = React.lazy(() => import('./pages/ark/DaftarARK'));
const HouseholdRequestApproval = React.lazy(() => import('./pages/ark/HouseholdRequestApproval'));
const MasterARK = React.lazy(() => import('./pages/ark/MasterARK'));

// Daily Operations
const Timesheet = React.lazy(() => import('./pages/Timesheet'));
const LogBook = React.lazy(() => import('./pages/LogBook'));

// Administration
const Vendor = React.lazy(() => import('./pages/Vendor'));
const ManajemenUser = React.lazy(() => import('./pages/ManajemenUser'));

// Master Data
const MasterApproval = React.lazy(() => import('./pages/master/MasterApproval'));
const MasterVendor = React.lazy(() => import('./pages/master/MasterVendor'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      
      // Gedung
      { path: 'gedung/daftar', element: <DaftarGedung /> },
      { path: 'gedung/utility', element: <UtilityMonitoring /> },
      { path: 'gedung/branch-improvement', element: <BranchImprovement /> },
      { path: 'gedung/asuransi', element: <AsuransiGedung /> },
      { path: 'gedung/compliance', element: <ComplianceLegal /> },
      
      // Kendaraan
      { path: 'kendaraan/daftar', element: <DaftarAset /> },
      { path: 'kendaraan/kontrak', element: <KontrakKendaraan /> },
      { path: 'kendaraan/servis', element: <Servis /> },
      { path: 'kendaraan/pajak-kir', element: <PajakKir /> },
      { path: 'kendaraan/reminder', element: <ReminderPajakKir /> },
      { path: 'kendaraan/asuransi', element: <AsuransiKendaraan /> },
      { path: 'kendaraan/mutasi', element: <MutasiKendaraan /> },
      { path: 'kendaraan/penjualan', element: <PenjualanKendaraan /> },
      
      // General Asset
      { path: 'general-asset/hc', element: <AssetHC /> },
      { path: 'general-asset/it', element: <AssetIT /> },
      { path: 'general-asset/customer-service', element: <CustomerService /> },
      { path: 'general-asset/pemeliharaan', element: <PemeliharaanAsset /> },
      { path: 'general-asset/reminder', element: <ReminderPemeliharaan /> },
      { path: 'general-asset/mutasi', element: <MutasiAset /> },
      { path: 'general-asset/penjualan', element: <PenjualanAset /> },
      
      // ATK
      { path: 'atk/request', element: <RequestATK /> },
      { path: 'atk/approval', element: <StationeryRequestApproval /> },
      { path: 'atk/master', element: <MasterATK /> },
      
      // ARK
      { path: 'ark/daftar', element: <DaftarARK /> },
      { path: 'ark/approval', element: <HouseholdRequestApproval /> },
      { path: 'ark/master', element: <MasterARK /> },
      
      // Daily Operations
      { path: 'timesheet', element: <Timesheet /> },
      { path: 'logbook', element: <LogBook /> },
      
      // Administration
      { path: 'vendor', element: <Vendor /> },
      { path: 'user-management', element: <ManajemenUser /> },
      
      // Master Data
      { path: 'master/approval', element: <MasterApproval /> },
      { path: 'master/vendor', element: <MasterVendor /> },
    ],
  },
]);

// Route mapping untuk Sidebar navigation
export { routeMap } from './routeMap';
