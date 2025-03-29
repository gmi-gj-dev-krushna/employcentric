
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfToday, endOfMonth, startOfMonth, eachDayOfInterval } from "date-fns";
import { CircleCheck, CircleX, Calendar as CalendarIcon, Clock, ArrowUpDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Mock data for attendance records
const attendanceRecords = [
  {
    id: 1,
    employeeId: "1",
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
    checkIn: "2023-07-24T08:27:33",
    checkOut: "2023-07-24T17:05:12",
    status: "present",
  },
  {
    id: 2,
    employeeId: "2",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
    checkIn: "2023-07-24T09:03:15",
    checkOut: "2023-07-24T18:12:33",
    status: "present",
  },
  {
    id: 3,
    employeeId: "3",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
    checkIn: null,
    checkOut: null,
    status: "absent",
  },
  {
    id: 4,
    employeeId: "4",
    name: "Emily Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
    checkIn: "2023-07-24T08:55:42",
    checkOut: "2023-07-24T17:30:21",
    status: "present",
  },
  {
    id: 5,
    employeeId: "5",
    name: "David Lee",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&auto=format",
    checkIn: "2023-07-24T08:15:00",
    checkOut: null,
    status: "present",
  },
];

// Generate mock data for monthly attendance summary
const generateMonthlySummary = () => {
  const today = startOfToday();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  return daysInMonth.map(day => ({
    date: format(day, 'yyyy-MM-dd'),
    status: Math.random() > 0.1 ? 'present' : Math.random() > 0.5 ? 'absent' : 'leave',
    checkIn: Math.random() > 0.1 ? `${format(day, 'yyyy-MM-dd')}T${String(8 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00` : null,
    checkOut: Math.random() > 0.1 ? `${format(day, 'yyyy-MM-dd')}T${String(16 + Math.floor(Math.random() * 3)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00` : null,
  }));
};

const monthlySummary = generateMonthlySummary();

const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  
  const handleCheckIn = () => {
    setIsCheckingIn(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Check-in successful",
        description: `You've checked in at ${format(new Date(), "hh:mm a")}`,
      });
      setIsCheckingIn(false);
    }, 1000);
  };
  
  const handleCheckOut = () => {
    setIsCheckingIn(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Check-out successful",
        description: `You've checked out at ${format(new Date(), "hh:mm a")}`,
      });
      setIsCheckingIn(false);
    }, 1000);
  };
  
  // Determine if user has already checked in/out based on mock data
  const userRecord = attendanceRecords.find(record => record.employeeId === user?.id);
  const hasCheckedIn = !!userRecord?.checkIn;
  const hasCheckedOut = !!userRecord?.checkOut;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            View and manage attendance records
          </p>
        </div>
        
        {/* Check-in/Check-out Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Time</p>
                  <p className="text-2xl font-semibold">
                    {format(new Date(), "hh:mm a")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(), "EEEE, MMMM do, yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleCheckIn} 
                  disabled={isCheckingIn || hasCheckedIn || hasCheckedOut}
                  className="w-32"
                >
                  {isCheckingIn ? (
                    <div className="h-4 w-4 border-2 border-current border-r-transparent animate-spin rounded-full mr-2" />
                  ) : (
                    <CircleCheck className="h-4 w-4 mr-2" />
                  )}
                  Check In
                </Button>
                <Button 
                  onClick={handleCheckOut} 
                  disabled={isCheckingIn || !hasCheckedIn || hasCheckedOut}
                  variant="outline"
                  className="w-32"
                >
                  {isCheckingIn ? (
                    <div className="h-4 w-4 border-2 border-current border-r-transparent animate-spin rounded-full mr-2" />
                  ) : (
                    <CircleX className="h-4 w-4 mr-2" />
                  )}
                  Check Out
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex flex-col-reverse md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">Team Attendance Today</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={record.avatar} />
                                  <AvatarFallback>
                                    {record.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{record.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {record.checkIn
                                ? format(new Date(record.checkIn), "hh:mm a")
                                : "--:--"}
                            </TableCell>
                            <TableCell>
                              {record.checkOut
                                ? format(new Date(record.checkOut), "hh:mm a")
                                : "--:--"}
                            </TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                record.status === "present"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {record.status === "present" ? "Present" : "Absent"}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="md:w-80">
                  <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
                  <div className="border rounded-md p-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal mb-4"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "MMMM yyyy") : "Select month"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Present:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-sm">
                            {monthlySummary.filter(d => d.status === 'present').length} days
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Absent:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="text-sm">
                            {monthlySummary.filter(d => d.status === 'absent').length} days
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Leave:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span className="text-sm">
                            {monthlySummary.filter(d => d.status === 'leave').length} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Detailed Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Attendance History</span>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlySummary.slice(0, 10).map((day, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(new Date(day.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      {day.checkIn ? format(new Date(day.checkIn), "hh:mm a") : "--:--"}
                    </TableCell>
                    <TableCell>
                      {day.checkOut ? format(new Date(day.checkOut), "hh:mm a") : "--:--"}
                    </TableCell>
                    <TableCell>
                      {day.checkIn && day.checkOut
                        ? ((new Date(day.checkOut).getTime() - new Date(day.checkIn).getTime()) / (1000 * 60 * 60)).toFixed(2) + " hrs"
                        : "--"}
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        day.status === "present"
                          ? "bg-green-100 text-green-800"
                          : day.status === "absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {day.status === "present"
                          ? "Present"
                          : day.status === "absent"
                          ? "Absent"
                          : "On Leave"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
