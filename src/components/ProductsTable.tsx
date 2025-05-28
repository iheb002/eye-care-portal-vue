
import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './forms/ProductForm';

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Données d'exemple basées sur l'image
  const [products, setProducts] = useState<Product[]>([
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
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes catégories' || product.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleAddProduct = (data: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      dateAjout: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    toast({
      title: 'Produit ajouté',
      description: 'Le produit a été ajouté avec succès.',
    });
  };

  const handleEditProduct = (data: any) => {
    if (selectedProduct) {
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id ? { ...product, ...data } : product
      );
      setProducts(updatedProducts);
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      toast({
        title: 'Produit modifié',
        description: 'Le produit a été modifié avec succès.',
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast({
      title: 'Produit supprimé',
      description: 'Le produit a été supprimé avec succès.',
      variant: 'destructive',
    });
  };

  const handleViewProduct = (product: Product) => {
    toast({
      title: 'Affichage du produit',
      description: `${product.nom} - ${product.reference}`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Produits</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau produit</DialogTitle>
            </DialogHeader>
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
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
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <TableHead className="font-semibold whitespace-nowrap">NOM</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE D'AJOUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">RÉFÉRENCE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">CATÉGORIE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">MARQUE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">STATUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">PRIX</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">REMISE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
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
                      onClick={() => handleViewProduct(product)}
                      className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                      title="Voir"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditDialogOpen(true);
                      }}
                      className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      title="Supprimer"
                    >
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSubmit={handleEditProduct}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedProduct(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsTable;
