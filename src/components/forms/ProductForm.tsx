
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const productSchema = z.object({
  nom: z.string().min(1, 'Le nom du produit est requis'),
  description: z.string().optional(),
  reference: z.string().min(1, 'Ce champ est obligatoire'),
  dateAjout: z.string().min(1, 'La date d\'ajout est requise'),
  categorie: z.string().min(1, 'La catégorie est requise'),
  marque: z.string().min(1, 'La marque est requise'),
  prixUnitaire: z.number().min(0, 'Ce champ est obligatoire'),
  statut: z.enum(['Standard', 'promotion exclusive', 'nouveau']),
  remise: z.number().min(0).max(100).optional(),
  image: z.any().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id?: string;
  nom: string;
  description?: string;
  dateAjout?: string;
  reference: string;
  categorie: string;
  marque: string;
  statut: string;
  prixUnitaire: number;
  remise?: number;
  image?: any;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, isLoading = false }) => {
  const { toast } = useToast();
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nom: product?.nom || '',
      description: product?.description || '',
      reference: product?.reference || '',
      dateAjout: product?.dateAjout || new Date().toISOString().split('T')[0],
      categorie: product?.categorie || '',
      marque: product?.marque || '',
      statut: (product?.statut as 'Standard' | 'promotion exclusive' | 'nouveau') || 'Standard',
      prixUnitaire: product?.prixUnitaire || 0,
      remise: product?.remise || 0,
    },
  });

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (product?.id) {
        // Update existing product
        const response = await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la modification du produit');
        }
        
        const updatedProduct = await response.json();
        onSubmit(updatedProduct);
        
        toast({
          title: 'Produit modifié',
          description: 'Le produit a été modifié avec succès.',
        });
      } else {
        // Create new product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            dateAjout: new Date().toISOString().split('T')[0],
          }),
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la création du produit');
        }
        
        const newProduct = await response.json();
        onSubmit(newProduct);
        
        toast({
          title: 'Produit ajouté',
          description: 'Le produit a été ajouté avec succès.',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4">
        {/* Nom du Produit */}
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Nom du Produit :</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={isLoading}
                  className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Description :</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  disabled={isLoading}
                  className="w-full min-h-[80px] border border-gray-300 rounded-md px-3 py-2 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Référence et Date d'Ajout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Référence :</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={isLoading}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm">
                  Ce champ est obligatoire.
                </FormMessage>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dateAjout"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Date d'Ajout :</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    disabled={isLoading}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Catégorie et Marque */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categorie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Catégorie :</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md">
                      <SelectValue placeholder="Montures optiques" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Montures optiques">Montures optiques</SelectItem>
                    <SelectItem value="montures solaires">Montures solaires</SelectItem>
                    <SelectItem value="verres">Verres</SelectItem>
                    <SelectItem value="montures sport">Montures sport</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="marque"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Marque :</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={isLoading}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Prix Unitaire et Statut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="prixUnitaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Prix unitaire (DT) :</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    disabled={isLoading}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm">
                  Ce champ est obligatoire.
                </FormMessage>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="statut"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Statut :</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md">
                      <SelectValue placeholder="Standard" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="promotion exclusive">Promotion exclusive</SelectItem>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Remise */}
        <FormField
          control={form.control}
          name="remise"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Remise (%) :</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image du Produit */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Image du Produit :</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    disabled={isLoading}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">Aucun fichier choisi</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isLoading ? 'Chargement...' : 'Terminé'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
