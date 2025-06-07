
import React from 'react';
import { Eye, Edit, Trash } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onEdit, onDelete }) => {
  const getKindColor = (kind: string) => {
    switch (kind) {
      case 'Accessoire':
        return 'bg-blue-100 text-blue-800';
      case 'Lentille':
        return 'bg-green-100 text-green-800';
      case 'Lunette':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-gray-500 md:hidden">{product.category}</div>
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell">{product.category}</TableCell>
      <TableCell className="hidden md:table-cell">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKindColor(product.kind)}`}>
          {product.kind}
        </span>
      </TableCell>
      <TableCell>{product.price} DT</TableCell>
      <TableCell className="hidden xl:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden lg:table-cell">{formatDate(product.createdAt)}</TableCell>
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
