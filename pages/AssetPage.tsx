import React from 'react';
import { GeneralAssetTable } from '../components/GeneralAssetTable';
import { MaintenanceReminderTable } from '../components/MaintenanceReminderTable';
import { MutationTable } from '../components/MutationTable';
import { SalesTable } from '../components/SalesTable';
import { 
    GeneralAssetRecord, MaintenanceScheduleRecord, MutationRecord, SalesRecord 
} from '../types';

interface AssetPageProps {
    activeItem: string;
    assets: GeneralAssetRecord[];
    maintenances: MaintenanceScheduleRecord[];
    mutations: MutationRecord[];
    sales: SalesRecord[];
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
}

export const AssetPage: React.FC<AssetPageProps> = ({
    activeItem, assets, maintenances, mutations, sales,
    onOpenModal, onDelete
}) => {
    // Filter assets by category based on menu
    const getFilteredAssets = () => {
        switch (activeItem) {
            case 'Asset HC':
                return assets.filter(a => a.assetCategory === 'HC' || a.department === 'HC');
            case 'Asset IT':
                return assets.filter(a => a.assetCategory === 'IT' || a.department === 'IT');
            case 'Customer Service':
                return assets.filter(a => a.assetCategory === 'CS' || a.department === 'Customer Service');
            default:
                return assets;
        }
    };

    switch (activeItem) {
        case 'Asset HC':
        case 'Asset IT':
        case 'Customer Service':
            return (
                <GeneralAssetTable
                    data={getFilteredAssets()}
                    onAdd={() => onOpenModal('generalAsset', 'create', { category: activeItem })}
                    onEdit={(item) => onOpenModal('generalAsset', 'edit', item)}
                    onView={(item) => onOpenModal('generalAsset', 'view', item)}
                    onDelete={(id) => onDelete('generalAsset', id)}
                />
            );
        case 'Reminder Pemeliharaan':
            return (
                <MaintenanceReminderTable
                    data={maintenances}
                    assets={assets}
                    onAdd={() => onOpenModal('maintenanceSchedule', 'create')}
                    onEdit={(item) => onOpenModal('maintenanceSchedule', 'edit', item)}
                    onView={(item) => onOpenModal('maintenanceSchedule', 'view', item)}
                    onDelete={(id) => onDelete('maintenanceSchedule', id)}
                />
            );
        case 'Mutasi Asset':
            return (
                <MutationTable
                    data={mutations}
                    onAdd={() => onOpenModal('mutation', 'create', { assetType: 'GENERAL_ASSET' })}
                    onEdit={(item) => onOpenModal('mutation', 'edit', item)}
                    onView={(item) => onOpenModal('mutation', 'view', item)}
                    onDelete={(id) => onDelete('mutation', id)}
                />
            );
        case 'Penjualan Asset':
            return (
                <SalesTable
                    data={sales}
                    onAdd={() => onOpenModal('sales', 'create', { assetType: 'GENERAL_ASSET' })}
                    onEdit={(item) => onOpenModal('sales', 'edit', item)}
                    onView={(item) => onOpenModal('sales', 'view', item)}
                    onDelete={(id) => onDelete('sales', id)}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default AssetPage;
