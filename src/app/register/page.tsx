"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { RegisterForm } from "./types";
import { handleRegister } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [load, setLoad] = useState(false);

  async function onSubmit(data: RegisterForm) {
    setLoad(true)
    const response = await handleRegister(data);
    if(response.statusCode === 201){
      toast({
        variant: "success",
        title: "Cadastro realizado com sucesso",
        description: `Seja bem-vindo(a) ao FilmFlow!`,
        duration: 3000,
      });

      setTimeout(() => {
        router.replace("/validation");
      }, 3000)
    }else{
      toast({
        variant: "destructive",
        title: "Atenção",
        description: `Não foi possível realizar o cadastro. Tente novamente.`,
        duration: 3000,
      });
      setLoad(false)
      return
    }
  }

  return (
    <main className="m-44">
      <h1>Faça seu Cadastro</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome Completo</label>
          <Input
            type="text"
            placeholder="Digite seu nome completo"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 pb-5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <Input
            type="email"
            placeholder="Digite seu Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 pb-5">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Nome do Usuário</label>
          <Input
            type="text"
            placeholder="Digite seu Usuário"
            {...register("nickname")}
          />
          {errors.nickname && (
            <p className="text-red-500 pb-5">{errors.nickname.message}</p>
          )}
        </div>
        <div>
          <label>Senha</label>
          <Input
            type="password"
            placeholder="Digite sua Senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 pb-5">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>Repita sua senha</label>
          <Input
            type="password"
            placeholder="Digite sua Senha novamente"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500 pb-5">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <div>
          <Button type="submit" disabled={load}>Cadastrar</Button>
        </div>
      </form>
      <Toaster />
    </main>
  );
}
