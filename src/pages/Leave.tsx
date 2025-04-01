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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays, addDays } from "date-fns";
import { Calendar as CalendarIcon, Check, X, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

// Mock data for leave requests
const leaveRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "John Smith",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
    leaveType: "Annual Leave",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    status: "approved",
    reason: "Family vacation",
    approvedBy: "Michael Manager",
    approvalDate: "2023-07-02",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
    leaveType: "Sick Leave",
    startDate: "2023-07-24",
    endDate: "2023-07-25",
    status: "pending",
    reason: "Not feeling well",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
    leaveType: "Personal Leave",
    startDate: "2023-08-10",
    endDate: "2023-08-12",
    status: "pending",
    reason: "Personal matter to attend to",
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Emily Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
    leaveType: "Annual Leave",
    startDate: "2023-09-05",
    endDate: "2023-09-15",
    status: "rejected",
    reason: "Family vacation",
    approvedBy: "Michael Manager",
    approvalDate: "2023-08-25",
    rejectionReason: "Critical project deadline during this period",
  },
];

// Mock data for leave balances
const leaveBalances = {
  annual: { total: 21, used: 12, remaining: 9 },
  sick: { total: 10, used: 3, remaining: 7 },
  personal: { total: 5, used: 1, remaining: 4 },
};

