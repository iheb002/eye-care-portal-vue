
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ClientCard from './ClientCard';
import TablePagination from '../shared/TablePagination';

interface Client {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address?: string;
  actif: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface ClientTableViewProps {
  clients: Client[];
  totalCount: number;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientTableView: React.FC<ClientTableViewProps> = ({
  clients,
  totalCount,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold whitespace-nowrap">NOM COMPLET</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">EMAIL</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">TÉLÉPHONE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">ADRESSE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">DATE D'INSCRIPTION</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">STATUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentCount={clients.length}
        totalCount={totalCount}
        itemName="clients"
      />
    </>
  );
};

export default ClientTableView;
