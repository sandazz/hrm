import DashboardController from './DashboardController'
import AttendanceController from './AttendanceController'
import LeaveController from './LeaveController'

const HR = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    AttendanceController: Object.assign(AttendanceController, AttendanceController),
    LeaveController: Object.assign(LeaveController, LeaveController),
}

export default HR