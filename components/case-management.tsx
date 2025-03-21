"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  FileText,
  Calendar,
  AlertTriangle,
  ChevronDown,
  MoreHorizontal,
  Clock,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CaseManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter cases based on search query and filters
  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || caseItem.caseNumber.includes(searchQuery)

    const matchesRisk = riskFilter === "all" || caseItem.riskLevel.toLowerCase() === riskFilter
    const matchesStatus = statusFilter === "all" || caseItem.status.toLowerCase() === statusFilter

    return matchesSearch && matchesRisk && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground">Manage and monitor your assigned cases</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Case
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or case number..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="violated">Violated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No cases found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredCases.map((caseItem) => <CaseCard key={caseItem.caseNumber} caseData={caseItem} />)
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCases.length} of {cases.length} cases
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function CaseCard({ caseData }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={caseData.clientName} />
            <AvatarFallback>{getInitials(caseData.clientName)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{caseData.clientName}</h3>
              <Badge variant="outline">Case #{caseData.caseNumber}</Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Assigned: {caseData.assignedDate}</span>
              <span>•</span>
              <span>Type: {caseData.caseType}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={getRiskBadgeVariant(caseData.riskLevel)}>{caseData.riskLevel} Risk</Badge>
          <Badge variant={getStatusBadgeVariant(caseData.status)}>{caseData.status}</Badge>

          <div className="flex items-center gap-2">
            {caseData.hasViolation && (
              <div className="text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                <DropdownMenuItem>Contact Client</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Generate Report</DropdownMenuItem>
                <DropdownMenuItem>Edit Case</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </div>

      <CollapsibleContent>
        <div className="border-t p-4">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="notes">Case Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Personal Information</h4>
                  <div className="text-sm">
                    <p>
                      <span className="text-muted-foreground">Age:</span> {caseData.age}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Gender:</span> {caseData.gender}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Address:</span> {caseData.address}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {caseData.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Case Details</h4>
                  <div className="text-sm">
                    <p>
                      <span className="text-muted-foreground">Offense:</span> {caseData.offense}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Sentence:</span> {caseData.sentence}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Start Date:</span> {caseData.startDate}
                    </p>
                    <p>
                      <span className="text-muted-foreground">End Date:</span> {caseData.endDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Supervision Requirements</h4>
                  <ul className="text-sm space-y-1">
                    {caseData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" /> View Full Profile
                </Button>
                <Button size="sm">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Recent & Upcoming Appointments</h4>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Appointment
                  </Button>
                </div>

                <div className="space-y-3">
                  {caseData.appointments.map((appointment, index) => (
                    <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-1 ${getAppointmentIconColor(appointment.status)}`}>
                          {getAppointmentIcon(appointment.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{appointment.type}</p>
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
                      <Badge variant={getAppointmentStatusBadgeVariant(appointment.status)}>{appointment.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Compliance History</h4>

                <div className="space-y-3">
                  {caseData.compliance.map((item, index) => (
                    <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-1 ${getComplianceIconColor(item.type)}`}>
                          {getComplianceIcon(item.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                          {item.details && <p className="text-xs mt-1">{item.details}</p>}
                        </div>
                      </div>
                      <Badge variant={getComplianceBadgeVariant(item.type)}>{item.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Case Notes</h4>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Note
                  </Button>
                </div>

                <div className="space-y-4">
                  {caseData.notes.map((note, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{note.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {note.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{note.date}</p>
                      </div>
                      <p className="text-sm mt-2">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">By: {note.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Helper functions
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

function getRiskBadgeVariant(risk) {
  switch (risk.toLowerCase()) {
    case "high":
      return "destructive"
    case "medium":
      return "warning"
    case "low":
      return "secondary"
    default:
      return "outline"
  }
}

function getStatusBadgeVariant(status) {
  switch (status.toLowerCase()) {
    case "active":
      return "default"
    case "pending":
      return "secondary"
    case "completed":
      return "success"
    case "violated":
      return "destructive"
    default:
      return "outline"
  }
}

function getAppointmentIcon(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "scheduled":
      return <Calendar className="h-4 w-4" />
    case "missed":
      return <AlertTriangle className="h-4 w-4" />
    case "rescheduled":
      return <Clock className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

function getAppointmentIconColor(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-600"
    case "scheduled":
      return "bg-blue-100 text-blue-600"
    case "missed":
      return "bg-red-100 text-red-600"
    case "rescheduled":
      return "bg-yellow-100 text-yellow-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

function getAppointmentStatusBadgeVariant(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "success"
    case "scheduled":
      return "default"
    case "missed":
      return "destructive"
    case "rescheduled":
      return "warning"
    default:
      return "outline"
  }
}

function getComplianceIcon(type) {
  switch (type.toLowerCase()) {
    case "compliant":
      return <CheckCircle className="h-4 w-4" />
    case "violation":
      return <AlertTriangle className="h-4 w-4" />
    case "warning":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <CheckCircle className="h-4 w-4" />
  }
}

function getComplianceIconColor(type) {
  switch (type.toLowerCase()) {
    case "compliant":
      return "bg-green-100 text-green-600"
    case "violation":
      return "bg-red-100 text-red-600"
    case "warning":
      return "bg-yellow-100 text-yellow-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

function getComplianceBadgeVariant(type) {
  switch (type.toLowerCase()) {
    case "compliant":
      return "success"
    case "violation":
      return "destructive"
    case "warning":
      return "warning"
    default:
      return "outline"
  }
}

// Sample data
const cases = [
  {
    clientName: "John Doe",
    caseNumber: "4582",
    assignedDate: "Jan 15, 2023",
    caseType: "Parole",
    riskLevel: "High",
    status: "Active",
    hasViolation: true,
    age: 32,
    gender: "Male",
    address: "123 Main St, Anytown, CA 90210",
    phone: "(555) 123-4567",
    offense: "Aggravated Assault",
    sentence: "5 years, 3 years supervised release",
    startDate: "Jan 15, 2023",
    endDate: "Jan 15, 2026",
    requirements: [
      "Weekly check-ins",
      "Substance abuse treatment",
      "Curfew 10PM-6AM",
      "No contact with victims",
      "GPS monitoring",
    ],
    appointments: [
      {
        type: "Office Check-in",
        date: "Mar 15, 2023",
        time: "10:00 AM",
        location: "District Office",
        status: "Completed",
      },
      {
        type: "Substance Abuse Treatment",
        date: "Mar 18, 2023",
        time: "2:00 PM",
        location: "Community Health Center",
        status: "Missed",
      },
      {
        type: "Office Check-in",
        date: "Mar 22, 2023",
        time: "10:00 AM",
        location: "District Office",
        status: "Scheduled",
      },
    ],
    compliance: [
      {
        type: "Violation",
        description: "Curfew Violation",
        date: "Mar 10, 2023",
        details: "Client was outside permitted area at 11:42 PM, 2.3 miles from approved residence.",
      },
      {
        type: "Warning",
        description: "Late for Check-in",
        date: "Feb 28, 2023",
        details: "Client arrived 25 minutes late for scheduled check-in.",
      },
      {
        type: "Compliant",
        description: "Drug Test",
        date: "Feb 21, 2023",
        details: "Clean drug test results.",
      },
    ],
    notes: [
      {
        title: "Initial Assessment",
        category: "Intake",
        date: "Jan 15, 2023",
        content:
          "Client shows moderate risk factors for recidivism. History of substance abuse issues. Employment is a primary concern.",
        author: "Officer Adams",
      },
      {
        title: "Employment Update",
        category: "Progress",
        date: "Feb 10, 2023",
        content: "Client has secured part-time employment at local warehouse. Working 25 hours per week.",
        author: "Officer Adams",
      },
      {
        title: "Curfew Violation Follow-up",
        category: "Violation",
        date: "Mar 11, 2023",
        content:
          "Discussed curfew violation with client. Claims he was visiting sick relative but failed to request permission. Issued formal warning.",
        author: "Officer Adams",
      },
    ],
  },
  {
    clientName: "Maria Rodriguez",
    caseNumber: "3291",
    assignedDate: "Dec 5, 2022",
    caseType: "Probation",
    riskLevel: "Medium",
    status: "Active",
    hasViolation: true,
    age: 28,
    gender: "Female",
    address: "456 Oak Ave, Anytown, CA 90210",
    phone: "(555) 987-6543",
    offense: "Drug Possession",
    sentence: "3 years probation",
    startDate: "Dec 5, 2022",
    endDate: "Dec 5, 2025",
    requirements: [
      "Monthly check-ins",
      "Random drug testing",
      "Substance abuse treatment",
      "Community service (100 hours)",
    ],
    appointments: [
      {
        type: "Office Check-in",
        date: "Mar 5, 2023",
        time: "1:00 PM",
        location: "District Office",
        status: "Completed",
      },
      {
        type: "Drug Test",
        date: "Mar 12, 2023",
        time: "11:30 AM",
        location: "Testing Center",
        status: "Completed",
      },
      {
        type: "Substance Abuse Treatment",
        date: "Mar 25, 2023",
        time: "3:00 PM",
        location: "Community Health Center",
        status: "Scheduled",
      },
    ],
    compliance: [
      {
        type: "Violation",
        description: "Restricted Zone Entry",
        date: "Mar 15, 2023",
        details: "Client entered restricted zone (downtown bar district) for 45 minutes.",
      },
      {
        type: "Compliant",
        description: "Drug Test",
        date: "Mar 12, 2023",
        details: "Clean drug test results.",
      },
      {
        type: "Compliant",
        description: "Community Service",
        date: "Feb 25, 2023",
        details: "Completed 20 hours of community service at local food bank.",
      },
    ],
    notes: [
      {
        title: "Initial Assessment",
        category: "Intake",
        date: "Dec 5, 2022",
        content: "Client has history of substance abuse but shows motivation to change. Strong family support system.",
        author: "Officer Adams",
      },
      {
        title: "  Strong family support system.",
        author: "Officer Adams",
      },
      {
        title: "Treatment Progress",
        category: "Progress",
        date: "Jan 20, 2023",
        content:
          "Client has been attending all treatment sessions and participating actively. Counselor reports positive engagement.",
        author: "Officer Adams",
      },
      {
        title: "Restricted Zone Violation",
        category: "Violation",
        date: "Mar 16, 2023",
        content:
          "Discussed restricted zone violation. Client claims she was meeting a friend and forgot about the restriction. Issued formal warning and reviewed boundaries.",
        author: "Officer Adams",
      },
    ],
  },
  {
    clientName: "James Wilson",
    caseNumber: "3421",
    assignedDate: "Feb 10, 2023",
    caseType: "Parole",
    riskLevel: "Low",
    status: "Active",
    hasViolation: false,
    age: 45,
    gender: "Male",
    address: "789 Pine St, Anytown, CA 90210",
    phone: "(555) 456-7890",
    offense: "Fraud",
    sentence: "2 years, 1 year supervised release",
    startDate: "Feb 10, 2023",
    endDate: "Feb 10, 2024",
    requirements: ["Monthly check-ins", "Employment verification", "Financial monitoring", "Restitution payments"],
    appointments: [
      {
        type: "Office Check-in",
        date: "Mar 10, 2023",
        time: "9:00 AM",
        location: "District Office",
        status: "Completed",
      },
      {
        type: "Employment Verification",
        date: "Mar 15, 2023",
        time: "2:00 PM",
        location: "Workplace",
        status: "Completed",
      },
      {
        type: "Office Check-in",
        date: "Apr 10, 2023",
        time: "9:00 AM",
        location: "District Office",
        status: "Scheduled",
      },
    ],
    compliance: [
      {
        type: "Compliant",
        description: "Restitution Payment",
        date: "Mar 5, 2023",
        details: "Made scheduled restitution payment of $500.",
      },
      {
        type: "Compliant",
        description: "Employment Verification",
        date: "Mar 15, 2023",
        details: "Verified continued employment at accounting firm.",
      },
      {
        type: "Compliant",
        description: "Check-in",
        date: "Mar 10, 2023",
        details: "Attended scheduled check-in on time.",
      },
    ],
    notes: [
      {
        title: "Initial Assessment",
        category: "Intake",
        date: "Feb 10, 2023",
        content: "Client is low risk for recidivism. Stable employment and housing. Focus on restitution compliance.",
        author: "Officer Adams",
      },
      {
        title: "Restitution Plan",
        category: "Financial",
        date: "Feb 15, 2023",
        content: "Established payment plan of $500 monthly to complete restitution within supervision period.",
        author: "Officer Adams",
      },
      {
        title: "Monthly Review",
        category: "Progress",
        date: "Mar 10, 2023",
        content:
          "Client is compliant with all conditions. No issues to report. Maintaining stable employment and housing.",
        author: "Officer Adams",
      },
    ],
  },
]

import { CheckCircle } from "lucide-react"

