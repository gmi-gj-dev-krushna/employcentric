
import SuperAdminDashboardLayout from "@/components/layouts/superadmin/SuperAdminDashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Shield, 
  Globe, 
  MailIcon, 
  ServerIcon, 
  Settings, 
  Sliders 
} from "lucide-react";

const SystemSettings = () => {
  return (
    <SuperAdminDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure global system parameters and settings
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-5 h-auto">
            <TabsTrigger value="general" className="py-2">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="py-2">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="database" className="py-2">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="email" className="py-2">
              <MailIcon className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="integrations" className="py-2">
              <Sliders className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Basic configuration options for the entire platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Platform Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">System Name</p>
                        <p className="text-sm text-muted-foreground">EmployCentric HRMS</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">System Version</p>
                        <p className="text-sm text-muted-foreground">v2.4.5</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">System URL</p>
                        <p className="text-sm text-muted-foreground">https://employcentric.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Localization</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Default Language</p>
                        <p className="text-sm text-muted-foreground">English (US)</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Default Timezone</p>
                        <p className="text-sm text-muted-foreground">UTC</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Date Format</p>
                        <p className="text-sm text-muted-foreground">MM/DD/YYYY</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Server Configuration</CardTitle>
                <CardDescription>
                  Configuration settings for system servers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Application Server</CardTitle>
                          <ServerIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Node.js v18.4.0</p>
                        <p className="text-sm text-muted-foreground">Memory: 4GB / 8GB</p>
                        <p className="text-sm text-muted-foreground">Load: 42%</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Database Server</CardTitle>
                          <Database className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">MongoDB v6.0</p>
                        <p className="text-sm text-muted-foreground">Storage: 54GB / 100GB</p>
                        <p className="text-sm text-muted-foreground">Connections: 218</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">CDN Configuration</CardTitle>
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Provider: CloudFront</p>
                        <p className="text-sm text-muted-foreground">Regions: 3</p>
                        <p className="text-sm text-muted-foreground">Cache TTL: 1 hour</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure system security parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Security settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>
                  Configure database settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Database configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email server and templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Email settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Configure third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Integration settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminDashboardLayout>
  );
};

export default SystemSettings;
