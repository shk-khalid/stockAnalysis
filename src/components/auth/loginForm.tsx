import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { Card } from '../common/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../types/auth';

export function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Placeholder for your login API call
      // For example:
      // const result = await login(data.email, data.password);
      // if (result) {
      //   // Proceed with two-factor authentication if applicable.
      // }
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[rgb(var(--color-rich-black))] py-10 px-4">
      {/* Logo or Brand Name */}
      <div className="animate-fadeIn">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-[rgb(var(--color-mikado-yellow))] bg-clip-text text-transparent">
            SStockSense
            <span className="text-[rgb(var(--color-mikado-yellow))]">.</span>
          </h1>
        </div>
      </div>
      <div className="w-full max-w-md">
        {/* Heading with gradient text */}
        <h2 className="text-center text-2xl font-extrabold bg-gradient-to-r from-white to-[rgb(var(--color-mikado-yellow))] bg-clip-text text-transparent tracking-tight mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          Sign in to your account to continue
        </p>

        <Card className="p-8 rounded-lg shadow-lg bg-[rgb(var(--color-oxford-blue))] text-white">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <Input
              label="Email address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))] bg-gray-50 text-gray-800 transition duration-200"
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))] bg-gray-50 text-gray-800 transition duration-200"
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              icon={<ArrowRight className="h-5 w-5" />}
              className="w-full py-2 rounded bg-[rgb(var(--color-mikado-yellow))] text-rich-black font-semibold hover:bg-[rgb(var(--color-gold))] focus:ring-2 focus:ring-[rgb(var(--color-gold))] transition-colors duration-300"
            >
              Sign in
            </Button>
          </form>

          {/* Divider / New Account */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400/40" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[rgb(var(--color-oxford-blue))] text-gray-300">
                  New to SStockSense?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button
                  variant="outline"
                  fullWidth
                  className="border-[rgb(var(--color-mikado-yellow))] text-[rgb(var(--color-mikado-yellow))] hover:bg-[rgb(var(--color-mikado-yellow))]/10 focus:ring-2 focus:ring-[rgb(var(--color-gold))] transition-colors duration-300"
                >
                  Create new account
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
