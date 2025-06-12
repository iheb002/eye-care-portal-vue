import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);

  const request = useCallback(async (url: string, options: RequestOptions = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user ? `Bearer ${user.id}` : '', // Assuming you have a token system
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast, user]);

  return { request, loading };
};

// Clients API
export const useClientsApi = () => {
  const { request, loading } = useApi();

  const getClients = useCallback(async () => {
    console.log('Fetching clients from API...');
    return await request('/api/clients');
  }, [request]);

  const getClient = useCallback(async (id: string) => {
    console.log(`Fetching client ${id} from API...`);
    return await request(`/api/clients/${id}`);
  }, [request]);

  const createClient = useCallback(async (clientData: any) => {
    console.log('Creating client:', clientData);
    return await request('/api/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }, [request]);

  const updateClient = useCallback(async (id: string, clientData: any) => {
    console.log(`Updating client ${id}:`, clientData);
    return await request(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  }, [request]);

  const deleteClient = useCallback(async (id: string) => {
    console.log(`Deleting client ${id}...`);
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
    console.log('Fetching products from API...');
    return await request('/api/products');
  }, [request]);

  const getProduct = useCallback(async (id: string) => {
    console.log(`Fetching product ${id} from API...`);
    return await request(`/api/products/${id}`);
  }, [request]);

  const createProduct = useCallback(async (productData: any) => {
    console.log('Creating product:', productData);
    return await request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }, [request]);

  const updateProduct = useCallback(async (id: string, productData: any) => {
    console.log(`Updating product ${id}:`, productData);
    return await request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }, [request]);

  const deleteProduct = useCallback(async (id: string) => {
    console.log(`Deleting product ${id}...`);
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
    console.log('Fetching ordonnances from API...');
    return await request('/api/ordonnances');
  }, [request]);

  const getOrdonnance = useCallback(async (id: string) => {
    console.log(`Fetching ordonnance ${id} from API...`);
    return await request(`/api/ordonnances/${id}`);
  }, [request]);

  const createOrdonnance = useCallback(async (ordonnanceData: any) => {
    console.log('Creating ordonnance:', ordonnanceData);
    return await request('/api/ordonnances', {
      method: 'POST',
      body: JSON.stringify(ordonnanceData),
    });
  }, [request]);

  const updateOrdonnance = useCallback(async (id: string, ordonnanceData: any) => {
    console.log(`Updating ordonnance ${id}:`, ordonnanceData);
    return await request(`/api/ordonnances/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ordonnanceData),
    });
  }, [request]);

  const deleteOrdonnance = useCallback(async (id: string) => {
    console.log(`Deleting ordonnance ${id}...`);
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

// Chatbot API
export const useChatbotApi = () => {
  const { request, loading } = useApi();

  const sendMessage = useCallback(async (message: string) => {
    console.log('Sending message to chatbot API:', message);
    return await request('/api/chatbot/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }, [request]);

  const getChatHistory = useCallback(async () => {
    console.log('Fetching chat history from API...');
    return await request('/api/chatbot/history');
  }, [request]);

  return {
    sendMessage,
    getChatHistory,
    loading,
  };
};
