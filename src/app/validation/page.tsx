"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useState } from "react"

const FormSchema = z.object({
  pin: z.string().min(5, {
    message: "O Pin tem no mínimo 6 caracteres.",
  }),
})

export default function Validation() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  
  const router = useRouter();
  const [load, setLoad] = useState(false);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoad(true)
    toast({
      variant: "success",
      title: "Conta validada com sucesso",
      description: `Faça seu Login`,
      duration: 3000,
    });
    setTimeout(() => {
      router.replace("/login");
    }, 3000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valide sua conta</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Digite o código de 5 dígitos enviado para o seu e-mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={load}>Validar</Button>
      </form>
    </Form>
  )
}
