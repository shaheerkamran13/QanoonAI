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
import { Eye, EyeOff, Home } from "lucide-react"

const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(100),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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

      toast({ 
        title: "Logged in successfully", 
        description: "Welcome back!" 
      })
      router.push("/dashboard")
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.response?.data?.detail ?? "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
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
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sign in to your account
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Username</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter your username" 
                          {...field} 
                          className="h-11"
                          autoComplete="username"
                        />
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
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-medium">Password</FormLabel>
                        <a 
                          href="/forgot-password" 
                          className="text-sm text-muted-foreground hover:text-primary underline-offset-2 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            {...field} 
                            className="h-11 pr-10"
                            autoComplete="current-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-11 w-10 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  className="w-full h-11 text-base font-medium shadow-sm hover:shadow transition-shadow" 
                  disabled={loading} 
                  type="submit"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center space-y-4">
              <div className="text-sm">
                New here?{" "}
                <a 
                  className="font-medium text-primary hover:underline underline-offset-2" 
                  href="/register"
                >
                  Create an account
                </a>
              </div>
              
              <div className="pt-4 border-t">
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