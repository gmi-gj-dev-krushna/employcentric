
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Search,
  MoreVertical,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample user data
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin", status: "active", lastLogin: "2023-04-01" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "hr", status: "active", lastLogin: "2023-04-02" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "manager", status: "inactive", lastLogin: "2023-03-15" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "employee", status: "active", lastLogin: "2023-04-03" },
  { id: 5, name: "Michael Brown", email: "michael@example.com", role: "employee", status: "active", lastLogin: "2023-04-01" },
];

const TenantUserManagement = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
            <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">Acme Corporation (ID: {tenantId})</p>
          </div>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage users for this tenant
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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
                {filteredUsers.map((user) => (
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
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className={user.status === 'active' ? 'text-destructive' : 'text-green-600'}>
                            {user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
            </div>
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
      </div>
    </SuperAdminDashboardLayout>
  );
};

export default TenantUserManagement;
