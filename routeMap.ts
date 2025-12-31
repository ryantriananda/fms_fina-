// Route mapping untuk Sidebar navigation
export const routeMap: Record<string, string> = {
  'Dashboard': '/dashboard',
  
  // Gedung
  'Daftar Gedung': '/gedung/daftar',
  'Utility Monitoring': '/gedung/utility',
  'Branch Improvement': '/gedung/branch-improvement',
  'Asuransi Gedung': '/gedung/asuransi',
  'Compliance & Legal': '/gedung/compliance',
  
  // Kendaraan
  'Daftar Aset': '/kendaraan/daftar',
  'Kontrak Kendaraan': '/kendaraan/kontrak',
  'Servis': '/kendaraan/servis',
  'Pajak & KIR': '/kendaraan/pajak-kir',
  'Reminder Pajak & KIR': '/kendaraan/reminder',
  'Asuransi Kendaraan': '/kendaraan/asuransi',
  'Mutasi': '/kendaraan/mutasi',
  'Penjualan': '/kendaraan/penjualan',
  
  // General Asset
  'Asset HC': '/general-asset/hc',
  'Asset IT': '/general-asset/it',
  'Customer Service': '/general-asset/customer-service',
  'Pemeliharaan Asset': '/general-asset/pemeliharaan',
  'Reminder Pemeliharaan': '/general-asset/reminder',
  'Mutasi Aset': '/general-asset/mutasi',
  'Penjualan Aset': '/general-asset/penjualan',
  
  // ATK
  'Request ATK': '/atk/request',
  'Stationery Request Approval': '/atk/approval',
  'Master ATK': '/atk/master',
  
  // ARK
  'Daftar ARK': '/ark/daftar',
  'Household Request Approval': '/ark/approval',
  'Master ARK': '/ark/master',
  
  // Daily Operations
  'Timesheet': '/timesheet',
  'Log Book': '/logbook',
  
  // Administration
  'Vendor': '/vendor',
  'Manajemen User': '/user-management',
  
  // Master Data
  'Master Approval': '/master/approval',
  'Master Vendor': '/master/vendor',
};
