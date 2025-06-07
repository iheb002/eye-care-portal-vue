
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import ActionButtons from '../shared/ActionButtons';
import StatusBadge from '../shared/StatusBadge';

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

interface OrdonnanceCardProps {
  ordonnance: Ordonnance;
  onView: (ordonnance: Ordonnance) => void;
  onEdit: (ordonnance: Ordonnance) => void;
  onDelete: (id: string) => void;
}

const OrdonnanceCard: React.FC<OrdonnanceCardProps> = ({ ordonnance, onView, onEdit, onDelete }) => {
  const getStatusVariant = (statut: string) => {
    switch (statut) {
      case 'Valide':
        return 'success';
      case 'Expire bientôt':
        return 'warning';
      case 'Expiré':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{ordonnance.numeroOrdonnance}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{ordonnance.client}</div>
          <div className="text-sm text-gray-500 md:hidden">{ordonnance.medecin}</div>
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell">{ordonnance.dateCreation}</TableCell>
      <TableCell className="hidden lg:table-cell">{ordonnance.dateValidite}</TableCell>
      <TableCell className="hidden md:table-cell">{ordonnance.medecin}</TableCell>
      <TableCell className="hidden xl:table-cell">{ordonnance.type}</TableCell>
      <TableCell>
        <StatusBadge 
          status={ordonnance.statut} 
          variant={getStatusVariant(ordonnance.statut)} 
        />
      </TableCell>
      <TableCell>
        <ActionButtons
          onView={() => onView(ordonnance)}
          onEdit={() => onEdit(ordonnance)}
          onDelete={() => onDelete(ordonnance.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default OrdonnanceCard;
