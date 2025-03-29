
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Plus,
  Search,
  MoreHorizontal,
  BriefcaseIcon,
  Users,
  Calendar,
  FileText,
  Building,
  Paperclip,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInDays } from "date-fns";

// Mock data for job openings
const jobOpenings = [
  {
    id: "JOB001",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "3-5 years",
    status: "active",
    posted: "2023-07-01",
    applications: 24,
    description: "We're looking for an experienced Frontend Developer to join our growing team...",
    requirements: [
      "3+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with modern frontend frameworks",
      "Understanding of UI/UX design principles",
    ],
    salary: "$120,000 - $150,000",
  },
  {
    id: "JOB002",
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    experience: "5+ years",
    status: "active",
    posted: "2023-07-10",
    applications: 18,
    description: "We are seeking a skilled Marketing Manager to lead our marketing efforts...",
    requirements: [
      "5+ years of marketing experience",
      "Strong analytical skills",
      "Experience with digital marketing campaigns",
      "Excellent communication skills",
    ],
    salary: "$90,000 - $120,000",
  },
  {
    id: "JOB003",
    title: "HR Specialist",
    department: "HR",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    status: "active",
    posted: "2023-07-15",
    applications: 31,
    description: "Join our HR team to support recruitment and employee relations...",
    requirements: [
      "2+ years of HR experience",
      "Knowledge of HR best practices",
      "Excellent interpersonal skills",
      "Experience with HRIS systems",
    ],
    salary: "$70,000 - $90,000",
  },
  {
    id: "JOB004",
    title: "Product Designer",
    department: "Product",
    location: "Austin, TX",
    type: "Full-time",
    experience: "3-5 years",
    status: "active",
    posted: "2023-07-20",
    applications: 12,
    description: "We're looking for a talented Product Designer to help create amazing user experiences...",
    requirements: [
      "3+ years of product design experience",
      "Proficiency with design tools like Figma",
      "Strong portfolio showcasing UX/UI work",
      "Experience with user research and testing",
    ],
    salary: "$100,000 - $130,000",
  },
  {
    id: "JOB005",
    title: "Data Analyst",
    department: "Analytics",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "2-4 years",
    status: "closed",
    posted: "2023-06-15",
    applications: 28,
    description: "Help us turn data into actionable insights...",
    requirements: [
      "2+ years of data analysis experience",
      "Proficiency with SQL and Python",
      "Experience with data visualization tools",
      "Strong analytical thinking",
    ],
    salary: "$85,000 - $105,000",
  },
];

