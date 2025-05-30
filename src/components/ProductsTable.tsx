
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
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category: 'Montres optique' | 'Lentille' | 'Verre' | 'Monture Solaire';
  kind: 'Accessoire' | 'Lentille' | 'Lunette';
  createdAt: string;
  
  // Champs pour Accessoire
  type?: string;
  compatibilite?: string;
  
  // Champs pour Lentille
  dioptrie?: number;
  dureeVie?: string;
  couleur?: string;
  
  // Champs pour Lunette
  forme?: string;
  matiere?: string;
  genre?: 'Homme' | 'Femme' | 'Enfant' | 'Mixte';
  model3d?: string;
}

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes catégories');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Données d'exemple basées sur la nouvelle structure
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Monture Ray-Ban',
      description: 'Monture élégante pour usage quotidien',
      price: 450,
      stock: 25,
      category: 'Monture Solaire',
      kind: 'Lunette',
      type: 'Solaire',
      couleur: 'Noir',
      forme: 'Aviateur',
      matiere: 'Métal',
      genre: 'Mixte',
      createdAt: '2023-05-15T00:00:00Z'
    },
    {
      id: '2',
      name: 'Verres progressifs Essilor',
      description: 'Verres de haute qualité pour presbytie',
      price: 320,
      stock: 15,
      category: 'Verre',
      kind: 'Accessoire',
      type: 'Progressif',
      compatibilite: 'Toutes montures',
      createdAt: '2023-06-20T00:00:00Z'
    },
    {
      id: '3',
      name: 'Lentilles Acuvue',
      description: 'Lentilles journalières confortables',
      price: 28,
      stock: 100,
      category: 'Lentille',
      kind: 'Lentille',
      type: 'souple',
      dioptrie: -2.5,
      dureeVie: '1 jour',
      couleur: 'Transparent',
      createdAt: '2023-07-10T00:00:00Z'
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes catégories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (data: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
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
      description: `${product.name} - ${product.price} DT`,
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
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">CATÉGORIE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">TYPE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">PRIX</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">STOCK</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE</TableHead>
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
