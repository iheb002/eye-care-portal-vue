
import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes catégories');

  // Données d'exemple basées sur l'image
  const products: Product[] = [
    {
      id: '1',
      nom: 'Monture Ray-Ban',
      dateAjout: '2023-05-15',
      reference: 'RB001',
      categorie: 'montures solaires',
      marque: 'Ray-Ban',
      statut: 'promotion exclusive',
      prixUnitaire: 450,
      remise: 10
    },
    {
      id: '2',
      nom: 'Verres progressifs Essilor',
      dateAjout: '2023-06-20',
      reference: 'ESS123',
      categorie: 'verres',
      marque: 'Essilor',
      statut: 'standard',
      prixUnitaire: 320
    },
    {
      id: '3',
      nom: 'Monture Oakley Sport',
      dateAjout: '2023-07-10',
      reference: 'OAK456',
      categorie: 'montures sport',
      marque: 'Oakley',
      statut: 'nouveau',
      prixUnitaire: 280,
      remise: 5
    }
  ];

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Produits</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter Produit
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher un produit ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>Toutes catégories</option>
          <option>montures solaires</option>
          <option>verres</option>
          <option>montures sport</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">NOM</TableHead>
              <TableHead className="font-semibold">DATE D'AJOUT</TableHead>
              <TableHead className="font-semibold">RÉFÉRENCE</TableHead>
              <TableHead className="font-semibold">CATÉGORIE</TableHead>
              <TableHead className="font-semibold">MARQUE</TableHead>
              <TableHead className="font-semibold">STATUT</TableHead>
              <TableHead className="font-semibold">PRIX UNITAIRE</TableHead>
              <TableHead className="font-semibold">REMISE</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{product.nom}</TableCell>
                <TableCell>{product.dateAjout}</TableCell>
                <TableCell>{product.reference}</TableCell>
                <TableCell>{product.categorie}</TableCell>
                <TableCell>{product.marque}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.statut)}`}>
                    {product.statut}
                  </span>
                </TableCell>
                <TableCell>{product.prixUnitaire} DT</TableCell>
                <TableCell>
                  {product.remise ? `${product.remise}%` : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-700">
          Affichage de 1 à {filteredProducts.length} sur {products.length} produits
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
    </div>
  );
};

export default ProductsTable;