// Mock data for candidates
const candidates = [
  {
    id: "C001",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    jobId: "JOB001",
    jobTitle: "Senior Frontend Developer",
    status: "screening",
    appliedDate: "2023-07-15",
    experience: "4 years",
    skills: ["React", "TypeScript", "Node.js"],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
  },
  {
    id: "C002",
    name: "Jessica Lee",
    email: "jessica.l@example.com",
    jobId: "JOB001",
    jobTitle: "Senior Frontend Developer",
    status: "interview",
    appliedDate: "2023-07-10",
    experience: "5 years",
    skills: ["React", "Vue.js", "CSS"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
  },
  {
    id: "C003",
    name: "David Kim",
    email: "david.k@example.com",
    jobId: "JOB002",
    jobTitle: "Marketing Manager",
    status: "offered",
    appliedDate: "2023-07-12",
    experience: "7 years",
    skills: ["Digital Marketing", "SEO", "Analytics"],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
  },
  {
    id: "C004",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    jobId: "JOB003",
    jobTitle: "HR Specialist",
    status: "screening",
    appliedDate: "2023-07-18",
    experience: "3 years",
    skills: ["HRIS", "Recruitment", "Employee Relations"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
  },
  {
    id: "C005",
    name: "Robert Chen",
    email: "robert.c@example.com",
    jobId: "JOB001",
    jobTitle: "Senior Frontend Developer",
    status: "rejected",
    appliedDate: "2023-07-05",
    experience: "2 years",
    skills: ["HTML", "CSS", "JavaScript"],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
  },
];

const Recruitment = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Filter job openings based on search, department and status
  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || 
                              job.department === selectedDepartment;
                              
    const matchesStatus = selectedStatus === "all" || 
                         job.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Get unique departments for filter
  const departments = Array.from(new Set(jobOpenings.map(job => job.department)));
  
  const handleCreateJob = () => {
    toast({
      title: "Job Created",
      description: "New job posting has been created successfully.",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
            <p className="text-muted-foreground">
              Manage job openings and candidates
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Fill out the details to create a new job opening
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); handleCreateJob(); }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" placeholder="e.g. Senior Frontend Developer" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g. San Francisco, CA" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select>
                        <SelectTrigger id="jobType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fullTime">Full-time</SelectItem>
                          <SelectItem value="partTime">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Input id="experience" placeholder="e.g. 3-5 years" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input id="salary" placeholder="e.g. $80,000 - $100,000" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Enter job description..." 
                        rows={4} 
                      />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="requirements">Requirements & Qualifications</Label>
                      <Textarea 
                        id="requirements" 
                        placeholder="Enter requirements and qualifications..." 
                        rows={4} 
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Job Posting</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle>Active Jobs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-3xl font-bold">
                {jobOpenings.filter(job => job.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">
                Open positions across {departments.length} departments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle>Candidates</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-3xl font-bold">
                {candidates.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {candidates.filter(c => c.status === "screening").length} in screening,{" "}
                {candidates.filter(c => c.status === "interview").length} in interview
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle>Time to Hire</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-3xl font-bold">18 days</div>
              <p className="text-sm text-muted-foreground">
                Average time to fill positions
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-[400px]">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="mt-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-end mb-6">
              <div className="flex-1 flex flex-col sm:flex-row gap-3 items-start sm:items-end w-full">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`
                                ${job.status === "active" ? "bg-green-50 text-green-700 border-green-200" : ""}
                                ${job.status === "closed" ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                              `}
                            >
                              {job.status === "active" ? "Active" : "Closed"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {job.id}
                            </span>
                          </div>
                          <CardTitle className="mt-1">{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Building className="h-3 w-3" />
                            {job.department} • {job.location} • {job.type}
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View Applications ({job.applications})
                          </Button>
                          <Button size="sm">Share Posting</Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Job Description</h4>
                            <p className="text-sm text-muted-foreground">
                              {job.description}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Requirements</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="md:w-[200px]">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium">Salary Range</h4>
                              <p className="text-sm">{job.salary}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Experience</h4>
                              <p className="text-sm">{job.experience}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Posted</h4>
                              <p className="text-sm">{format(new Date(job.posted), "PPP")}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Applications</h4>
                              <p className="text-sm">{job.applications} candidates</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No job openings found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="candidates" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Job Position</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={candidate.avatar} />
                              <AvatarFallback>
                                {candidate.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{candidate.jobTitle}</span>
                            <span className="text-xs text-muted-foreground">
                              {candidate.jobId}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{format(new Date(candidate.appliedDate), "PP")}</span>
                            <span className="text-xs text-muted-foreground">
                              {differenceInDays(new Date(), new Date(candidate.appliedDate))} days ago
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                              ${candidate.status === "screening" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                              ${candidate.status === "interview" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                              ${candidate.status === "offered" ? "bg-green-50 text-green-700 border-green-200" : ""}
                              ${candidate.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" : ""}
                            `}
                          >
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <FileText className="h-4 w-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Candidate Profile</DialogTitle>
                                <DialogDescription>
                                  Detailed information about {candidate.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 py-4">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback>
                                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                                    <p className="text-muted-foreground">{candidate.email}</p>
                                    <div className="mt-2">
                                      <Badge
                                        variant="outline"
                                        className={`
                                          ${candidate.status === "screening" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                                          ${candidate.status === "interview" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                                          ${candidate.status === "offered" ? "bg-green-50 text-green-700 border-green-200" : ""}
                                          ${candidate.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" : ""}
                                        `}
                                      >
                                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-sm font-medium">Applied For</h4>
                                    <p>{candidate.jobTitle}</p>
                                    <p className="text-xs text-muted-foreground">{candidate.jobId}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Applied Date</h4>
                                    <p>{format(new Date(candidate.appliedDate), "PPP")}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {differenceInDays(new Date(), new Date(candidate.appliedDate))} days ago
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Experience</h4>
                                  <p>{candidate.experience}</p>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map((skill, index) => (
                                      <Badge key={index} variant="secondary">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Resume</h4>
                                  <div className="border rounded-md p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                                      <span>resume_michael_rodriguez.pdf</span>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                                  <Textarea 
                                    placeholder="Add notes about this candidate..." 
                                    rows={3}
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </div>
                              <DialogFooter className="gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                      Update Status
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Move to Screening</DropdownMenuItem>
                                    <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                                    <DropdownMenuItem>Send Offer</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Button>Schedule Interview</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                              <DropdownMenuItem>Send Email</DropdownMenuItem>
                              <DropdownMenuItem>Add Note</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pipeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Pipeline</CardTitle>
                <CardDescription>
                  Overview of candidates in each stage of the hiring process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Screening</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {candidates.filter(c => c.status === "screening").length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {candidates.filter(c => c.status === "screening").length} candidates
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        {candidates
                          .filter(c => c.status === "screening")
                          .map(candidate => (
                            <div key={candidate.id} className="bg-muted p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback>
                                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">
                                    {candidate.name}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {candidate.jobTitle}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Interview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {candidates.filter(c => c.status === "interview").length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {candidates.filter(c => c.status === "interview").length} candidates
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        {candidates
                          .filter(c => c.status === "interview")
                          .map(candidate => (
                            <div key={candidate.id} className="bg-muted p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback>
                                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">
                                    {candidate.name}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {candidate.jobTitle}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Offer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {candidates.filter(c => c.status === "offered").length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {candidates.filter(c => c.status === "offered").length} candidates
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        {candidates
                          .filter(c => c.status === "offered")
                          .map(candidate => (
                            <div key={candidate.id} className="bg-muted p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback>
                                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">
                                    {candidate.name}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {candidate.jobTitle}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {candidates.filter(c => c.status === "rejected").length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {candidates.filter(c => c.status === "rejected").length} candidates
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        {candidates
                          .filter(c => c.status === "rejected")
                          .map(candidate => (
                            <div key={candidate.id} className="bg-muted p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback>
                                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">
                                    {candidate.name}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {candidate.jobTitle}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Recruitment;
