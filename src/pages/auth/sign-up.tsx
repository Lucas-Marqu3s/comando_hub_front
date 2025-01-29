import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/* eslint-disable @typescript-eslint/no-unused-vars */
const signUpForm = z.object({
  fullName: z.string().min(1, 'Nome completo é obrigatório'),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  department: z.string().min(1, 'Departamento é obrigatório'),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()
  const [showPassword, setShowPassword] = useState(false)
  const [confirmshowPassword, setConfirmShowPassword] = useState(false)

  async function handleSignUp(data: SignUpForm) {
    if (data.password !== data.confirmPassword) {
      toast.error('As senhas não coincidem!')
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Solicitação enviada com sucesso!')

      setTimeout(() => {
        navigate('/sign-in')
      }, 2200)
    } catch {
      toast.error('Erro ao enviar a solicitação!')
    }
  }

  return (
    <>
      <Helmet title="Solicitar Acesso" />

      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Solicitar Acesso
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha todos os campos corretamente!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <div className="relative">
                <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="pl-10 mb-2 bg-gray-100"
                  required
                  {...register('fullName')}
                />
              </div>

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
                  className="pl-10 mb-2 bg-gray-100"
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

              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={confirmshowPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  className="pl-10 mb-2 bg-gray-100"
                  required
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setConfirmShowPassword(!confirmshowPassword)}
                >
                  {confirmshowPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              <Label htmlFor="department">Departamento</Label>
              <Select required>
                <SelectTrigger className="w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <SelectValue placeholder="Selecione um departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Desenvolvimento">
                      Desenvolvimento
                    </SelectItem>
                    <SelectItem value="SAC">SAC</SelectItem>
                    <SelectItem value="Gerenciamento de Risco">
                      Gerenciamento de Risco
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2">
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Enviar
              </Button>
            </div>
          </form>

          <div className="text-sm text-center">
            Já possui conta?{' '}
            <Link to="/sign-in" className="text-primary hover:underline">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