const LeaveManagement = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  
  const handleApprove = (id: number) => {
    toast({
      title: "Leave Approved",
      description: "The leave request has been approved successfully.",
    });
  };
  
  const handleReject = (id: number) => {
    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected.",
    });
  };
  
  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateRange.from || !dateRange.to || !leaveType || !reason) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });
    
    // Reset form
    setDateRange({ from: undefined, to: undefined });
    setLeaveType("");
    setReason("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
            <p className="text-muted-foreground">
              Request and manage leave for you and your team
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Request Leave</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Request Leave</DialogTitle>
                <DialogDescription>
                  Submit a new leave request for approval.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitLeave}>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <Select value={leaveType} onValueChange={setLeaveType}>
                      <SelectTrigger id="leaveType">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label>Date Range</Label>
                    <div className="grid gap-2">
                      <div className="flex flex-col">
                        <div className="mb-2">
                          <Label className="text-sm text-muted-foreground">
                            {dateRange.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "PPP")} -{" "}
                                  {format(dateRange.to, "PPP")}
                                </>
                              ) : (
                                format(dateRange.from, "PPP")
                              )
                            ) : (
                              "Select date range"
                            )}
                          </Label>
                        </div>
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          className="border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea 
                      id="reason" 
                      placeholder="Provide details about your leave request"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Annual Leave</CardTitle>
              <CardDescription>
                Regular paid vacation days
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Balance</span>
                <span className="font-medium">{leaveBalances.annual.remaining}/{leaveBalances.annual.total} days</span>
              </div>
              <Progress value={(leaveBalances.annual.used / leaveBalances.annual.total) * 100} />
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {leaveBalances.annual.used} days used
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sick Leave</CardTitle>
              <CardDescription>
                Time off for health reasons
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Balance</span>
                <span className="font-medium">{leaveBalances.sick.remaining}/{leaveBalances.sick.total} days</span>
              </div>
              <Progress value={(leaveBalances.sick.used / leaveBalances.sick.total) * 100} />
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {leaveBalances.sick.used} days used
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Personal Leave</CardTitle>
              <CardDescription>
                Short leaves for personal matters
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Balance</span>
                <span className="font-medium">{leaveBalances.personal.remaining}/{leaveBalances.personal.total} days</span>
              </div>
              <Progress value={(leaveBalances.personal.used / leaveBalances.personal.total) * 100} />
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {leaveBalances.personal.used} days used
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-auto w-full">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.avatar} />
                              <AvatarFallback>
                                {request.employeeName.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>{request.employeeName}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>
                              {format(new Date(request.startDate), "MMM d")} - {format(new Date(request.endDate), "MMM d, yyyy")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1} days
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                              ${request.status === "approved" ? "bg-green-50 text-green-700 border-green-200" : ""}
                              ${request.status === "pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
                              ${request.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" : ""}
                            `}
                          >
                            {request.status === "approved" && <Check className="mr-1 h-3 w-3" />}
                            {request.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                            {request.status === "rejected" && <X className="mr-1 h-3 w-3" />}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Leave Request Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarImage src={request.avatar} />
                                    <AvatarFallback>
                                      {request.employeeName.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{request.employeeName}</p>
                                    <Badge
                                      variant="outline"
                                      className={`mt-1
                                        ${request.status === "approved" ? "bg-green-50 text-green-700 border-green-200" : ""}
                                        ${request.status === "pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
                                        ${request.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" : ""}
                                      `}
                                    >
                                      {request.status === "approved" && <Check className="mr-1 h-3 w-3" />}
                                      {request.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                                      {request.status === "rejected" && <X className="mr-1 h-3 w-3" />}
                                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Leave Type</p>
                                    <p className="text-sm text-muted-foreground">{request.leaveType}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Duration</p>
                                    <p className="text-sm text-muted-foreground">
                                      {differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1} days
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Start Date</p>
                                    <p className="text-sm text-muted-foreground">
                                      {format(new Date(request.startDate), "MMMM d, yyyy")}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">End Date</p>
                                    <p className="text-sm text-muted-foreground">
                                      {format(new Date(request.endDate), "MMMM d, yyyy")}
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium">Reason</p>
                                  <p className="text-sm text-muted-foreground">{request.reason}</p>
                                </div>
                                
                                {request.status === "approved" && (
                                  <div>
                                    <p className="text-sm font-medium">Approved By</p>
                                    <p className="text-sm text-muted-foreground">
                                      {request.approvedBy} on {format(new Date(request.approvalDate!), "MMMM d, yyyy")}
                                    </p>
                                  </div>
                                )}
                                
                                {request.status === "rejected" && request.rejectionReason && (
                                  <div>
                                    <p className="text-sm font-medium">Rejection Reason</p>
                                    <p className="text-sm text-muted-foreground">{request.rejectionReason}</p>
                                  </div>
                                )}
                              </div>
                              
                              {request.status === "pending" && (
                                <DialogFooter className="gap-2">
                                  <Button onClick={() => handleReject(request.id)} variant="outline">Reject</Button>
                                  <Button onClick={() => handleApprove(request.id)}>Approve</Button>
                                </DialogFooter>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {request.status === "pending" && (
                            <>
                              <Button 
                                onClick={() => handleApprove(request.id)}
                                variant="ghost" 
                                size="sm" 
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button 
                                onClick={() => handleReject(request.id)}
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(request => request.status === "pending")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={request.avatar} />
                                <AvatarFallback>
                                  {request.employeeName.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>{request.employeeName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{request.leaveType}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {format(new Date(request.startDate), "MMM d")} - {format(new Date(request.endDate), "MMM d, yyyy")}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1} days
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              onClick={() => handleApprove(request.id)}
                              variant="ghost" 
                              size="sm" 
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button 
                              onClick={() => handleReject(request.id)}
                              variant="ghost" 
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave Request Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {/* Details content similar to "all" tab */}
                                </div>
                                <DialogFooter className="gap-2">
                                  <Button onClick={() => handleReject(request.id)} variant="outline">Reject</Button>
                                  <Button onClick={() => handleApprove(request.id)}>Approve</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approved" className="mt-4">
            {/* Similar implementation for approved leaves */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Approved By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(request => request.status === "approved")
                      .map((request) => (
                        <TableRow key={request.id}>
                          {/* Table content for approved leaves */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={request.avatar} />
                                <AvatarFallback>
                                  {request.employeeName.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>{request.employeeName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{request.leaveType}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {format(new Date(request.startDate), "MMM d")} - {format(new Date(request.endDate), "MMM d, yyyy")}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1} days
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{request.approvedBy}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave Request Details</DialogTitle>
                                </DialogHeader>
                                {/* Details content */}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-4">
            {/* Similar implementation for rejected leaves */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Rejection Reason</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(request => request.status === "rejected")
                      .map((request) => (
                        <TableRow key={request.id}>
                          {/* Table content for rejected leaves */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={request.avatar} />
                                <AvatarFallback>
                                  {request.employeeName.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>{request.employeeName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{request.leaveType}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {format(new Date(request.startDate), "MMM d")} - {format(new Date(request.endDate), "MMM d, yyyy")}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1} days
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{request.rejectionReason}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave Request Details</DialogTitle>
                                </DialogHeader>
                                {/* Details content */}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LeaveManagement;
