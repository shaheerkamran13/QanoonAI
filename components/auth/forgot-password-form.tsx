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
import { ArrowLeft, Home, Mail } from "lucide-react"

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export function ForgotPasswordForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const form = useForm<z.infer<typeof schema>>({ 
    resolver: zodResolver(schema), 
    defaultValues: { email: "" } 
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true)
      await api.post("/auth/forgot-password", values)
      toast({ 
        title: "Reset email sent", 
        description: "Check your inbox for password reset instructions." 
      })
      setSubmitted(true)
    } catch (err: any) {
      toast({
        title: "Request failed",
        description: err?.response?.data?.message ?? "Please try again later",
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
                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {submitted 
                    ? "Check your email" 
                    : "Enter your email to receive a reset link"}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {!submitted ? (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Email Address</FormLabel>
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
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full h-11 text-base font-medium shadow-sm hover:shadow transition-shadow" 
                        disabled={loading} 
                        type="submit"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Sending...
                          </span>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full h-11"
                        type="button"
                        onClick={() => router.push("/login")}
                        disabled={loading}
                      >
                        Back to Login
                      </Button>
                    </div>
                  </form>
                </Form>
                
                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    className="w-full h-10 mt-4"
                    onClick={() => router.push("/")}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6 text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Check Your Email</h3>
                  <p className="text-muted-foreground">
                    We've sent password reset instructions to{" "}
                    <span className="font-medium text-foreground">
                      {form.getValues().email}
                    </span>
                  </p>
                </div>
                
                <div className="space-y-3 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 h-11"
                      onClick={() => {
                        if (form.getValues().email) {
                          onSubmit(form.getValues())
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? "Resending..." : "Resend Email"}
                    </Button>
                    
                    <Button
                      className="flex-1 h-11"
                      onClick={() => router.push("/login")}
                    >
                      Return to Login
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full h-10 mt-2"
                    onClick={() => router.push("/")}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}