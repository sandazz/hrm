import DashboardController from './DashboardController'
import LeaveController from './LeaveController'
import PayrollController from './PayrollController'

const Employee = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    LeaveController: Object.assign(LeaveController, LeaveController),
    PayrollController: Object.assign(PayrollController, PayrollController),
}

export default Employee