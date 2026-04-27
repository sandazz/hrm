import DashboardController from './DashboardController'
import EmployeeController from './EmployeeController'
import DepartmentController from './DepartmentController'
import LeaveController from './LeaveController'
import PayrollController from './PayrollController'
import FingerprintController from './FingerprintController'
import AttendanceImportController from './AttendanceImportController'
import ReportController from './ReportController'
import SettingController from './SettingController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    DepartmentController: Object.assign(DepartmentController, DepartmentController),
    LeaveController: Object.assign(LeaveController, LeaveController),
    PayrollController: Object.assign(PayrollController, PayrollController),
    FingerprintController: Object.assign(FingerprintController, FingerprintController),
    AttendanceImportController: Object.assign(AttendanceImportController, AttendanceImportController),
    ReportController: Object.assign(ReportController, ReportController),
    SettingController: Object.assign(SettingController, SettingController),
}

export default Admin