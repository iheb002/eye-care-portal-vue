
import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './forms/ProductForm';
import ProductCard from './products/ProductCard';
import ProductFilters from './products/ProductFilters';
import ProductActions from './products/ProductActions';
import ProductPagination from './products/ProductPagination';

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

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Produits</h2>
        <ProductActions
          isAddDialogOpen={isAddDialogOpen}
          onAddDialogChange={setIsAddDialogOpen}
          onAddProduct={handleAddProduct}
        />
      </div>

      {/* Search and Filter */}
      <ProductFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

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
              <ProductCard
                key={product.id}
                product={product}
                onView={handleViewProduct}
                onEdit={handleEditClick}
                onDelete={handleDeleteProduct}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <ProductPagination
        currentCount={filteredProducts.length}
        totalCount={products.length}
      />

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
