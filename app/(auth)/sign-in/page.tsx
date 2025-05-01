"use client";

import { useRouter } from 'next/navigation';
import AuthForm from "@/components/AuthForm";
import { signIn } from '@/lib/actions/user.actions';

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async (formData: { email: string; password: string }) => {
    try {
      await signIn(formData);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className="flex-center size-full max-sm:px6">
      <AuthForm type="sign-in" onSubmit={handleSignIn} />
    </section>
  );
}

export default SignIn;