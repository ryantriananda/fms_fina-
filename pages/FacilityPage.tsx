import React from 'react';
import { PodRequestTable } from '../components/PodRequestTable';
import { PodApprovalTable } from '../components/PodApprovalTable';
import { MasterPodTable } from '../components/MasterPodTable';
import { TenantPodTable } from '../components/TenantPodTable';
import { LockerTable } from '../components/LockerTable';
import { LockerRequestTable } from '../components/LockerRequestTable';
import { 
    PodRequestRecord, MasterPodRecord, TenantPodRecord, 
    LockerRecord, LockerRequestRecord 
} from '../types';

interface FacilityPageProps {
    activeItem: string;
    podRequests: PodRequestRecord[];
    masterPods: MasterPodRecord[];
    tenantPods: TenantPodRecord[];
    lockers: LockerRecord[];
    lockerRequests: LockerRequestRecord[];
    userRole: 'Admin' | 'Staff' | 'Officer';
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
    onWorkflow: (item: any, action: 'Approve' | 'Reject' | 'Revise', module: 'ATK' | 'ARK' | 'LOCKER' | 'OPNAME') => void;
}

export const FacilityPage: React.FC<FacilityPageProps> = ({
    activeItem, podRequests, masterPods, tenantPods, lockers, lockerRequests, userRole,
    onOpenModal, onDelete, onWorkflow
}) => {
    switch (activeItem) {
        case 'Pod Request':
            return (
                <PodRequestTable
                    data={podRequests}
                    masterPods={masterPods}
                    onAdd={() => onOpenModal('podRequest', 'create')}
                    onEdit={(item) => onOpenModal('podRequest', 'edit', item)}
                    onView={(item) => onOpenModal('podRequest', 'view', item)}
                    onDelete={(id) => onDelete('podRequest', id)}
                />
            );
        case 'Pod Approval':
            return (
                <PodApprovalTable
                    data={podRequests.filter(r => r.status === 'Waiting Approval')}
                    masterPods={masterPods}
                    onApprove={(item) => onOpenModal('podApproval', 'view', { ...item, action: 'approve' })}
                    onReject={(item) => onOpenModal('podApproval', 'view', { ...item, action: 'reject' })}
                />
            );
        case 'Master Pod':
            return (
                <MasterPodTable
                    data={masterPods}
                    onAdd={() => onOpenModal('masterPod', 'create')}
                    onEdit={(item) => onOpenModal('masterPod', 'edit', item)}
                    onView={(item) => onOpenModal('masterPod', 'view', item)}
                    onDelete={(id) => onDelete('masterPod', id)}
                />
            );
        case 'Tenant Pod':
            return (
                <TenantPodTable
                    data={tenantPods}
                    masterPods={masterPods}
                    onAdd={() => onOpenModal('tenantPod', 'create')}
                    onEdit={(item) => onOpenModal('tenantPod', 'edit', item)}
                    onView={(item) => onOpenModal('tenantPod', 'view', item)}
                    onDelete={(id) => onDelete('tenantPod', id)}
                />
            );
        case 'Daftar Loker':
            return (
                <LockerTable
                    data={lockers}
                    onAdd={() => onOpenModal('locker', 'create')}
                    onEdit={(item) => onOpenModal('locker', 'edit', item)}
                    onView={(item) => onOpenModal('locker', 'view', item)}
                    onDelete={(id) => onDelete('locker', id)}
                />
            );
        case 'Locker Request':
            return (
                <LockerRequestTable
                    data={lockerRequests}
                    lockers={lockers}
                    userRole={userRole}
                    onAdd={() => onOpenModal('lockerRequest', 'create')}
                    onEdit={(item) => onOpenModal('lockerRequest', 'edit', item)}
                    onView={(item) => onOpenModal('lockerRequest', 'view', item)}
                    onDelete={(id) => onDelete('lockerRequest', id)}
                    onApprove={(item) => onWorkflow(item, 'Approve', 'LOCKER')}
                    onReject={(item) => onWorkflow(item, 'Reject', 'LOCKER')}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default FacilityPage;
