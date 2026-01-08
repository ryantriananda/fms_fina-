import React from 'react';
import { VehicleTable } from '../components/VehicleTable';
import { VehicleContractTable } from '../components/VehicleContractTable';
import { ServiceTable } from '../components/ServiceTable';
import { TaxKirTable } from '../components/TaxKirTable';
import { VehicleReminderTable } from '../components/VehicleReminderTable';
import { MutationTable } from '../components/MutationTable';
import { SalesTable } from '../components/SalesTable';
import { 
    VehicleRecord, VehicleContractRecord, ServiceRecord, 
    TaxKirRecord, VehicleReminderRecord, MutationRecord, SalesRecord 
} from '../types';

interface VehiclePageProps {
    activeItem: string;
    vehicles: VehicleRecord[];
    contracts: VehicleContractRecord[];
    services: ServiceRecord[];
    taxes: TaxKirRecord[];
    reminders: VehicleReminderRecord[];
    mutations: MutationRecord[];
    sales: SalesRecord[];
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
}

export const VehiclePage: React.FC<VehiclePageProps> = ({
    activeItem, vehicles, contracts, services, taxes, reminders, mutations, sales,
    onOpenModal, onDelete
}) => {
    switch (activeItem) {
        case 'Daftar Kendaraan':
            return (
                <VehicleTable
                    data={vehicles}
                    onAdd={() => onOpenModal('vehicle', 'create')}
                    onEdit={(item) => onOpenModal('vehicle', 'edit', item)}
                    onView={(item) => onOpenModal('vehicle', 'view', item)}
                    onDelete={(id) => onDelete('vehicle', id)}
                />
            );
        case 'Kontrak Kendaraan':
            return (
                <VehicleContractTable
                    data={contracts}
                    vehicles={vehicles}
                    onAdd={() => onOpenModal('vehicleContract', 'create')}
                    onEdit={(item) => onOpenModal('vehicleContract', 'edit', item)}
                    onView={(item) => onOpenModal('vehicleContract', 'view', item)}
                    onDelete={(id) => onDelete('vehicleContract', id)}
                />
            );
        case 'Servis':
            return (
                <ServiceTable
                    data={services}
                    vehicles={vehicles}
                    onAdd={() => onOpenModal('service', 'create')}
                    onEdit={(item) => onOpenModal('service', 'edit', item)}
                    onView={(item) => onOpenModal('service', 'view', item)}
                    onDelete={(id) => onDelete('service', id)}
                />
            );
        case 'Pajak & KIR':
            return (
                <TaxKirTable
                    data={taxes}
                    vehicles={vehicles}
                    onAdd={() => onOpenModal('taxKir', 'create')}
                    onEdit={(item) => onOpenModal('taxKir', 'edit', item)}
                    onView={(item) => onOpenModal('taxKir', 'view', item)}
                    onDelete={(id) => onDelete('taxKir', id)}
                />
            );
        case 'Reminder Kendaraan':
            return (
                <VehicleReminderTable
                    data={reminders}
                    vehicles={vehicles}
                    onAdd={() => onOpenModal('vehicleReminder', 'create')}
                    onEdit={(item) => onOpenModal('vehicleReminder', 'edit', item)}
                    onDelete={(id) => onDelete('vehicleReminder', id)}
                />
            );
        case 'Mutasi Kendaraan':
            return (
                <MutationTable
                    data={mutations}
                    onAdd={() => onOpenModal('mutation', 'create', { assetType: 'VEHICLE' })}
                    onEdit={(item) => onOpenModal('mutation', 'edit', item)}
                    onView={(item) => onOpenModal('mutation', 'view', item)}
                    onDelete={(id) => onDelete('mutation', id)}
                />
            );
        case 'Penjualan Kendaraan':
            return (
                <SalesTable
                    data={sales}
                    onAdd={() => onOpenModal('sales', 'create', { assetType: 'VEHICLE' })}
                    onEdit={(item) => onOpenModal('sales', 'edit', item)}
                    onView={(item) => onOpenModal('sales', 'view', item)}
                    onDelete={(id) => onDelete('sales', id)}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default VehiclePage;
