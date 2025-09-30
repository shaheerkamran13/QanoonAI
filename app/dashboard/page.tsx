"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const metrics = [
  { title: "Docs analyzed", value: "10,248" },
  { title: "Accuracy", value: "98.7%" },
  { title: "Practice areas", value: "52" },
  { title: "Median latency", value: "1.2s" },
]

const series = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 240 },
  { day: "Wed", value: 180 },
  { day: "Thu", value: 320 },
  { day: "Fri", value: 260 },
  { day: "Sat", value: 140 },
  { day: "Sun", value: 300 },
]

export default function DashboardHome() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => (
        <Card key={m.title}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{m.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{m.value}</CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Weekly volume</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="oklch(0.62 0.18 255)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
