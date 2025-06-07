
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OrdonnanceCard from './OrdonnanceCard';
import TablePagination from '../shared/TablePagination';

interface Ordonnance {
  id: string;
  numeroOrdonnance: string;
  client: string;
  dateCreation: string;
  dateValidite: string;
  medecin: string;
  statut: string;
  type: string;
}

interface OrdonnanceTableViewProps {
  ordonnances: Ordonnance[];
  totalCount: number;
  onView: (ordonnance: Ordonnance) => void;
  onEdit: (ordonnance: Ordonnance) => void;
  onDelete: (id: string) => void;
}

const OrdonnanceTableView: React.FC<OrdonnanceTableViewProps> = ({
  ordonnances,
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
              <TableHead className="font-semibold whitespace-nowrap">N° ORDONNANCE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">CLIENT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE DE CRÉATION</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE DE VALIDITÉ</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">MÉDECIN</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">TYPE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">STATUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordonnances.map((ordonnance) => (
              <OrdonnanceCard
                key={ordonnance.id}
                ordonnance={ordonnance}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentCount={ordonnances.length}
        totalCount={totalCount}
        itemName="ordonnances"
      />
    </>
  );
};

export default OrdonnanceTableView;
