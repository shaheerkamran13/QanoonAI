"use client"

import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { api } from "@/lib/axios"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const schema = z.object({
  email: z.string().email(),
})

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: "" } })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true)
      await api.post("/auth/forgot-password", values)
      toast({ title: "Email sent", description: "Check your inbox for reset instructions." })
    } catch (err: any) {
      toast({
        title: "Request failed",
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
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>We’ll send you a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </Form>
          <div className="mt-2 text-sm">
            Remembered your password?{" "}
            <a className="text-primary underline underline-offset-4" href="/login">
              Back to login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
