
import { useState } from "react";
import SuperAdminDashboardLayout from "@/components/layouts/superadmin/SuperAdminDashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  CalendarIcon,
  CreditCard,
  Clock,
  Users,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MoreVertical,
  PlusCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Sample tenant data
const tenant = {
  id: 1,
  name: "Acme Corporation",
  email: "admin@acme.com",
  phone: "555-123-4567",
  address: "123 Business St, Tech City, 94043",
  website: "www.acmecorp.com",
  logo: "",
  plan: "Professional",
  status: "Active",
  users: 24,
  createdAt: "2023-01-15",
  lastPayment: "2023-04-01",
  nextPayment: "2023-05-01",
  paymentStatus: "Paid",
};

// Sample user data for this tenant
const users = [
  { id: 1, name: "John Doe", email: "john.doe@acme.com", role: "admin", status: "active", lastLogin: "2023-04-03" },
  { id: 2, name: "Jane Smith", email: "jane.smith@acme.com", role: "hr", status: "active", lastLogin: "2023-04-02" },
  { id: 3, name: "Robert Johnson", email: "robert@acme.com", role: "manager", status: "inactive", lastLogin: "2023-03-15" },
  { id: 4, name: "Emily Davis", email: "emily@acme.com", role: "employee", status: "active", lastLogin: "2023-04-03" },
  { id: 5, name: "Michael Brown", email: "michael@acme.com", role: "employee", status: "active", lastLogin: "2023-04-01" },
];

// Sample data for recent activities
const recentActivities = [
  { id: 1, user: "John Doe", action: "Added new employee", date: "2023-04-03 14:35" },
  { id: 2, user: "Jane Smith", action: "Generated payroll report", date: "2023-04-03 10:22" },
  { id: 3, user: "Alex Johnson", action: "Approved leave request", date: "2023-04-02 16:45" },
  { id: 4, user: "Sarah Williams", action: "Updated company policy", date: "2023-04-02 11:30" },
  { id: 5, user: "Michael Brown", action: "Logged attendance", date: "2023-04-01 09:15" },
];

const TenantDetails = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  
  return (
    <SuperAdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/tenants')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{tenant.name}</h1>
            <p className="text-muted-foreground">{tenant.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={tenant.logo} alt={tenant.name} />
                  <AvatarFallback className="text-2xl">{tenant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.website}</span>
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Registration Date</span>
                  <span>{tenant.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <Badge variant="default">{tenant.plan}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className={tenant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" onClick={() => navigate(`/tenant-settings/${tenantId}`)}>
                Manage Settings
              </Button>
              <Button className="w-full" onClick={() => navigate(`/tenant-user-management/${tenantId}`)}>
                Manage Users
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <CalendarIcon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Last Payment</p>
                  <p className="font-medium">{tenant.lastPayment}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <CreditCard className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <p className="font-medium text-green-600">{tenant.paymentStatus}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <CalendarIcon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <p className="font-medium">{tenant.nextPayment}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Active Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Employee Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Attendance Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Leave Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Payroll Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="text-muted-foreground">Performance Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="text-muted-foreground">Training Management</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Usage Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Active Users</span>
                    </div>
                    <p className="text-2xl font-bold">{tenant.users}</p>
                    <p className="text-sm text-muted-foreground">of 50 allowed</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Storage Used</span>
                    </div>
                    <p className="text-2xl font-bold">2.4 GB</p>
                    <p className="text-sm text-muted-foreground">of 10 GB allowed</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span>API Calls</span>
                    </div>
                    <p className="text-2xl font-bold">8,432</p>
                    <p className="text-sm text-muted-foreground">of 10,000 allowed</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Change Plan</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>
                    Users registered with this tenant
                  </CardDescription>
                </div>
                <Button onClick={() => navigate(`/tenant-user-management/${tenantId}`)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Deactivate User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <strong>5</strong> of <strong>{tenant.users}</strong> users
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions and events for this tenant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex justify-between border-b pb-3 last:border-0">
                      <div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <span className="font-medium cursor-help">{activity.user}</span>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-60">
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium">{activity.user}</p>
                              <p className="text-xs text-muted-foreground">User at {tenant.name}</p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminDashboardLayout>
  );
};

export default TenantDetails;
