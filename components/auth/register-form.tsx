"use client"

import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { api } from "@/lib/axios"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^\S+$/, "Name must not contain spaces"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true)
      const res = await api.post("/user/register", {...values , username: values.name.toLowerCase()})


      if (res.data?.token) localStorage.setItem("token", res.data.token)
      toast({ title: "Account created", description: "You can now access your dashboard." })
      router.push("/dashboard")
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.response?.data?.message ?? "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>It’s fast and secure</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="mt-2 text-sm">
            Already have an account?{" "}
            <a className="text-primary underline underline-offset-4" href="/login">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
