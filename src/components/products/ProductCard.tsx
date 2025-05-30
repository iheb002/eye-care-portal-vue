
import React from 'react';
import { Eye, Edit, Trash } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';

interface Product {
  id: string;
  nom: string;
  dateAjout: string;
  reference: string;
  categorie: string;
  marque: string;
  statut: string;
  prixUnitaire: number;
  remise?: number;
}

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onEdit, onDelete }) => {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'promotion exclusive':
        return 'bg-purple-100 text-purple-800';
      case 'standard':
        return 'bg-gray-100 text-gray-800';
      case 'nouveau':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">
        <div>
          <div className="font-medium">{product.nom}</div>
          <div className="text-sm text-gray-500 md:hidden">{product.categorie}</div>
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell">{product.dateAjout}</TableCell>
      <TableCell>{product.reference}</TableCell>
      <TableCell className="hidden md:table-cell">{product.categorie}</TableCell>
      <TableCell className="hidden lg:table-cell">{product.marque}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.statut)}`}>
          {product.statut}
        </span>
      </TableCell>
      <TableCell>{product.prixUnitaire} DT</TableCell>
      <TableCell className="hidden xl:table-cell">
        {product.remise ? `${product.remise}%` : '-'}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onView(product)}
            className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
            title="Voir"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onEdit(product)}
            className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
            title="Modifier"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
            title="Supprimer"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductCard;
