
import React from 'react';

interface ProductPaginationProps {
  currentCount: number;
  totalCount: number;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({ currentCount, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-700">
        Affichage de 1 à {currentCount} sur {totalCount} produits
      </p>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
          Précédent
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">
          1
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;
