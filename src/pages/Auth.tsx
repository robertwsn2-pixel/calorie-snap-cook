import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import LanguageSelector from '@/components/LanguageSelector';
import { Dumbbell } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Login schema
  const loginSchema = z.object({
    email: z.string()
      .min(1, t('auth.emailRequired'))
      .email(t('auth.emailInvalid')),
    password: z.string()
      .min(6, t('auth.passwordMin')),
  });

  // Signup schema
  const signupSchema = loginSchema.extend({
    displayName: z.string().min(1, t('auth.displayNameRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        toast({
          title: t('auth.loginSuccess'),
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              display_name: data.displayName,
            },
          },
        });

        if (error) throw error;

        toast({
          title: t('auth.signupSuccess'),
        });
      }
    } catch (error: any) {
      toast({
        title: isLogin ? t('auth.loginError') : t('auth.signupError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName">{t('auth.displayName')}</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder={t('auth.displayName')}
                  {...register('displayName')}
                  disabled={isLoading}
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive">{errors.displayName.message as string}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.email')}
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.password')}
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message as string}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              size="lg"
            >
              {isLoading
                ? isLogin
                  ? t('auth.signingIn')
                  : t('auth.signingUp')
                : isLogin
                ? t('auth.login')
                : t('auth.signup')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              disabled={isLoading}
            >
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
              <span className="font-semibold text-primary">
                {isLogin ? t('auth.signup') : t('auth.login')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;