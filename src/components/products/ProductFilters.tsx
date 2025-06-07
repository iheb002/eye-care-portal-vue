
import React from 'react';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option>Toutes catégories</option>
      <option>Montres optique</option>
      <option>Lentille</option>
      <option>Verre</option>
      <option>Monture Solaire</option>
    </select>
  );
};

export default ProductFilters;
