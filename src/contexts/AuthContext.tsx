import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import io from "socket.io-client";

export type UserRole = "admin" | "hr" | "manager" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  socket: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Create socket.io instance
const socketInstance = io("http://localhost:3000", {
  autoConnect: false,
  withCredentials: true
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<any>(socketInstance);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      
      // Connect socket and authenticate
      socket.connect();
      socket.emit('authenticate', parsedUser.id);
      
      // Check if session is still valid with the server
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
    
    // Socket event listeners for notifications
    socket.on('leave-status-update', (data: any) => {
      toast({
        title: "Leave Request Update",
        description: data.message,
      });
    });
    
    socket.on('new-leave-request', (data: any) => {
      toast({
        title: "New Leave Request",
        description: data.message,
      });
    });
    
    return () => {
      socket.disconnect();
      socket.off('leave-status-update');
      socket.off('new-leave-request');
    };
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Session expired or invalid
        logout();
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      // Keep the user logged in if server is unavailable (for offline support)
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Save to state and localStorage
      setUser(data.user);
      setToken("session-auth"); // We're using session cookies, so this is just a flag
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", "session-auth");
      
      // Connect socket and authenticate
      socket.connect();
      socket.emit('authenticate', data.user.id);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, using the mock login since we don't have Google OAuth configured on the server
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Mock Google SSO
      // In a real app, this would integrate with Google OAuth
      
      toast({
        title: "Google Sign-In",
        description: "This would initiate Google OAuth flow in a real app",
      });
      
      // For demo purposes, let's create a mock user
      const mockUser: User = {
        id: "google-123",
        name: "Google User",
        email: "user@gmail.com",
        role: "employee",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
      };
      
      const mockToken = "mock-google-sso-token";
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);
      
      // Connect socket and authenticate
      socket.connect();
      socket.emit('authenticate', mockUser.id);
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google Sign-In failed",
        description: "Could not authenticate with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clean up even if API fails
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      
      // Disconnect socket
      socket.disconnect();
      
      navigate("/login");
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        logout,
        updateUser,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
