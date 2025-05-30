
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useProductsApi } from '@/hooks/useApi';
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
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const { getProducts, createProduct, updateProduct, deleteProduct, loading } = useProductsApi();

  // Charger les produits depuis l'API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Loading products from API...');
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
        // Utiliser des données d'exemple si l'API échoue
        setProducts([
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
      }
    };

    loadProducts();
  }, [getProducts]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes catégories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (data: any) => {
    try {
      console.log('Adding product with data:', data);
      const newProduct = await createProduct(data);
      setProducts([...products, newProduct]);
      setIsAddDialogOpen(false);
      toast({
        title: 'Produit ajouté',
        description: 'Le produit a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Failed to add product:', error);
      // Fallback pour le mode hors ligne
      const newProduct: Product = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
      setIsAddDialogOpen(false);
      toast({
        title: 'Produit ajouté (hors ligne)',
        description: 'Le produit a été ajouté localement.',
      });
    }
  };

  const handleEditProduct = async (data: any) => {
    if (selectedProduct) {
      try {
        console.log('Updating product with data:', data);
        const updatedProduct = await updateProduct(selectedProduct.id, data);
        const updatedProducts = products.map(product =>
          product.id === selectedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setIsEditDialogOpen(false);
        setSelectedProduct(null);
        toast({
          title: 'Produit modifié',
          description: 'Le produit a été modifié avec succès.',
        });
      } catch (error) {
        console.error('Failed to update product:', error);
        // Fallback pour le mode hors ligne
        const updatedProducts = products.map(product =>
          product.id === selectedProduct.id ? { ...product, ...data } : product
        );
        setProducts(updatedProducts);
        setIsEditDialogOpen(false);
        setSelectedProduct(null);
        toast({
          title: 'Produit modifié (hors ligne)',
          description: 'Le produit a été modifié localement.',
        });
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      console.log('Deleting product with id:', id);
      await deleteProduct(id);
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      toast({
        title: 'Produit supprimé',
        description: 'Le produit a été supprimé avec succès.',
        variant: 'destructive',
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
      // Fallback pour le mode hors ligne
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      toast({
        title: 'Produit supprimé (hors ligne)',
        description: 'Le produit a été supprimé localement.',
        variant: 'destructive',
      });
    }
  };

  const handleViewProduct = (product: Product) => {
    console.log('Viewing product:', product);
    toast({
      title: 'Affichage du produit',
      description: `${product.name} - ${product.price} DT`,
    });
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  if (loading && products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des produits...</p>
          </div>
        </div>
      </div>
    );
  }

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
