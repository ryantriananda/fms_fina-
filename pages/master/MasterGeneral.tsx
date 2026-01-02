import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api';

interface GeneralMaster {
  id: number;
  category: string;
  name: string;
  code: string;
  value?: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

const CATEGORIES = [
  { code: 'BUILDING_TYPE', name: 'Tipe Gedung', path: '/master/tipe-gedung' },
  { code: 'BRAND', name: 'Merek', path: '/master/brand' },
  { code: 'VEHICLE_TYPE', name: 'Tipe Kendaraan', path: '/master/tipe-kendaraan' },
  { code: 'COLOR', name: 'Warna', path: '/master/warna' },
  { code: 'CHANNEL', name: 'Channel', path: '/master/channel' },
  { code: 'DEPARTMENT', name: 'Department', path: '/master/department' },
  { code: 'UOM', name: 'Satuan (UOM)', path: '/master/satuan' },
  { code: 'VENDOR_CATEGORY', name: 'Kategori Vendor', path: '/master/kategori-vendor' },
  { code: 'PPN', name: 'PPN', path: '/master/ppn' },
  { code: 'ASSET_CATEGORY', name: 'Kategori Aset', path: '/master/kategori-aset' },
  { code: 'OWNERSHIP', name: 'Kepemilikan', path: '/master/kepemilikan' },
  { code: 'INSURANCE_TYPE', name: 'Tipe Asuransi', path: '/master/tipe-asuransi' },
  { code: 'SERVICE_TYPE', name: 'Tipe Servis', path: '/master/tipe-servis' },
  { code: 'MAINTENANCE_TYPE', name: 'Tipe Pemeliharaan', path: '/master/tipe-pemeliharaan' },
  { code: 'MAINTENANCE_FREQ', name: 'Frekuensi Pemeliharaan', path: '/master/frekuensi-pemeliharaan' },
  { code: 'BUILDING_ASSET_TYPE', name: 'Tipe Aset Gedung', path: '/master/tipe-aset-gedung' },
  { code: 'UTILITY_TYPE', name: 'Tipe Utilitas', path: '/master/tipe-utilitas' },
];

const MasterGeneral: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('BUILDING_TYPE');
  const [data, setData] = useState<GeneralMaster[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GeneralMaster | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    name: '',
    code: '',
    value: '',
    description: '',
    sortOrder: 0,
    isActive: true,
    isDefault: false,
  });

  // Auto-select category based on URL
  useEffect(() => {
    const category = CATEGORIES.find(cat => cat.path === location.pathname);
    if (category) {
      setSelectedCategory(category.code);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/general-masters/category/${selectedCategory}`);
      if (response.ok) {
        const result = await response.json();
        setData(result || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        category: selectedCategory,
      };

      const url = editingItem 
        ? `${API_URL}/general-masters/${editingItem.id}`
        : `${API_URL}/general-masters`;
      
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    
    try {
      const response = await fetch(`${API_URL}/general-masters/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleEdit = (item: GeneralMaster) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      code: item.code,
      value: item.value || '',
      description: item.description || '',
      sortOrder: item.sortOrder,
      isActive: item.isActive,
      isDefault: item.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setForm({
      name: '',
      code: '',
      value: '',
      description: '',
      sortOrder: 0,
      isActive: true,
      isDefault: false,
    });
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Master Data Umum</h1>
        <p className="text-sm text-gray-600">Kelola data master untuk dropdown sistem</p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.code}
              onClick={() => setSelectedCategory(cat.code)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.code
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Data
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urutan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sortOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.isDefault && <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Default</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit Data' : 'Tambah Data Baru'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Showroom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: SHOWROOM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nilai (Optional)</label>
                <input
                  type="text"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 11 (untuk PPN 11%)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Aktif</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Default</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterGeneral;
