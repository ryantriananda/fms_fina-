
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, List, Calendar, CheckCircle, FileText, User, Package, MapPin, History, Check, XCircle, Clock, Users, MessageSquare, Send, Trash2, ChevronDown, Plus, RotateCcw, Edit3, Layers, Mail, Smartphone, CreditCard, Baby, Minus } from 'lucide-react';
import { VehicleRecord, LogBookRecord, AssetRecord, StationeryRequestRecord, StationeryRequestItem, MasterPodRecord, MasterLockerRecord } from '../types';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveStationeryRequest?: (request: Partial<StationeryRequestRecord>) => void;
  onSaveLogBook?: (logbook: Partial<LogBookRecord>) => void;
  initialAssetData?: AssetRecord;
  initialLogBookData?: LogBookRecord;
  mode?: 'create' | 'edit' | 'view' | 'approve';
  onSavePod?: (data: Partial<MasterPodRecord>) => void;
  onSaveMasterLocker?: (data: Partial<MasterLockerRecord>) => void;
  currentUser?: any;
  onApprove?: () => void;
  onReject?: () => void;
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    moduleName = 'ATK', 
    onSaveStationeryRequest,
    onSaveLogBook,
    onSavePod,
    onSaveMasterLocker,
    initialAssetData,
    initialLogBookData,
    mode = 'create',
    currentUser,
    onApprove,
    onReject
}) => {
  // ATK / ARK State
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({
      type: 'Daily Request',
      deliveryType: 'PICKUP HO',
      location: 'MODENA Head Office',
      date: new Date().toISOString().split('T')[0]
  });
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '-' }]);
  
  // State to toggle editing in Approval Mode
  const [isEditing, setIsEditing] = useState(false);

  // LogBook State
  const [logBookForm, setLogBookForm] = useState<Partial<LogBookRecord>>({
      tanggalKunjungan: new Date().toISOString().split('T')[0],
      jamDatang: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
      lokasiModena: 'SATRIO',
      kategoriTamu: 'Visitor',
      // Mapped to specific counters
      countAdult: 0,
      countIndividual: 1,
      countChild: 0,
      namaTamu: '',
      email: '',
      phone: '',
      identityCardNumber: '',
      visitorCardNumber: '',
      note: ''
  });

  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isLogBook = moduleName === 'Log Book';
  const isViewMode = mode === 'view' || mode === 'approve';
  
  // Determine if form fields should be disabled
  // View mode: Always disabled
  // Approve mode: Disabled unless 'isEditing' is true
  const isFormDisabled = mode === 'view' || (mode === 'approve' && !isEditing);
  
  // Design Specific Check: Is this the ATK/ARK Request Modal?
  const isRequestModal = !isLogBook && !moduleName.includes('Pod') && !moduleName.includes('Loker');

  // Master Data Selection based on Module
  const categoryList = isArkModule ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
  const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;

  useEffect(() => {
    if (isOpen) {
        // Reset editing state on open
        setIsEditing(false);

        if (isLogBook) {
            if (initialLogBookData && mode !== 'create') {
                setLogBookForm(initialLogBookData);
            } else {
                setLogBookForm({
                    tanggalKunjungan: new Date().toISOString().split('T')[0],
                    jamDatang: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
                    jamPulang: '',
                    lokasiModena: 'SATRIO',
                    kategoriTamu: 'CUSTOMER',
                    countAdult: 0,
                    countIndividual: 1,
                    countChild: 0,
                    namaTamu: '',
                    email: '',
                    phone: '',
                    identityCardNumber: '',
                    visitorCardNumber: '',
                    note: ''
                });
            }
        } else {
            // ATK/ARK Logic
            if ((mode === 'view' || mode === 'approve') && initialAssetData) {
                setStationeryRequestForm({
                    type: 'Daily Request',
                    date: initialAssetData.date,
                    remarks: initialAssetData.itemDescription || 'Permintaan rutin ATK untuk operasional kantor.',
                    deliveryType: 'PICKUP HO',
                    location: 'MODENA Head Office'
                });
                // Map initial data to item list (Mock mapping)
                setRequestItems([{ 
                    itemId: initialAssetData.id.toString(), 
                    qty: initialAssetData.qty.toString(), 
                    categoryId: initialAssetData.category, 
                    uom: '-' 
                }]);
            } else {
                setStationeryRequestForm({ 
                    type: 'Daily Request', 
                    deliveryType: 'PICKUP HO', 
                    location: 'MODENA Head Office', 
                    date: new Date().toISOString().split('T')[0],
                    remarks: ''
                });
                setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '-' }]);
            }
        }
    }
  }, [isOpen, initialAssetData, initialLogBookData, mode, isLogBook, moduleName]);

  const handleSave = () => {
      if (isLogBook && onSaveLogBook) {
          // Map back to legacy fields if needed, or just save new structure
          const legacyMapped: Partial<LogBookRecord> = {
              ...logBookForm,
              // Map counts to legacy fields if backend expects them
              lakiLaki: logBookForm.countAdult,
              wanita: logBookForm.countIndividual, // Example mapping
              anakAnak: logBookForm.countChild
          };
          onSaveLogBook(legacyMapped);
      } else if (onSavePod && moduleName.includes('Pod')) {
          onSavePod({});
      } else if (onSaveMasterLocker && moduleName.includes('Loker')) {
          onSaveMasterLocker({});
      } else if (onSaveStationeryRequest) {
          onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      }
  }

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => setStationeryRequestForm(prev => ({ ...prev, [field]: value }));

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      
      if (field === 'categoryId') {
          // If Category changes, reset Item and UOM
          newItems[index] = { 
              ...newItems[index], 
              categoryId: value, 
              itemId: '', 
              uom: '-' 
          };
      } else if (field === 'itemId') {
          // If Item changes, update Item, UOM, and ensure Category matches
          const product = masterList.find(m => m.id.toString() === value);
          newItems[index] = { 
              ...newItems[index], 
              itemId: value, 
              uom: product?.uom || '-',
              categoryId: product?.category || newItems[index].categoryId
          };
      } else {
          newItems[index] = { ...newItems[index], [field]: value };
      }
      setRequestItems(newItems);
  }

  const addRequestItemRow = () => setRequestItems([...requestItems, { itemId: '', qty: '', categoryId: '', uom: '-' }]);
  const removeRequestItemRow = (index: number) => { if (requestItems.length > 1) setRequestItems(requestItems.filter((_, i) => i !== index)); }

  // --- Sub-Components for New Design ---

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  // LOGBOOK SPECIFIC COMPONENTS
  const CounterControl = ({ label, count, onChange, color, icon: Icon }: { label: string, count: number, onChange: (val: number) => void, color: string, icon: any }) => (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[1.2rem] shadow-sm border border-gray-100 h-full">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color} bg-opacity-10`}>
              <Icon size={18} className={color.replace('bg-', 'text-')} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</span>
          <div className="flex items-center gap-4">
              <button 
                onClick={() => count > 0 && onChange(count - 1)}
                className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
                disabled={isViewMode}
              >
                  <Minus size={12} />
              </button>
              <span className="text-[20px] font-black text-black w-6 text-center">{count}</span>
              <button 
                onClick={() => onChange(count + 1)}
                className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
                disabled={isViewMode}
              >
                  <Plus size={12} />
              </button>
          </div>
      </div>
  );

  const LabeledInput = ({ label, value, onChange, placeholder, type = 'text', icon: Icon }: any) => (
      <div className="mb-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
          <div className="relative">
              <input 
                  type={type}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none focus:border-black transition-all placeholder:text-gray-300 shadow-sm"
                  placeholder={placeholder}
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isViewMode}
              />
              {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />}
          </div>
      </div>
  );

  // New Log Book Layout
  const renderLogBookForm = () => (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Column 1: Breakdown & Notes */}
               <div className="space-y-8">
                   {/* Card: Breakdown Visitor */}
                   <div className="bg-[#FBFBFB] p-6 rounded-[2rem] border border-gray-200/60 shadow-sm">
                       <SectionHeader icon={Users} title="BREAKDOWN VISITOR" />
                       <div className="grid grid-cols-3 gap-3">
                           <CounterControl 
                                label="Group" 
                                count={logBookForm.countAdult || 0} 
                                onChange={(val) => setLogBookForm({...logBookForm, countAdult: val})}
                                color="bg-pink-500"
                                icon={Users}
                           />
                           <CounterControl 
                                label="Individu" 
                                count={logBookForm.countIndividual || 0} 
                                onChange={(val) => setLogBookForm({...logBookForm, countIndividual: val})}
                                color="bg-blue-500"
                                icon={User}
                           />
                           <CounterControl 
                                label="Child" 
                                count={logBookForm.countChild || 0} 
                                onChange={(val) => setLogBookForm({...logBookForm, countChild: val})}
                                color="bg-orange-500"
                                icon={Baby}
                           />
                       </div>
                   </div>

                   {/* Card: Notes */}
                   <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-full min-h-[200px]">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText size={16} className="text-gray-400" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CATATAN / NOTES</span>
                        </div>
                        <textarea 
                            className="flex-1 w-full bg-[#F8F9FA] border-none rounded-2xl p-5 text-[12px] font-medium text-black outline-none resize-none placeholder:text-gray-300 focus:ring-2 focus:ring-black/5"
                            placeholder="Tulis catatan kunjungan di sini..."
                            value={logBookForm.note}
                            onChange={(e) => setLogBookForm({...logBookForm, note: e.target.value})}
                            disabled={isViewMode}
                        />
                   </div>
               </div>

               {/* Column 2 & 3: Details */}
               <div className="md:col-span-2 space-y-8">
                   {/* Card: Guest Details */}
                   <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <SectionHeader icon={User} title="GUEST DETAILS" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <LabeledInput 
                                label="NAMA TAMU" 
                                value={logBookForm.namaTamu} 
                                onChange={(val: string) => setLogBookForm({...logBookForm, namaTamu: val})} 
                                placeholder="BUDI SANTOSO" 
                                icon={User}
                            />
                            <div className="mb-1">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">KATEGORI TAMU</label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm uppercase"
                                        value={logBookForm.kategoriTamu}
                                        onChange={(e) => setLogBookForm({...logBookForm, kategoriTamu: e.target.value as any})}
                                        disabled={isViewMode}
                                    >
                                        <option value="CUSTOMER">CUSTOMER</option>
                                        <option value="SUPPLIER">SUPPLIER</option>
                                        <option value="VISITOR">VISITOR</option>
                                        <option value="INTERNAL">INTERNAL</option>
                                    </select>
                                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <LabeledInput 
                                label="EMAIL" 
                                value={logBookForm.email} 
                                onChange={(val: string) => setLogBookForm({...logBookForm, email: val})} 
                                placeholder="budi.santoso@example.com" 
                                type="email"
                                icon={Mail}
                            />
                            <LabeledInput 
                                label="NOMOR HP" 
                                value={logBookForm.phone} 
                                onChange={(val: string) => setLogBookForm({...logBookForm, phone: val})} 
                                placeholder="08123456789" 
                                type="tel"
                                icon={Smartphone}
                            />
                        </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {/* Card: Identity & Access */}
                       <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <SectionHeader icon={CreditCard} title="IDENTITY & ACCESS" />
                            <div className="space-y-6">
                                <LabeledInput 
                                    label="NO. KTP/SIM/PASPOR" 
                                    value={logBookForm.identityCardNumber} 
                                    onChange={(val: string) => setLogBookForm({...logBookForm, identityCardNumber: val})} 
                                    placeholder="3171..." 
                                    icon={CreditCard}
                                />
                                <LabeledInput 
                                    label="NO. VISITOR CARD" 
                                    value={logBookForm.visitorCardNumber} 
                                    onChange={(val: string) => setLogBookForm({...logBookForm, visitorCardNumber: val})} 
                                    placeholder="V-001" 
                                    icon={CreditCard}
                                />
                            </div>
                       </div>

                       {/* Card: Visit Details */}
                       <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <SectionHeader icon={MapPin} title="VISIT DETAILS" />
                            <div className="space-y-6">
                                <div className="mb-1">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">LOKASI MODENA</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm uppercase"
                                            value={logBookForm.lokasiModena}
                                            onChange={(e) => setLogBookForm({...logBookForm, lokasiModena: e.target.value})}
                                            disabled={isViewMode}
                                        >
                                            <option value="SATRIO">SATRIO</option>
                                            <option value="SURYOPRANOTO">SURYOPRANOTO</option>
                                            <option value="WAREHOUSE">WAREHOUSE</option>
                                        </select>
                                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                        <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <LabeledInput 
                                        label="TANGGAL" 
                                        value={logBookForm.tanggalKunjungan} 
                                        onChange={(val: string) => setLogBookForm({...logBookForm, tanggalKunjungan: val})} 
                                        type="date"
                                        icon={Calendar}
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <LabeledInput 
                                            label="IN" 
                                            value={logBookForm.jamDatang} 
                                            onChange={(val: string) => setLogBookForm({...logBookForm, jamDatang: val})} 
                                            type="time"
                                        />
                                        <LabeledInput 
                                            label="OUT" 
                                            value={logBookForm.jamPulang} 
                                            onChange={(val: string) => setLogBookForm({...logBookForm, jamPulang: val})} 
                                            type="time"
                                        />
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
      </div>
  );

  const renderMasterForm = () => <div className="p-8"><p>Master Form Placeholder</p></div>;

  // Existing renderRequestForm ... (Keep existing code for ATK/ARK)
  const renderRequestForm = () => (
      <div className="space-y-6">
          
          {/* Top Row: App Info & Requester Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card 1: Application Info */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
                  <SectionHeader icon={Send} title="APPLICATION INFO" />
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">REQUEST DATE</label>
                          <div className="relative">
                            <input 
                                type="text" 
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none shadow-sm"
                                value={stationeryRequestForm.date}
                                onChange={(e) => handleStationeryRequestChange('date', e.target.value)}
                                disabled={isFormDisabled}
                            />
                          </div>
                      </div>
                      <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">REQUEST TYPE</label>
                          <div className="relative">
                            <input 
                                type="text"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none shadow-sm"
                                value={stationeryRequestForm.type}
                                onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                disabled={isFormDisabled}
                            />
                          </div>
                      </div>
                  </div>

                  <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">DELIVERY METHOD</label>
                      <button 
                        className="w-full bg-black text-white py-4 rounded-xl text-[12px] font-black uppercase tracking-widest shadow-lg shadow-black/20"
                        disabled={isFormDisabled}
                      >
                          {stationeryRequestForm.deliveryType || 'PICKUP HO'}
                      </button>
                  </div>
              </div>

              {/* Card 2: Requester Info */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full flex flex-col">
                  <SectionHeader icon={User} title="REQUESTER INFO" />
                  
                  <div className="flex-1 flex flex-col justify-center">
                      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center gap-6 shadow-sm">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                              <img 
                                src={isViewMode && initialAssetData?.employee?.avatar ? initialAssetData.employee.avatar : currentUser?.avatar || "https://ui-avatars.com/api/?name=Current+User&background=random"} 
                                alt="User" 
                                className="w-full h-full object-cover"
                              />
                          </div>
                          <div>
                              <h3 className="text-[20px] font-black text-black uppercase tracking-tight">
                                {isViewMode && initialAssetData?.employee?.name ? initialAssetData.employee.name : currentUser?.name || 'CURRENT USER'}
                              </h3>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {isViewMode && initialAssetData?.employee?.role ? initialAssetData.employee.role : currentUser?.role || 'STAFF'}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Middle: Requested Items */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <SectionHeader icon={Package} title="REQUESTED ITEMS" />
              
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                  <table className="w-full text-left">
                      <thead>
                          <tr className="bg-[#F8F9FA] border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              <th className="p-5 pl-8 w-40">KATEGORI</th>
                              <th className="p-5 w-64">ITEM NAME</th>
                              <th className="p-5 w-32">ITEM CODE</th>
                              <th className="p-5 text-center w-24">IN STOCK</th>
                              <th className="p-5 text-center w-24">QTY</th>
                              <th className="p-5 text-center w-24">UOM</th>
                              {!isFormDisabled && <th className="p-5 w-12 text-center"></th>}
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                          {requestItems.map((item, idx) => {
                              const selectedProduct = masterList.find(m => m.id.toString() === item.itemId);
                              
                              // Filter master list based on selected category in this row
                              const filteredItems = item.categoryId 
                                  ? masterList.filter(m => m.category === item.categoryId)
                                  : masterList;

                              let displayCategory = item.categoryId || selectedProduct?.category;
                              let displayItemName = selectedProduct?.itemName;
                              let displayItemCode = selectedProduct?.itemCode;
                              let displayStock = selectedProduct?.remainingStock;

                              // Fallback display for view/approve mode if product not found in mock list
                              if (isViewMode && !selectedProduct && initialAssetData) {
                                  displayCategory = initialAssetData.category;
                                  displayItemName = initialAssetData.itemName;
                                  displayItemCode = initialAssetData.itemCode || 'KRT-A4-70';
                                  displayStock = initialAssetData.remainingStock || 45;
                              }

                              const isLowStock = (displayStock || 0) <= (selectedProduct?.minimumStock || 10);

                              return (
                                  <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                      <td className="p-5 pl-8">
                                          {isFormDisabled ? (
                                              <span className="text-[12px] font-black text-black uppercase">{displayCategory || '-'}</span>
                                          ) : (
                                              <div className="relative">
                                                  <select 
                                                      className="w-full bg-transparent border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold text-black outline-none appearance-none cursor-pointer focus:border-black uppercase focus:ring-0"
                                                      value={item.categoryId}
                                                      onChange={(e) => handleRequestItemChange(idx, 'categoryId', e.target.value)}
                                                  >
                                                      <option value="">Select Category...</option>
                                                      {categoryList.map(c => (
                                                          <option key={c.id} value={c.name}>{c.name}</option>
                                                      ))}
                                                  </select>
                                                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                              </div>
                                          )}
                                      </td>
                                      <td className="p-5">
                                          {isFormDisabled ? (
                                              <span className="text-[12px] font-black text-black uppercase">{displayItemName}</span>
                                          ) : (
                                              <div className="relative">
                                                  <select 
                                                      className="w-full bg-transparent border-none text-[12px] font-bold text-black outline-none appearance-none cursor-pointer p-0 focus:ring-0"
                                                      value={item.itemId}
                                                      onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}
                                                      disabled={!item.categoryId && filteredItems.length === masterList.length} // Optional: force category selection first
                                                  >
                                                      <option value="">{item.categoryId ? 'Select Item...' : 'Select Category First...'}</option>
                                                      {filteredItems.map(m => (
                                                          <option key={m.id} value={m.id}>{m.itemName}</option>
                                                      ))}
                                                  </select>
                                              </div>
                                          )}
                                      </td>
                                      <td className="p-5">
                                          <span className="text-[12px] font-mono font-bold text-blue-600">
                                              {displayItemCode || '-'}
                                          </span>
                                      </td>
                                      <td className="p-5 text-center">
                                          <span className={`text-[14px] font-black ${isLowStock ? 'text-red-500' : 'text-green-600'}`}>
                                              {displayStock || 0}
                                          </span>
                                      </td>
                                      <td className="p-5 text-center">
                                          {isFormDisabled ? (
                                              <div className="w-16 mx-auto border border-gray-200 rounded-lg px-2 py-1.5 text-[14px] font-black text-center bg-white shadow-sm">
                                                  {isViewMode && initialAssetData ? initialAssetData.qty : item.qty}
                                              </div>
                                          ) : (
                                              <input 
                                                  type="number"
                                                  className={`w-20 border rounded-lg px-3 py-2 text-[12px] font-black text-center outline-none focus:border-black ${isEditing ? 'border-yellow-400 bg-yellow-50 text-black' : 'border-gray-200'}`}
                                                  value={item.qty}
                                                  onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)}
                                              />
                                          )}
                                      </td>
                                      <td className="p-5 text-center">
                                          <span className="text-[12px] font-bold text-gray-500 uppercase">{item.uom || '-'}</span>
                                      </td>
                                      {!isFormDisabled && (
                                          <td className="p-5 text-center">
                                              <button 
                                                  onClick={() => removeRequestItemRow(idx)}
                                                  className="text-gray-200 hover:text-red-500 transition-colors"
                                              >
                                                  <Trash2 size={16} />
                                              </button>
                                          </td>
                                      )}
                                  </tr>
                              )
                          })}
                      </tbody>
                  </table>
              </div>

              {!isFormDisabled && (
                  <button 
                      onClick={addRequestItemRow}
                      className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest flex items-center gap-2 transition-colors"
                  >
                      <Plus size={14} strokeWidth={3} /> ADD MORE ITEM
                  </button>
              )}
          </div>

          {/* Bottom: Remarks */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <SectionHeader icon={MessageSquare} title="KETERANGAN / REMARKS" />
              <textarea 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[13px] font-medium text-black outline-none focus:border-black placeholder:text-gray-300 resize-none transition-all shadow-sm"
                  rows={3}
                  placeholder="Tulis catatan tambahan di sini..."
                  value={stationeryRequestForm.remarks}
                  onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)}
                  disabled={isFormDisabled}
              />
          </div>

      </div>
  );

  if (!isOpen) return null;

  let modalTitle = '';
  if (isLogBook) modalTitle = isViewMode ? 'EDIT LOG BOOK ENTRY' : 'CREATE LOG BOOK ENTRY';
  else if (moduleName.includes('Pod')) modalTitle = 'ADD MASTER POD';
  else if (moduleName.includes('Loker')) modalTitle = 'ADD MASTER LOCKER';
  else if (isArkModule) modalTitle = isViewMode ? 'HOUSEHOLD REQUEST DETAILS' : 'CREATE HOUSEHOLD REQUEST';
  else modalTitle = isViewMode ? 'STATIONERY REQUEST DETAILS' : 'CREATE STATIONERY REQUEST';

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className={`bg-[#F8F9FA] w-full ${isLogBook || isViewMode ? 'max-w-6xl' : 'max-w-5xl'} rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]`}>
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[16px] font-black text-black uppercase tracking-[0.2em] leading-none">
                {modalTitle}
              </h2>
          </div>
          <div className="flex items-center gap-4">
              {(mode === 'approve' || isViewMode) && isRequestModal && (
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest text-black transition-all shadow-sm">
                      <History size={14} /> VIEW HISTORY APPROVAL ATK
                  </button>
              )}
              <button className="text-gray-300 hover:text-black transition-all p-1" onClick={onClose}>
                <X size={24} />
              </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            {isLogBook ? renderLogBookForm() : 
             (moduleName.includes('Pod') || moduleName.includes('Loker')) ? renderMasterForm() :
             renderRequestForm()
            }
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            {mode === 'approve' ? (
                <>
                    <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                        CLOSE
                    </button>
                    {/* EDIT Button for Approver */}
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-10 py-4 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center gap-2 border ${
                            isEditing 
                            ? 'bg-yellow-50 text-yellow-600 border-yellow-400' 
                            : 'bg-white text-gray-500 border-gray-200 hover:text-black hover:border-gray-400'
                        }`}
                    >
                        {isEditing ? <RotateCcw size={16} /> : <Edit3 size={16} />}
                        {isEditing ? 'CANCEL EDIT' : 'EDIT QTY'}
                    </button>
                    
                    <button onClick={onReject} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-[#DC2626] rounded-2xl hover:bg-red-700 shadow-xl shadow-red-500/20 transition-all active:scale-95 flex items-center gap-2">
                        <XCircle size={16} /> REJECT REQUEST
                    </button>
                    <button onClick={onApprove} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-[#10B981] rounded-2xl hover:bg-green-600 shadow-xl shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2">
                        <Check size={16} strokeWidth={3} /> {isEditing ? 'SAVE & APPROVE' : 'APPROVE REQUEST'}
                    </button>
                </>
            ) : isViewMode ? (
                <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                    CLOSE
                </button>
            ) : (
                <>
                    <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
                        BATAL
                    </button>
                    {!isLogBook && (
                        <button className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
                            SAVE DRAFT
                        </button>
                    )}
                    <button onClick={handleSave} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2">
                        {isLogBook ? <FileText size={16} /> : null} SIMPAN DATA
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
