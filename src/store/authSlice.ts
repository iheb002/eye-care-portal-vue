
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cin: string;
  boutique?: string;
  adresse?: string;
  role: 'opticien' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Charger l'état depuis localStorage
const loadAuthState = (): AuthState => {
  try {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      return {
        user: parsed.user,
        isAuthenticated: parsed.isAuthenticated,
        loading: false,
      };
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'état d\'authentification:', error);
  }
  
  return {
    user: null,
    isAuthenticated: false,
    loading: false,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      
      // Sauvegarder dans localStorage
      localStorage.setItem('authState', JSON.stringify({
        user: action.payload,
        isAuthenticated: true,
      }));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authState');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('authState');
    },
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      
      // Sauvegarder dans localStorage
      localStorage.setItem('authState', JSON.stringify({
        user: action.payload,
        isAuthenticated: true,
      }));
    },
    signupFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
