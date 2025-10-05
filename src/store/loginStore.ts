import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginState {
    // Authentication State
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    
    // UI State
    isLoginModalVisible: boolean;
    rememberMe: boolean;
    
    // Loading States
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isValidatingToken: boolean;
    
    // Error State
    loginError: string | null;
}

export interface LoginActions {
    // Authentication Actions
    login: (user: User, token: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    
    // UI Actions
    setIsLoginModalVisible: (visible: boolean) => void;
    setRememberMe: (remember: boolean) => void;
    
    // Loading Actions
    setIsLoggingIn: (loading: boolean) => void;
    setIsLoggingOut: (loading: boolean) => void;
    setIsValidatingToken: (validating: boolean) => void;
    
    // Error Actions
    setLoginError: (error: string | null) => void;
    clearLoginError: () => void;
    
    // Reset Actions
    resetLoginState: () => void;
}

export type LoginStore = LoginState & LoginActions;

const initialState: LoginState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoginModalVisible: false,
    rememberMe: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isValidatingToken: false,
    loginError: null,
};

export const createLoginStore = () =>
    create<LoginStore>()(
        devtools(
            persist(
                (set, get) => ({
                    ...initialState,
                    
                    // Authentication Actions
                    login: (user, token) =>
                        set({
                            isAuthenticated: true,
                            user,
                            token,
                            loginError: null,
                        }, false, 'login'),
                    
                    logout: () =>
                        set({
                            isAuthenticated: false,
                            user: null,
                            token: null,
                            loginError: null,
                        }, false, 'logout'),
                    
                    setUser: (user) =>
                        set({ user }, false, 'setUser'),
                    
                    setToken: (token) =>
                        set({ token }, false, 'setToken'),
                    
                    // UI Actions
                    setIsLoginModalVisible: (visible) =>
                        set({ isLoginModalVisible: visible }, false, 'setIsLoginModalVisible'),
                    
                    setRememberMe: (remember) =>
                        set({ rememberMe: remember }, false, 'setRememberMe'),
                    
                    // Loading Actions
                    setIsLoggingIn: (loading) =>
                        set({ isLoggingIn: loading }, false, 'setIsLoggingIn'),
                    
                    setIsLoggingOut: (loading) =>
                        set({ isLoggingOut: loading }, false, 'setIsLoggingOut'),
                    
                    setIsValidatingToken: (validating) =>
                        set({ isValidatingToken: validating }, false, 'setIsValidatingToken'),
                    
                    // Error Actions
                    setLoginError: (error) =>
                        set({ loginError: error }, false, 'setLoginError'),
                    
                    clearLoginError: () =>
                        set({ loginError: null }, false, 'clearLoginError'),
                    
                    // Reset Actions
                    resetLoginState: () =>
                        set(initialState, false, 'resetLoginState'),
                }),
                {
                    name: 'login-store',
                    partialize: (state) => ({
                        isAuthenticated: state.isAuthenticated,
                        user: state.user,
                        token: state.token,
                        rememberMe: state.rememberMe,
                    }),
                }
            ),
            {
                name: 'login-store',
            }
        )
    );