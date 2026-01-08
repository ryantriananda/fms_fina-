import React from 'react';
import { LogBookTable } from '../components/LogBookTable';
import { TimesheetTable } from '../components/TimesheetTable';
import { VendorTable } from '../components/VendorTable';
import { MasterVendorTable } from '../components/MasterVendorTable';
import { UserTable } from '../components/UserTable';
import { MasterApprovalTable } from '../components/MasterApprovalTable';
import { GeneralMasterTable } from '../components/GeneralMasterTable';
import { 
    LogBookRecord, TimesheetRecord, VendorRecord, UserRecord, 
    MasterApprovalRecord, GeneralMasterItem 
} from '../types';

interface AdminPageProps {
    activeItem: string;
    logBooks: LogBookRecord[];
    timesheets: TimesheetRecord[];
    vendors: VendorRecord[];
    users: UserRecord[];
    masterApprovals: MasterApprovalRecord[];
    masterDataMap: Record<string, GeneralMasterItem[]>;
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
    onOpenImport: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
    activeItem, logBooks, timesheets, vendors, users, masterApprovals, masterDataMap,
    onOpenModal, onDelete, onOpenImport
}) => {
    // Check if it's a general master data page
    if (masterDataMap[activeItem]) {
        return (
            <GeneralMasterTable
                data={masterDataMap[activeItem]}
                title={activeItem}
                onAdd={() => onOpenModal('generalMaster', 'create', { category: activeItem })}
                onEdit={(item) => onOpenModal('generalMaster', 'edit', { ...item, category: activeItem })}
                onDelete={(id) => onDelete('generalMaster', id)}
                onImport={onOpenImport}
            />
        );
    }

    switch (activeItem) {
        case 'Log Book':
            return (
                <LogBookTable
                    data={logBooks}
                    onAdd={() => onOpenModal('logBook', 'create')}
                    onEdit={(item) => onOpenModal('logBook', 'edit', item)}
                    onView={(item) => onOpenModal('logBook', 'view', item)}
                    onDelete={(id) => onDelete('logBook', id)}
                    onCheckOut={(item) => onOpenModal('logBook', 'edit', { ...item, isCheckOut: true })}
                />
            );
        case 'Timesheet':
            return (
                <TimesheetTable
                    data={timesheets}
                    onAdd={() => onOpenModal('timesheet', 'create')}
                    onEdit={(item) => onOpenModal('timesheet', 'edit', item)}
                    onView={(item) => onOpenModal('timesheet', 'view', item)}
                    onDelete={(id) => onDelete('timesheet', id)}
                />
            );
        case 'Vendor':
            return (
                <VendorTable
                    data={vendors}
                    onAdd={() => onOpenModal('vendor', 'create')}
                    onEdit={(item) => onOpenModal('vendor', 'edit', item)}
                    onView={(item) => onOpenModal('vendor', 'view', item)}
                    onDelete={(id) => onDelete('vendor', id)}
                />
            );
        case 'Master Vendor':
            return (
                <MasterVendorTable
                    data={vendors}
                    onAdd={() => onOpenModal('vendor', 'create')}
                    onEdit={(item) => onOpenModal('vendor', 'edit', item)}
                    onDelete={(id) => onDelete('vendor', id)}
                />
            );
        case 'Manajemen User':
            return (
                <UserTable
                    data={users}
                    onAdd={() => onOpenModal('user', 'create')}
                    onEdit={(item) => onOpenModal('user', 'edit', item)}
                    onView={(item) => onOpenModal('user', 'view', item)}
                    onDelete={(id) => onDelete('user', id)}
                />
            );
        case 'Master Approval':
            return (
                <MasterApprovalTable
                    data={masterApprovals}
                    users={users}
                    onAdd={() => onOpenModal('masterApproval', 'create')}
                    onEdit={(item) => onOpenModal('masterApproval', 'edit', item)}
                    onDelete={(id) => onDelete('masterApproval', id)}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default AdminPage;
