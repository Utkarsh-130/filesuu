import React, { useState, useEffect, createContext, PropsWithChildren } from "react";
import { Session, User, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config/initSupabase";

// Define the types for the authentication context
type AuthProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signOut?: () => void;
};

// Create the AuthContext with a default empty object
export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to access authentication context
export function useAuth() {
  return React.useContext(AuthContext);
}

// AuthProvider component to manage auth state
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Listen for changes to authentication state
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    // Cleanup listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Provide context value to child components
  const value: AuthProps = {
    user,
    session,
    initialized,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
