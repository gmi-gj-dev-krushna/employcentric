
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">
                EmployCentric
              </span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">{title}</h2>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          {children}
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-800 to-brand-600 flex flex-col items-center justify-center text-white p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Streamline Your HR Operations
            </h1>
            <p className="text-lg mb-6">
              A comprehensive platform for managing your workforce, 
              attendance tracking, leave management, payroll processing, 
              and recruitment all in one place.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Employee Management</h3>
                <p className="text-white/80">
                  Manage employee profiles, departments, and positions efficiently.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Attendance Tracking</h3>
                <p className="text-white/80">
                  Track employee attendance, work hours, and overtime seamlessly.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Leave Management</h3>
                <p className="text-white/80">
                  Handle leave requests, approvals, and balances with ease.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Payroll Processing</h3>
                <p className="text-white/80">
                  Generate and manage payroll with automatic calculations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
