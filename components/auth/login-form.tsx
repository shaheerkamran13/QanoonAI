"use client"
import qs from "qs"
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
  username: z.string().min(2).max(100),
  password: z.string().min(6),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
  try {
    setLoading(true)

    const res = await api.post(
      "/token",
      qs.stringify({
        username: values.username,
        password: values.password,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )

    if (res.data?.access_token) {
      localStorage.setItem("token", res.data.access_token)
    }

    toast({ title: "Logged in", description: "Welcome back!" })
    router.push("/dashboard")
  } catch (err: any) {
    toast({
      title: "Login failed",
      description: err?.response?.data?.detail ?? "Check your credentials",
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
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                      <Input type="username" placeholder="you@example.com" {...field} />
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
                      <div className="flex items-center gap-2">
                        <Input type={show ? "text" : "password"} placeholder="••••••••" {...field} />
                        <Button type="button" variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-3 text-sm text-muted-foreground">
            <a href="/forgot-password" className="underline underline-offset-4">
              Forgot password?
            </a>
          </div>
          <div className="mt-1 text-sm">
            New here?{" "}
            <a className="text-primary underline underline-offset-4" href="/register">
              Create an account
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
