import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Building2,
    CalendarCheck,
    CalendarClock,
    CreditCard,
    Fingerprint,
    LayoutDashboard,
    Settings,
    ShieldCheck,
    Upload,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import * as adminRoutes from '@/routes/admin';
import * as adminEmployees from '@/routes/admin/employees';
import * as adminDepartments from '@/routes/admin/departments';
import * as adminLeave from '@/routes/admin/leave';
import * as adminPayroll from '@/routes/admin/payroll';
import * as adminFingerprint from '@/routes/admin/fingerprint';
import * as adminAttImport from '@/routes/admin/attendance-import';
import * as adminReports from '@/routes/admin/reports';
import * as adminSettings from '@/routes/admin/settings';
import * as adminUsers from '@/routes/admin/users';
import * as hrRoutes from '@/routes/hr';
import * as hrAttendance from '@/routes/hr/attendance';
import * as hrLeave from '@/routes/hr/leave';
import * as empRoutes from '@/routes/employee';
import * as empLeave from '@/routes/employee/leave';
import * as empPayroll from '@/routes/employee/payroll';
import type { NavItem } from '@/types';

const adminNav: NavItem[] = [
    { title: 'Dashboard', href: adminRoutes.dashboard(), icon: LayoutDashboard },
    { title: 'Employees', href: adminEmployees.index(), icon: Users },
    { title: 'Departments', href: adminDepartments.index(), icon: Building2 },
    { title: 'Leave', href: adminLeave.index(), icon: CalendarClock },
    { title: 'Payroll', href: adminPayroll.index(), icon: CreditCard },
    { title: 'Fingerprint', href: adminFingerprint.index(), icon: Fingerprint },
    { title: 'Import CSV', href: adminAttImport.index(), icon: Upload },
    { title: 'Att. Report', href: adminReports.attendance(), icon: BarChart3 },
    { title: 'Pay. Report', href: adminReports.payroll(), icon: BarChart3 },
    { title: 'Settings', href: adminSettings.index(), icon: Settings },
    { title: 'Users', href: adminUsers.index(), icon: ShieldCheck },
];

const hrNav: NavItem[] = [
    { title: 'Dashboard', href: hrRoutes.dashboard(), icon: LayoutDashboard },
    { title: 'Attendance', href: hrAttendance.index(), icon: CalendarCheck },
    { title: 'Leave', href: hrLeave.index(), icon: CalendarClock },
];

const employeeNav: NavItem[] = [
    { title: 'Dashboard', href: empRoutes.dashboard(), icon: LayoutDashboard },
    { title: 'Leave', href: empLeave.index(), icon: CalendarClock },
    { title: 'Payslips', href: empPayroll.index(), icon: CreditCard },
];

const roleNavMap: Record<string, NavItem[]> = {
    admin: adminNav,
    hr: hrNav,
    employee: employeeNav,
};

const roleTitleMap: Record<string, string> = {
    admin: 'Admin Portal',
    hr: 'HR Portal',
    employee: 'My Portal',
};

export function HrmSidebar() {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
    const role = auth.user.role ?? 'employee';
    const nav = roleNavMap[role] ?? employeeNav;
    const homeHref = nav[0]?.href ?? '/';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={nav} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
