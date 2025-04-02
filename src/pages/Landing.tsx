import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, UserCircle, Users, Clock, Calendar, CreditCard, UserPlus } from "lucide-react";
import PricingCard from "@/components/PricingCard";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Landing = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">EmployCentric</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-brand-900 to-brand-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Streamline Your HR Operations with EmployCentric
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80">
              A comprehensive HR management platform that helps you manage your workforce, track attendance, handle leave requests, process payroll, and streamline recruitment - all in one place.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-white text-brand-900 hover:bg-white/90">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" asChild className="bg-white text-brand-900 hover:bg-white/90">
                <Link to="/login">Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Comprehensive HR Management</h2>
            <p className="mt-4 text-muted-foreground">
              Our platform offers all the tools you need to efficiently manage your human resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
                <p className="text-muted-foreground">
                  Manage employee profiles, departments, and positions all in one place. Keep track of important employee information and documents.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
                <p className="text-muted-foreground">
                  Track employee attendance, work hours, and overtime with our intuitive system. Generate reports to analyze attendance patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Leave Management</h3>
                <p className="text-muted-foreground">
                  Streamline the leave request and approval process. Monitor leave balances and ensure adequate staffing at all times.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Payroll Processing</h3>
                <p className="text-muted-foreground">
                  Automate payroll calculations and generate payslips with our comprehensive payroll module. Handle taxes and deductions effortlessly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recruitment</h3>
                <p className="text-muted-foreground">
                  Manage your entire recruitment pipeline from job postings to onboarding. Track applicants and streamline the hiring process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Secure role-based access control ensures that users can only access information relevant to their position.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your HR operations?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of companies that use EmployCentric to streamline their HR processes and improve employee satisfaction.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Choose the plan that works best for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price={9}
              description="Perfect for small teams"
              features={[
                { text: "Employee Management" },
                { text: "Basic Attendance Tracking" },
                { text: "Leave Management" },
                { text: "Up to 25 employees" },
              ]}
              buttonText="Choose Starter"
              buttonVariant="outline"
              ctaLink="/register?plan=starter"
            />
            
            <PricingCard
              title="Professional"
              price={19}
              description="For growing businesses"
              features={[
                { text: "Everything in Starter" },
                { text: "Advanced Attendance Tracking" },
                { text: "Payroll Processing" },
                { text: "Basic Recruitment Tools" },
                { text: "Up to 100 employees" },
              ]}
              isPopular={true}
              buttonText="Choose Professional"
              buttonVariant="default"
              ctaLink="/register?plan=professional"
            />
            
            <PricingCard
              title="Enterprise"
              price={39}
              description="For large organizations"
              features={[
                { text: "Everything in Professional" },
                { text: "Advanced Analytics" },
                { text: "Custom Integrations" },
                { text: "Advanced Recruitment Suite" },
                { text: "Unlimited employees" },
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
              ctaLink="/register?plan=enterprise"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="mt-2 text-muted-foreground">
                Have questions or need assistance? We're here to help!
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first_name" className="text-sm font-medium">
                        First name
                      </label>
                      <Input id="first_name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last_name" className="text-sm font-medium">
                        Last name
                      </label>
                      <Input id="last_name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Integrations</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Guides</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Support</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-primary">EmployCentric</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © {new Date().getFullYear()} EmployCentric. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

// Helper component
const Input = ({ ...props }) => {
  return <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" {...props} />;
};

// Helper component
const Textarea = ({ ...props }) => {
  return <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" {...props} />;
};
