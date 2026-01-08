import React from 'react';
import { StationeryRequestTable } from '../components/StationeryRequestTable';
import { MasterAtkTable } from '../components/MasterAtkTable';
import { StockOpnameTable } from '../components/StockOpnameTable';
import { MasterDeliveryLocationTable } from '../components/MasterDeliveryLocationTable';
import { MasterRequestTypeTable } from '../components/MasterRequestTypeTable';
import { 
    AssetRecord, MasterItem, StockOpnameRecord, DeliveryLocationRecord, RequestTypeRecord 
} from '../types';

interface ConsumablePageProps {
    activeItem: string;
    atkRequests: AssetRecord[];
    arkRequests: AssetRecord[];
    masterAtk: MasterItem[];
    masterArk: MasterItem[];
    stockOpnames: StockOpnameRecord[];
    deliveryLocations: DeliveryLocationRecord[];
    requestTypes: RequestTypeRecord[];
    userRole: 'Admin' | 'Staff' | 'Officer';
    onOpenModal: (type: string, mode: 'create' | 'edit' | 'view' | 'approve', data?: any) => void;
    onDelete: (type: string, id: string | number) => void;
    onWorkflow: (item: any, action: 'Approve' | 'Reject' | 'Revise', module: 'ATK' | 'ARK' | 'LOCKER' | 'OPNAME') => void;
}

export const ConsumablePage: React.FC<ConsumablePageProps> = ({
    activeItem, atkRequests, arkRequests, masterAtk, masterArk, stockOpnames,
    deliveryLocations, requestTypes, userRole,
    onOpenModal, onDelete, onWorkflow
}) => {
    switch (activeItem) {
        case 'Request ATK':
            return (
                <StationeryRequestTable
                    data={atkRequests}
                    masterItems={masterAtk}
                    type="ATK"
                    userRole={userRole}
                    onAdd={() => onOpenModal('atkRequest', 'create')}
                    onEdit={(item) => onOpenModal('atkRequest', 'edit', item)}
                    onView={(item) => onOpenModal('atkRequest', 'view', item)}
                    onDelete={(id) => onDelete('atkRequest', id)}
                    onApprove={(item) => onWorkflow(item, 'Approve', 'ATK')}
                    onReject={(item) => onWorkflow(item, 'Reject', 'ATK')}
                />
            );
        case 'Master ATK':
            return (
                <MasterAtkTable
                    data={masterAtk}
                    type="ATK"
                    onAdd={() => onOpenModal('masterAtk', 'create')}
                    onEdit={(item) => onOpenModal('masterAtk', 'edit', item)}
                    onView={(item) => onOpenModal('masterAtk', 'view', item)}
                    onDelete={(id) => onDelete('masterAtk', id)}
                    onAddStock={(item) => onOpenModal('addStock', 'create', item)}
                />
            );
        case 'Request ARK':
            return (
                <StationeryRequestTable
                    data={arkRequests}
                    masterItems={masterArk}
                    type="ARK"
                    userRole={userRole}
                    onAdd={() => onOpenModal('arkRequest', 'create')}
                    onEdit={(item) => onOpenModal('arkRequest', 'edit', item)}
                    onView={(item) => onOpenModal('arkRequest', 'view', item)}
                    onDelete={(id) => onDelete('arkRequest', id)}
                    onApprove={(item) => onWorkflow(item, 'Approve', 'ARK')}
                    onReject={(item) => onWorkflow(item, 'Reject', 'ARK')}
                />
            );
        case 'Master ARK':
            return (
                <MasterAtkTable
                    data={masterArk}
                    type="ARK"
                    onAdd={() => onOpenModal('masterArk', 'create')}
                    onEdit={(item) => onOpenModal('masterArk', 'edit', item)}
                    onView={(item) => onOpenModal('masterArk', 'view', item)}
                    onDelete={(id) => onDelete('masterArk', id)}
                    onAddStock={(item) => onOpenModal('addStock', 'create', item)}
                />
            );
        case 'Stock Opname':
        case 'Input Stock Opname':
            return (
                <StockOpnameTable
                    data={stockOpnames}
                    masterItems={[...masterAtk, ...masterArk]}
                    userRole={userRole}
                    onAdd={() => onOpenModal('stockOpname', 'create')}
                    onView={(item) => onOpenModal('stockOpname', 'view', item)}
                    onApprove={(item) => onOpenModal('stockOpname', 'approve', item)}
                />
            );
        case 'Master Delivery Location':
            return (
                <MasterDeliveryLocationTable
                    data={deliveryLocations}
                    onAdd={() => onOpenModal('deliveryLocation', 'create')}
                    onEdit={(item) => onOpenModal('deliveryLocation', 'edit', item)}
                    onDelete={(id) => onDelete('deliveryLocation', id)}
                />
            );
        case 'Master Request Type':
            return (
                <MasterRequestTypeTable
                    data={requestTypes}
                    onAdd={() => onOpenModal('requestType', 'create')}
                    onEdit={(item) => onOpenModal('requestType', 'edit', item)}
                    onDelete={(id) => onDelete('requestType', id)}
                />
            );
        default:
            return <div className="p-8 text-gray-500">Select a menu item</div>;
    }
};

export default ConsumablePage;
