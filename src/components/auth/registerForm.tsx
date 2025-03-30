import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { Card } from '../common/card';
import { PasswordStrengthMeter } from './passwordStrength';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '../types/auth';

export function RegisterForm() {
  // const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      // API call is commented out for now:
      // await registerUser(data.fullName, data.email, data.password, data.confirmPassword);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed. Please try again.');
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
          Join SStockSense
        </h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          Create your account to get started
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

            {/* User Name */}
            <Input
              label="Full Name"
              type="text"
              {...register('fullName')}
              error={errors.fullName?.message}
              icon={<User className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))] bg-gray-50 text-gray-800 transition duration-200"
            />

            {/* Password */}
            <div>
              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                className="focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))] bg-gray-50 text-gray-800 transition duration-200"
              />
              <PasswordStrengthMeter password={password} />
            </div>

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))] bg-gray-50 text-gray-800 transition duration-200"
            />

            {/* Create Account Button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              icon={<ArrowRight className="h-5 w-5" />}
              className="w-full py-2 rounded bg-[rgb(var(--color-mikado-yellow))] text-rich-black font-semibold hover:bg-[rgb(var(--color-gold))] focus:ring-2 focus:ring-[rgb(var(--color-gold))] transition-colors duration-300"
            >
              Create Account
            </Button>
          </form>

          {/* Divider / Sign In instead */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400/40" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[rgb(var(--color-oxford-blue))] text-gray-300">
                  Already have an account?
                </span>
              </div>
            </div>


            <div className="mt-6">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full border-[rgb(var(--color-mikado-yellow))] text-[rgb(var(--color-mikado-yellow))] hover:bg-[rgb(var(--color-mikado-yellow))]/10 focus:ring-2 focus:ring-[rgb(var(--color-gold))] transition-colors duration-300"
                >
                  Sign in instead
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
