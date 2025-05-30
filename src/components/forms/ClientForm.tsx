
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const clientSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  surname: z.string().min(1, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  address: z.string().optional(),
  actif: z.boolean().default(true),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface Client {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address?: string;
  actif: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel, isLoading = false }) => {
  const { toast } = useToast();
  
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || '',
      surname: client?.surname || '',
      email: client?.email || '',
      phone: client?.phone || '',
      address: client?.address || '',
      actif: client?.actif ?? true,
    },
  });

  const handleSubmit = async (data: ClientFormData) => {
    try {
      if (client?.id) {
        const response = await fetch(`/api/clients/${client.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la modification du client');
        }
        
        const updatedClient = await response.json();
        onSubmit(updatedClient);
        
        toast({
          title: 'Client modifié',
          description: 'Le client a été modifié avec succès.',
        });
      } else {
        const response = await fetch('/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la création du client');
        }
        
        const newClient = await response.json();
        onSubmit(newClient);
        
        toast({
          title: 'Client ajouté',
          description: 'Le client a été ajouté avec succès.',
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
        {/* Nom et Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Nom :</FormLabel>
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
          
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Prénom :</FormLabel>
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

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Email :</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  {...field} 
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Téléphone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Téléphone :</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={isLoading}
                  placeholder="ex: +216 12 345 678"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Adresse */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Adresse :</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={isLoading}
                  placeholder="Adresse complète"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Statut */}
        <FormField
          control={form.control}
          name="actif"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Statut :</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(value === 'true')} 
                defaultValue={field.value ? 'true' : 'false'} 
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Actif</SelectItem>
                  <SelectItem value="false">Inactif</SelectItem>
                </SelectContent>
              </Select>
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
            {isLoading ? 'Chargement...' : client ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
