
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProductCard from './ProductCard';
import TablePagination from '../shared/TablePagination';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category: 'Montres optique' | 'Lentille' | 'Verre' | 'Monture Solaire';
  kind: 'Accessoire' | 'Lentille' | 'Lunette';
  createdAt: string;
  type?: string;
  compatibilite?: string;
  dioptrie?: number;
  dureeVie?: string;
  couleur?: string;
  forme?: string;
  matiere?: string;
  genre?: 'Homme' | 'Femme' | 'Enfant' | 'Mixte';
  model3d?: string;
}

interface ProductTableViewProps {
  products: Product[];
  totalCount: number;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTableView: React.FC<ProductTableViewProps> = ({
  products,
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
              <TableHead className="font-semibold whitespace-nowrap">NOM</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">CATÉGORIE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">TYPE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">PRIX</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">STOCK</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentCount={products.length}
        totalCount={totalCount}
        itemName="produits"
      />
    </>
  );
};

export default ProductTableView;
