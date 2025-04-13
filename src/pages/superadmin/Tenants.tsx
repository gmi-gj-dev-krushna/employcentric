
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, ShieldCheck, Users, PlusCircle, Clock, CheckCircle } from "lucide-react";
import { TenantForm } from "@/components/tenants/TenantForm";
import { TenantFilters } from "@/components/tenants/TenantFilters";
import { TenantActionMenu } from "@/components/tenants/TenantActionMenu";
import { TenantFormData, Tenant } from "@/api/tenantApi";
import { useToast } from "@/components/ui/use-toast";

// Sample tenant data
const tenants = [
  { id: "t-1", name: "Acme Corporation", company: "Acme Inc.", email: "contact@acme.com", users: 125, plan: "Enterprise", status: "Active", createdAt: "2023-01-15" },
  { id: "t-2", name: "Globex Industries", company: "Globex Corp", email: "info@globex.com", users: 78, plan: "Professional", status: "Active", createdAt: "2023-02-20" },
  { id: "t-3", name: "Wayne Enterprises", company: "Wayne Corp", email: "contact@wayne.com", users: 203, plan: "Enterprise", status: "Active", createdAt: "2023-03-05" },
  { id: "t-4", name: "Stark Industries", company: "Stark Corp", email: "info@stark.com", users: 92, plan: "Professional", status: "Suspended", createdAt: "2023-03-18" },
  { id: "t-5", name: "Umbrella Corp", company: "Umbrella Inc", email: "contact@umbrella.com", users: 45, plan: "Basic", status: "Active", createdAt: "2023-04-02" },
];

const TenantsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filteredTenants, setFilteredTenants] = useState(tenants);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Handle creating a new tenant
  const handleCreateTenant = async (data: TenantFormData) => {
    try {
      console.log("Creating tenant with data:", data);
      // Here you would call the API to create the tenant
      // For now, we'll just simulate success
      toast({
        title: "Tenant Created",
        description: `Successfully created ${data.name}`,
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating tenant:", error);
      toast({
        title: "Error",
        description: "Failed to create tenant",
        variant: "destructive",
      });
    }
  };
  
  // Handle tenant editing
  const handleEditTenant = (tenant: Tenant) => {
    console.log("Edit tenant:", tenant);
    navigate(`/tenant-details/${tenant.id}`);
  };
  
  // Handle tenant deletion
  const handleDeleteTenant = async (id: string) => {
    try {
      console.log("Deleting tenant:", id);
      // Here you would call the API to delete the tenant
      // For now, we'll just simulate success
      toast({
        title: "Tenant Deleted",
        description: "Tenant has been successfully deleted",
      });
      setFilteredTenants(filteredTenants.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting tenant:", error);
      toast({
        title: "Error",
        description: "Failed to delete tenant",
        variant: "destructive",
      });
    }
  };
  
  // Handle tenant activation
  const handleActivateTenant = async (id: string) => {
    try {
      console.log("Activating tenant:", id);
      // Here you would call the API to activate the tenant
      // For now, we'll just simulate success
      toast({
        title: "Tenant Activated",
        description: "Tenant has been successfully activated",
      });
      setFilteredTenants(filteredTenants.map(t => 
        t.id === id ? { ...t, status: "Active" } : t
      ));
    } catch (error) {
      console.error("Error activating tenant:", error);
      toast({
        title: "Error",
        description: "Failed to activate tenant",
        variant: "destructive",
      });
    }
  };
  
  // Handle tenant suspension
  const handleSuspendTenant = async (id: string) => {
    try {
      console.log("Suspending tenant:", id);
      // Here you would call the API to suspend the tenant
      // For now, we'll just simulate success
      toast({
        title: "Tenant Suspended",
        description: "Tenant has been suspended",
      });
      setFilteredTenants(filteredTenants.map(t => 
        t.id === id ? { ...t, status: "Suspended" } : t
      ));
    } catch (error) {
      console.error("Error suspending tenant:", error);
      toast({
        title: "Error",
        description: "Failed to suspend tenant",
        variant: "destructive",
      });
    }
  };
  
  // Handle tenant user management
  const handleManageUsers = (id: string) => {
    navigate(`/tenant-user-management/${id}`);
  };
  
  // Handle tenant settings
  const handleManageSettings = (id: string) => {
    navigate(`/tenant-settings/${id}`);
  };
  
  // Handle search and filters
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTenants(tenants);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = tenants.filter(tenant => 
      tenant.name.toLowerCase().includes(lowerQuery) ||
      tenant.company.toLowerCase().includes(lowerQuery) ||
      tenant.email.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredTenants(filtered);
  };
  
  const handleFilterChange = (filter: string, value: string) => {
    if (value === "all") {
      setFilteredTenants(tenants);
      return;
    }
    
    let filtered;
    if (filter === "plan") {
      filtered = tenants.filter(tenant => 
        tenant.plan.toLowerCase() === value.toLowerCase()
      );
    } else if (filter === "status") {
      filtered = tenants.filter(tenant => 
        tenant.status.toLowerCase() === value.toLowerCase()
      );
    } else {
      filtered = tenants;
    }
    
    setFilteredTenants(filtered);
  };
  
  // Stats calculations
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === "Active").length;
  const pendingApprovals = 8; // Sample data
  const totalUsers = tenants.reduce((sum, tenant) => sum + tenant.users, 0);
  
  return (
    <SuperAdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tenant Management</h1>
            <p className="text-muted-foreground">
              Manage all organizations using your HRMS platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate('/tenant-approvals')}
            >
              <CheckCircle className="h-4 w-4" />
              Pending Approvals
              {pendingApprovals > 0 && (
                <Badge className="ml-1">{pendingApprovals}</Badge>
              )}
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsFormOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              Add New Tenant
            </Button>
          </div>
        </div>

        <TenantFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTenants}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTenants}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApprovals}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Tenants</CardTitle>
            <CardDescription>Organizations registered on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id} className="cursor-pointer" onClick={() => navigate(`/tenant-details/${tenant.id}`)}>
                    <TableCell className="font-medium">{tenant.name}</TableCell>
                    <TableCell>{tenant.email}</TableCell>
                    <TableCell>{tenant.users}</TableCell>
                    <TableCell>
                      <Badge variant={
                        tenant.plan === "Enterprise" 
                          ? "default" 
                          : tenant.plan === "Professional" 
                            ? "outline" 
                            : "secondary"
                      }>
                        {tenant.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        tenant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{tenant.createdAt}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <TenantActionMenu 
                        tenant={tenant as Tenant}
                        onEdit={handleEditTenant}
                        onDelete={handleDeleteTenant}
                        onActivate={handleActivateTenant}
                        onSuspend={handleSuspendTenant}
                        onManageUsers={handleManageUsers}
                        onManageSettings={handleManageSettings}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredTenants.length}</strong> of <strong>{tenants.length}</strong> tenants
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Tenant Creation Form */}
      <TenantForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateTenant}
      />
    </SuperAdminDashboardLayout>
  );
};

export default TenantsPage;
