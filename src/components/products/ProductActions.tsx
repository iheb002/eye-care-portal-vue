
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProductForm from '../forms/ProductForm';

interface ProductActionsProps {
  isAddDialogOpen: boolean;
  onAddDialogChange: (open: boolean) => void;
  onAddProduct: (data: any) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isAddDialogOpen,
  onAddDialogChange,
  onAddProduct
}) => {
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={onAddDialogChange}>
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
          onSubmit={onAddProduct}
          onCancel={() => onAddDialogChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductActions;
