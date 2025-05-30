
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { isAuthorizedAdminEmail } from '@/utils/adminConfig';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  getUserRole: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const getUserRole = async (): Promise<string | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      // If no role found, try to create one based on user metadata or admin status
      if (!data) {
        let roleFromMetadata = user.user_metadata?.role || 'buyer';
        
        // Check if this user is an authorized admin
        if (roleFromMetadata === 'admin' && !isAuthorizedAdminEmail(user.email || '')) {
          console.warn(`User ${user.email} attempted to get admin role but is not authorized`);
          roleFromMetadata = 'buyer'; // Downgrade to buyer if not authorized
        }
        
        // Attempt to insert the role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: user.id,
            role: roleFromMetadata
          });
          
        if (insertError) {
          console.error('Error creating user role:', insertError);
          return roleFromMetadata; // Return the role from metadata even if insert fails
        }
        
        return roleFromMetadata;
      }
      
      // Additional security check for admin role
      if (data.role === 'admin' && !isAuthorizedAdminEmail(user.email || '')) {
        console.warn(`User ${user.email} has admin role but is not in authorized list`);
        // You might want to revoke the role here or take other action
        return 'buyer'; // Return buyer role instead
      }
      
      return data.role || null;
    } catch (error) {
      console.error('Error in getUserRole:', error);
      return null;
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    getUserRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
