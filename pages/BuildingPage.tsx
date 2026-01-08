import React from 'react';
import { BuildingTable } from '../components/BuildingTable';
import { UtilityTable } from '../components/UtilityTable';
import { ReminderTable } from '../components/ReminderTable';
import { BuildingMaintenanceTable } from '../components/BuildingMaintenanceTable';
import { 
    BuildingRecord, UtilityRecord, ReminderRecord, BuildingMaintenanceRecord 
} from '../types';

interface BuildingPageProps {
    activeItem: string;
    buildings: BuildingRecord[];
    utilities: UtilityRecord[];
    complianceDocs: ReminderRecord[];
    maintenances: BuildingMaintenanceRecord[];
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
}

export const BuildingPage: React.FC<BuildingPageProps> = ({
    activeItem, buildings, utilities, complianceDocs, maintenances,
    onOpenModal, onDelete
}) => {
    switch (activeItem) {
        case 'Daftar Gedung':
            return (
                <BuildingTable
                    data={buildings}
                    onAdd={() => onOpenModal('building', 'create')}
                    onEdit={(item) => onOpenModal('building', 'edit', item)}
                    onView={(item) => onOpenModal('building', 'view', item)}
                    onDelete={(id) => onDelete('building', id)}
                />
            );
        case 'Utility Monitoring':
            return (
                <UtilityTable
                    data={utilities}
                    buildings={buildings}
                    onAdd={() => onOpenModal('utility', 'create')}
                    onEdit={(item) => onOpenModal('utility', 'edit', item)}
                    onView={(item) => onOpenModal('utility', 'view', item)}
                    onDelete={(id) => onDelete('utility', id)}
                />
            );
        case 'Compliance & Legal':
            return (
                <ReminderTable
                    data={complianceDocs}
                    buildings={buildings}
                    onAdd={() => onOpenModal('compliance', 'create')}
                    onEdit={(item) => onOpenModal('compliance', 'edit', item)}
                    onView={(item) => onOpenModal('compliance', 'view', item)}
                    onDelete={(id) => onDelete('compliance', id)}
                />
            );
        case 'Branch Improvement':
            return (
                <BuildingMaintenanceTable
                    data={maintenances}
                    buildings={buildings}
                    onAdd={() => onOpenModal('buildingMaintenance', 'create')}
                    onEdit={(item) => onOpenModal('buildingMaintenance', 'edit', item)}
                    onView={(item) => onOpenModal('buildingMaintenance', 'view', item)}
                    onDelete={(id) => onDelete('buildingMaintenance', id)}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default BuildingPage;
