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
import { Eye, EyeOff, Home, User, Mail, Lock } from "lucide-react"

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^\S+$/, "Username cannot contain spaces"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true)
      const res = await api.post("/user/register", {
        ...values,
        username: values.name.toLowerCase()
      })

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token)
      }

      toast({ 
        title: "Account created successfully", 
        description: "Welcome to your new account!" 
      })
      router.push("/dashboard")
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.response?.data?.message ?? "Please check your information and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-border/40">
          <CardHeader className="space-y-1 text-center relative pb-6">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
                onClick={() => router.push("/")}
                aria-label="Go to home"
              >
                <Home className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
                <CardDescription className="text-muted-foreground pt-1">
                  Join us today. It's quick and easy.
                </CardDescription>
              </div>
              <div className="w-8"></div> {/* Spacer for symmetry */}
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="janedoe" 
                            {...field} 
                            className="h-11 pl-10"
                            autoComplete="username"
                            disabled={loading}
                          />
                          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <div className="text-xs text-muted-foreground mt-1.5">
                        This will be your unique identifier. No spaces allowed.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="email" 
                            placeholder="you@example.com" 
                            {...field} 
                            className="h-11 pl-10"
                            autoComplete="email"
                            disabled={loading}
                          />
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        </div>
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
                      <FormLabel className="font-medium text-sm">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            {...field}
                            className="h-11 pl-10 pr-10"
                            autoComplete="new-password"
                            disabled={loading}
                          />
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-11 w-10 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            disabled={loading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <div className="text-xs text-muted-foreground mt-1.5">
                        Must be at least 6 characters long.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  className="w-full h-11 mt-2 text-base font-medium shadow-sm hover:shadow transition-shadow" 
                  disabled={loading} 
                  type="submit"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 pt-6 border-t">
              <div className="text-center space-y-4">
                <div className="text-sm">
                  Already have an account?{" "}
                  <a 
                    className="font-medium text-primary hover:underline underline-offset-2" 
                    href="/login"
                  >
                    Sign in here
                  </a>
                </div>
                
                <div className="text-xs text-muted-foreground leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a 
                    href="/terms" 
                    className="text-primary hover:underline underline-offset-2 font-medium"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a 
                    href="/privacy" 
                    className="text-primary hover:underline underline-offset-2 font-medium"
                  >
                    Privacy Policy
                  </a>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full h-10"
                  onClick={() => router.push("/")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Return to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}