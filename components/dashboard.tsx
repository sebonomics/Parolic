"use client"

import { useState } from "react"
import { Users, Calendar, AlertTriangle, CheckCircle, Clock, MapPin, ArrowUpRight, Filter, Search, FileText } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {
  ChartArea,
  ChartAxisOptions,
  ChartContainer,
  ChartLegend,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ActivityType = "case_update" | "appointment" | "alert" | "compliance"
type AppointmentType = "initial" | "follow_up" | "review" | "emergency"

interface Activity {
  type: ActivityType
  title: string
  description: string
  time: string
  case?: string
}

interface Appointment {
  clientName: string
  caseNumber: string
  date: string
  time: string
  type: AppointmentType
  location?: string
}

interface Client {
  name: string
  caseNumber: string
}

interface ChartData {
  date: string
  value: number
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
  }>
}

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const { state } = useSidebar()

  return (
    <div className={`p-6 space-y-6 transition-all duration-200 ease-linear ${state === "collapsed" ? "pl-8" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Officer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Officer Adams. Here's your overview for today.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search cases..." className="w-full pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Cases</DropdownMenuItem>
              <DropdownMenuItem>High Risk</DropdownMenuItem>
              <DropdownMenuItem>Medium Risk</DropdownMenuItem>
              <DropdownMenuItem>Low Risk</DropdownMenuItem>
              <DropdownMenuItem>Compliance Issues</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Cases</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 completed, 5 remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 in the last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="alerts">Compliance Alerts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Compliance Trends</CardTitle>
              <CardDescription>Monitoring client compliance over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ComplianceChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest case updates and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className={`mt-0.5 rounded-full p-1 ${getActivityIconColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                          {activity.case && (
                            <Badge variant="outline" className="text-xs">
                              Case #{activity.case}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High Risk Cases</CardTitle>
                <CardDescription>Cases requiring additional supervision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {highRiskCases.map((client, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={client.name} />
                          <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">Case #{client.caseNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">High Risk</Badge>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All High Risk Cases
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Scheduled meetings with clients for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={appointment.clientName} />
                        <AvatarFallback>{getInitials(appointment.clientName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{appointment.clientName}</p>
                        <p className="text-xs text-muted-foreground">Case #{appointment.caseNumber}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {appointment.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getAppointmentBadgeVariant(appointment.type)}>{appointment.type}</Badge>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>Recent violations and compliance issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full p-1 bg-destructive/10 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{alert.clientName}</p>
                          <Badge variant="outline" className="text-xs">
                            Case #{alert.caseNumber}
                          </Badge>
                        </div>
                        <p className="text-xs font-medium text-destructive mt-1">{alert.violation}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">Reported: {alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                      <Button variant="default" size="sm">
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports for your caseload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{report.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Generate Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ComplianceChart() {
  const data: ChartData[] = [
    { date: "Jan 1", value: 95 },
    { date: "Jan 2", value: 92 },
    { date: "Jan 3", value: 88 },
    { date: "Jan 4", value: 85 },
    { date: "Jan 5", value: 82 },
    { date: "Jan 6", value: 80 },
    { date: "Jan 7", value: 78 },
    { date: "Jan 8", value: 75 },
    { date: "Jan 9", value: 72 },
    { date: "Jan 10", value: 70 },
    { date: "Jan 11", value: 68 },
    { date: "Jan 12", value: 65 },
    { date: "Jan 13", value: 63 },
    { date: "Jan 14", value: 60 },
    { date: "Jan 15", value: 58 },
    { date: "Jan 16", value: 55 },
    { date: "Jan 17", value: 53 },
    { date: "Jan 18", value: 50 },
    { date: "Jan 19", value: 48 },
    { date: "Jan 20", value: 45 },
    { date: "Jan 21", value: 43 },
    { date: "Jan 22", value: 40 },
    { date: "Jan 23", value: 38 },
    { date: "Jan 24", value: 35 },
    { date: "Jan 25", value: 33 },
    { date: "Jan 26", value: 30 },
    { date: "Jan 27", value: 28 },
    { date: "Jan 28", value: 25 },
    { date: "Jan 29", value: 23 },
    { date: "Jan 30", value: 20 },
  ]

  return (
    <ChartContainer
      data={data}
      xAxis={[
        {
          scaleType: "point",
          dataKey: "date",
          tickFormatter: (date) => date,
        },
      ]}
      yAxis={[
        {
          scaleType: "linear",
          dataKey: "value",
          min: 0,
          max: 100,
          tickCount: 6,
        },
      ]}
    >
      <ChartArea dataKey="value" fill="hsl(var(--primary) / 0.1)" />
      <ChartLine dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
      <ChartAxisOptions
        x={{
          label: "Date",
          labelStyle: {
            fontSize: 12,
            fill: "hsl(var(--muted-foreground))",
          },
          tickStyle: {
            fontSize: 10,
            fill: "hsl(var(--muted-foreground))",
          },
          axisStyle: {
            stroke: "hsl(var(--border))",
          },
        }}
        y={{
          label: "Compliance Rate (%)",
          labelStyle: {
            fontSize: 12,
            fill: "hsl(var(--muted-foreground))",
          },
          tickStyle: {
            fontSize: 10,
            fill: "hsl(var(--muted-foreground))",
          },
          axisStyle: {
            stroke: "hsl(var(--border))",
          },
        }}
      />
      <ChartTooltip>
        <ChartTooltipContent
          items={[
            {
              label: "Compliance Rate",
              value: (payload: ChartTooltipProps["payload"]) => `${payload?.[0]?.value ?? 0}%`,
              color: "hsl(var(--primary))",
            },
          ]}
        />
      </ChartTooltip>
      <ChartLegend
        items={[
          { label: "Compliance Rate", color: "hsl(var(--primary))" },
        ]}
      />
    </ChartContainer>
  )
}

// Helper functions
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case "case_update":
      return <FileText className="h-4 w-4" />
    case "appointment":
      return <Calendar className="h-4 w-4" />
    case "alert":
      return <AlertTriangle className="h-4 w-4" />
    case "compliance":
      return <CheckCircle className="h-4 w-4" />
  }
}

function getActivityIconColor(type: ActivityType): string {
  switch (type) {
    case "case_update":
      return "bg-blue-100 text-blue-600"
    case "appointment":
      return "bg-green-100 text-green-600"
    case "alert":
      return "bg-red-100 text-red-600"
    case "compliance":
      return "bg-yellow-100 text-yellow-600"
  }
}

function getAppointmentBadgeVariant(type: AppointmentType): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case "initial":
      return "default"
    case "follow_up":
      return "secondary"
    case "review":
      return "outline"
    case "emergency":
      return "destructive"
  }
}

// Sample data
const recentActivities: Activity[] = [
  {
    type: "case_update",
    title: "Successful Check-in",
    description: "James Wilson completed his scheduled check-in",
    time: "2 hours ago",
    case: "4582",
  },
  {
    type: "alert",
    title: "Curfew Violation",
    description: "Michael Davis was outside permitted area after curfew",
    time: "4 hours ago",
    case: "3291",
  },
  {
    type: "compliance",
    title: "Location Alert",
    description: "Maria Rodriguez entered restricted zone",
    time: "5 hours ago",
    case: "4123",
  },
]

const highRiskCases: Client[] = [
  {
    name: "Michael Davis",
    caseNumber: "3291",
  },
  {
    name: "Emily Brown",
    caseNumber: "5678",
  },
  {
    name: "David Lee",
    caseNumber: "9012",
  },
]

const upcomingAppointments: Appointment[] = [
  {
    clientName: "Sarah Johnson",
    caseNumber: "4582",
    date: "Today",
    time: "2:00 PM",
    type: "initial",
    location: "Office",
  },
  {
    clientName: "Michael Davis",
    caseNumber: "3291",
    date: "Today",
    time: "3:30 PM",
    type: "follow_up",
    location: "Community Center",
  },
  {
    clientName: "James Wilson",
    caseNumber: "4123",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "review",
    location: "Job Center",
  },
  {
    clientName: "Emily Brown",
    caseNumber: "5678",
    date: "Tomorrow",
    time: "1:15 PM",
    type: "emergency",
    location: "Office",
  },
  {
    clientName: "David Lee",
    caseNumber: "9012",
    date: "Mar 22, 2023",
    time: "9:30 AM",
    type: "review",
    location: "County Courthouse",
  },
]

const complianceAlerts = [
  {
    clientName: "Michael Davis",
    caseNumber: "4582",
    violation: "Curfew Violation",
    details: "Client was outside permitted area at 11:42 PM, 2.3 miles from approved residence.",
    timestamp: "Yesterday, 11:42 PM",
    severity: "High",
  },
  {
    clientName: "Maria Rodriguez",
    caseNumber: "3291",
    violation: "Restricted Zone Entry",
    details: "Client entered restricted zone (downtown bar district) for 45 minutes.",
    timestamp: "Yesterday, 3:30 PM",
    severity: "Medium",
  },
  {
    clientName: "John Smith",
    caseNumber: "4023",
    violation: "Missed Check-in",
    details: "Client failed to complete scheduled check-in appointment.",
    timestamp: "Yesterday, 2:00 PM",
    severity: "Medium",
  },
  {
    clientName: "David Williams",
    caseNumber: "5104",
    violation: "Tampered Monitoring Device",
    details: "Potential tampering with ankle monitor detected. Signal interrupted for 35 minutes.",
    timestamp: "Mar 19, 2023, 8:15 PM",
    severity: "High",
  },
  {
    clientName: "Lisa Johnson",
    caseNumber: "2987",
    violation: "Failed Drug Test",
    details: "Client tested positive for prohibited substances during routine screening.",
    timestamp: "Mar 18, 2023, 10:30 AM",
    severity: "High",
  },
]

const reportTypes = [
  {
    title: "Caseload Summary",
    description: "Overview of all active cases with risk levels and compliance status.",
  },
  {
    title: "Compliance Report",
    description: "Detailed analysis of client compliance with supervision conditions.",
  },
  {
    title: "Treatment Progress",
    description: "Summary of client participation in treatment programs and outcomes.",
  },
  {
    title: "Violation Analysis",
    description: "Breakdown of violations by type, frequency, and severity.",
  },
  {
    title: "Resource Utilization",
    description: "Report on community resource referrals and utilization rates.",
  },
  {
    title: "Court Appearances",
    description: "Summary of upcoming and completed court appearances.",
  },
]

