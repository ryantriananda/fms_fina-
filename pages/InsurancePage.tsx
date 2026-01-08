import React from 'react';
import { InsuranceDashboard } from '../components/InsuranceDashboard';
import { InsurancePolicyTable } from '../components/InsurancePolicyTable';
import { InsuranceClaimTable } from '../components/InsuranceClaimTable';
import { InsuranceProviderTable } from '../components/InsuranceProviderTable';
import { ReminderTable } from '../components/ReminderTable';
import { 
    InsuranceRecord, InsuranceProviderRecord, ReminderRecord 
} from '../types';

interface InsurancePageProps {
    activeItem: string;
    insurances: InsuranceRecord[];
    providers: InsuranceProviderRecord[];
    reminders: ReminderRecord[];
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
    onNavigate: (item: string) => void;
}

export const InsurancePage: React.FC<InsurancePageProps> = ({
    activeItem, insurances, providers, reminders,
    onOpenModal, onDelete, onNavigate
}) => {
    // Filter insurances by type
    const getFilteredInsurances = () => {
        switch (activeItem) {
            case 'Vehicle Insurance':
                return insurances.filter(i => i.assetType === 'Vehicle' || i.insuranceType === 'Vehicle');
            case 'Building Insurance':
                return insurances.filter(i => i.assetType === 'Building' || i.insuranceType === 'Building');
            case 'Asset Insurance':
                return insurances.filter(i => i.assetType === 'Asset' || i.insuranceType === 'Asset');
            case 'All Policies':
            default:
                return insurances;
        }
    };

    // Get expiring soon insurances
    const getExpiringSoon = () => {
        const today = new Date();
        const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        return insurances.filter(i => {
            const endDate = new Date(i.endDate);
            return endDate >= today && endDate <= thirtyDaysLater;
        });
    };

    switch (activeItem) {
        case 'Insurance Dashboard':
            return (
                <InsuranceDashboard
                    insurances={insurances}
                    providers={providers}
                    onNavigate={onNavigate}
                />
            );
        case 'All Policies':
        case 'Vehicle Insurance':
        case 'Building Insurance':
        case 'Asset Insurance':
            return (
                <InsurancePolicyTable
                    data={getFilteredInsurances()}
                    providers={providers}
                    onAdd={() => onOpenModal('insurance', 'create', { type: activeItem })}
                    onEdit={(item) => onOpenModal('insurance', 'edit', item)}
                    onView={(item) => onOpenModal('insurance', 'view', item)}
                    onDelete={(id) => onDelete('insurance', id)}
                />
            );
        case 'Claims':
            return (
                <InsuranceClaimTable
                    data={insurances.flatMap(i => i.claims || [])}
                    insurances={insurances}
                    onAdd={() => onOpenModal('insuranceClaim', 'create')}
                    onEdit={(item) => onOpenModal('insuranceClaim', 'edit', item)}
                    onView={(item) => onOpenModal('insuranceClaim', 'view', item)}
                    onDelete={(id) => onDelete('insuranceClaim', id)}
                />
            );
        case 'Insurance Providers':
            return (
                <InsuranceProviderTable
                    data={providers}
                    onAdd={() => onOpenModal('insuranceProvider', 'create')}
                    onEdit={(item) => onOpenModal('insuranceProvider', 'edit', item)}
                    onView={(item) => onOpenModal('insuranceProvider', 'view', item)}
                    onDelete={(id) => onDelete('insuranceProvider', id)}
                />
            );
        case 'Expiring Soon':
            return (
                <InsurancePolicyTable
                    data={getExpiringSoon()}
                    providers={providers}
                    title="Expiring Soon (30 Days)"
                    onAdd={() => onOpenModal('insuranceReminder', 'create')}
                    onEdit={(item) => onOpenModal('insurance', 'edit', item)}
                    onView={(item) => onOpenModal('insurance', 'view', item)}
                    onDelete={(id) => onDelete('insurance', id)}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default InsurancePage;
