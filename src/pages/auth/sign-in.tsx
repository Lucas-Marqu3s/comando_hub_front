import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

/* eslint-disable @typescript-eslint/no-unused-vars */
const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()
  const [showPassword, setShowPassword] = useState(false)

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Login efetuado com sucesso!')
    } catch {
      toast.error('Erro ao efetuar login!')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre com suas credenciais!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="pl-10 mb-2 bg-gray-100"
                  required
                  {...register('email')}
                />
              </div>

              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="pl-10 bg-gray-100"
                  required
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="terms1" className="rounded border-gray-300" />
                <Label
                  className="text-xs text-muted-foreground"
                  htmlFor="rememberMe"
                >
                  Lembrar de mim
                </Label>
              </div>
              <a
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>

            <div className="pt-5">
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Entrar
              </Button>
            </div>
          </form>
          <div className="text-sm text-center">
            Não tem conta ainda?{' '}
            <Link to="/sign-up" className="text-primary hover:underline">
              Solicitar Acesso
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
