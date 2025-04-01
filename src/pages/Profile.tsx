
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserRound, Mail, Building, Briefcase, Calendar, Clock, MapPin, Phone } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            View and manage your profile information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user?.name}</CardTitle>
              <CardDescription>
                <Badge className="capitalize">{user?.role}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Human Resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href="/settings">Edit Profile</a>
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  I am an experienced HR professional with a passion for creating positive workplace cultures. 
                  I specialize in employee relations, talent acquisition, and organizational development.
                  With over 5 years of experience in the field, I've helped companies improve their HR 
                  processes and employee satisfaction.
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="employment" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="employment">
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-sm font-medium">Employee ID</div>
                        <div className="text-sm text-muted-foreground">EMP{Math.floor(Math.random() * 10000)}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Department</div>
                        <div className="text-sm text-muted-foreground">Human Resources</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Position</div>
                        <div className="text-sm text-muted-foreground">HR Manager</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Reports To</div>
                        <div className="text-sm text-muted-foreground">John Smith (Director)</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Employment Type</div>
                        <div className="text-sm text-muted-foreground">Full Time</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Joining Date</div>
                        <div className="text-sm text-muted-foreground">15 Jan, 2022</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">HR Management</Badge>
                      <Badge variant="secondary">Recruitment</Badge>
                      <Badge variant="secondary">Employee Relations</Badge>
                      <Badge variant="secondary">Performance Management</Badge>
                      <Badge variant="secondary">Training & Development</Badge>
                      <Badge variant="secondary">Conflict Resolution</Badge>
                      <Badge variant="secondary">HRIS Systems</Badge>
                      <Badge variant="secondary">Employment Law</Badge>
                      <Badge variant="secondary">Benefits Administration</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-b-0">
                          <div className="mt-1 rounded-full bg-primary/10 p-1.5">
                            {i % 3 === 0 ? (
                              <Clock className="h-4 w-4 text-primary" />
                            ) : i % 3 === 1 ? (
                              <Calendar className="h-4 w-4 text-primary" />
                            ) : (
                              <Briefcase className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {i % 3 === 0
                                ? "Checked in at 8:30 AM"
                                : i % 3 === 1
                                ? "Submitted leave request"
                                : "Updated profile information"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {i + 1} day{i !== 0 ? "s" : ""} ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
