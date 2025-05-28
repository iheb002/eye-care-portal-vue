
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { request, loading };
};

// Clients API
export const useClientsApi = () => {
  const { request, loading } = useApi();

  const getClients = useCallback(async () => {
    return await request('/api/clients');
  }, [request]);

  const getClient = useCallback(async (id) => {
    return await request(`/api/clients/${id}`);
  }, [request]);

  const createClient = useCallback(async (clientData) => {
    return await request('/api/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }, [request]);

  const updateClient = useCallback(async (id, clientData) => {
    return await request(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  }, [request]);

  const deleteClient = useCallback(async (id) => {
    return await request(`/api/clients/${id}`, {
      method: 'DELETE',
    });
  }, [request]);

  return {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    loading,
  };
};

// Products API
export const useProductsApi = () => {
  const { request, loading } = useApi();

  const getProducts = useCallback(async () => {
    return await request('/api/products');
  }, [request]);

  const getProduct = useCallback(async (id) => {
    return await request(`/api/products/${id}`);
  }, [request]);

  const createProduct = useCallback(async (productData) => {
    return await request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }, [request]);

  const updateProduct = useCallback(async (id, productData) => {
    return await request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }, [request]);

  const deleteProduct = useCallback(async (id) => {
    return await request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }, [request]);

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
  };
};

// Ordonnances API
export const useOrdonnancesApi = () => {
  const { request, loading } = useApi();

  const getOrdonnances = useCallback(async () => {
    return await request('/api/ordonnances');
  }, [request]);

  const getOrdonnance = useCallback(async (id) => {
    return await request(`/api/ordonnances/${id}`);
  }, [request]);

  const createOrdonnance = useCallback(async (ordonnanceData) => {
    return await request('/api/ordonnances', {
      method: 'POST',
      body: JSON.stringify(ordonnanceData),
    });
  }, [request]);

  const updateOrdonnance = useCallback(async (id, ordonnanceData) => {
    return await request(`/api/ordonnances/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ordonnanceData),
    });
  }, [request]);

  const deleteOrdonnance = useCallback(async (id) => {
    return await request(`/api/ordonnances/${id}`, {
      method: 'DELETE',
    });
  }, [request]);

  return {
    getOrdonnances,
    getOrdonnance,
    createOrdonnance,
    updateOrdonnance,
    deleteOrdonnance,
    loading,
  };
};
