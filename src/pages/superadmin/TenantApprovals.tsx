
import { useState } from "react";
import SuperAdminDashboardLayout from "@/components/layouts/superadmin/SuperAdminDashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample data for pending approvals
const pendingRequests = [
  { id: 1, company: "Acme Inc", email: "admin@acme.com", name: "John Smith", status: "pending", date: "2023-04-02" },
  { id: 2, company: "TechSolutions", email: "admin@techsolutions.com", name: "Sarah Johnson", status: "pending", date: "2023-04-01" },
  { id: 3, company: "Global Services", email: "admin@globalservices.com", name: "Michael Brown", status: "pending", date: "2023-03-31" },
];

// Sample data for approved tenants
const approvedTenants = [
  { id: 4, company: "Quantum Innovations", email: "admin@quantum.com", name: "Taylor Jones", status: "approved", date: "2023-03-30" },
  { id: 5, company: "Alpine Software", email: "contact@alpine.com", name: "Casey Williams", status: "approved", date: "2023-03-29" },
];

const recentRejections = [
  { id: 6, company: "Fake Company LLC", email: "suspicious@example.com", name: "Unknown Person", status: "rejected", reason: "Suspicious information", date: "2023-03-31" },
  { id: 7, company: "Test Organization", email: "test@test.com", name: "Test User", status: "rejected", reason: "Test submission", date: "2023-03-28" },
];

const TenantApprovals = () => {
  const { toast } = useToast();
  const [activeRequests, setActiveRequests] = useState(pendingRequests);
  
  const handleApprove = (id: number) => {
    toast({
      title: "Tenant Approved",
      description: "The tenant registration has been approved and the account has been activated.",
    });
    setActiveRequests(activeRequests.filter(request => request.id !== id));
  };
  
  const handleReject = (id: number) => {
    toast({
      title: "Tenant Rejected",
      description: "The tenant registration has been rejected.",
    });
    setActiveRequests(activeRequests.filter(request => request.id !== id));
  };
  
  return (
    <SuperAdminDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Approvals</h1>
          <p className="text-muted-foreground">
            Review and approve new tenant registrations
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Appro vals
              </CardTitle>
              <div className="h-4 w-4 bg-amber-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recently Approved
              </CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedTenants.length}</div>
              <p className="text-xs text-muted-foreground">
                In the past 7 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recently Rejected
              </CardTitle>
              <div className="h-4 w-4 bg-red-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentRejections.length}</div>
              <p className="text-xs text-muted-foreground">
                In the past 7 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({activeRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>
                  Tenant registrations awaiting your review and approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.company}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                            >
                              Approve
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Tenant Registration</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this tenant registration.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <Label htmlFor="rejection-reason">Reason</Label>
                                  <Textarea 
                                    id="rejection-reason"
                                    placeholder="Enter reason for rejection"
                                    className="mt-2"
                                  />
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(request.id)}
                                  >
                                    Reject Registration
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Tenants</CardTitle>
                <CardDescription>
                  Recently approved tenant registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.company}</TableCell>
                        <TableCell>{tenant.name}</TableCell>
                        <TableCell>{tenant.email}</TableCell>
                        <TableCell>{tenant.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            {tenant.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Registrations</CardTitle>
                <CardDescription>
                  Tenant registrations that were rejected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRejections.map((rejection) => (
                      <TableRow key={rejection.id}>
                        <TableCell className="font-medium">{rejection.company}</TableCell>
                        <TableCell>{rejection.name}</TableCell>
                        <TableCell>{rejection.email}</TableCell>
                        <TableCell>{rejection.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            {rejection.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{rejection.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminDashboardLayout>
  );
};

export default TenantApprovals;
