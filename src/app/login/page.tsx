import AuthForm from '@/components/auth/auth-form';
import { Blocks } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="flex items-center gap-2 mb-8">
        <Blocks className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">ComponentCraft AI</h1>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
