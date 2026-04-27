import Settings from './Settings'
import Admin from './Admin'
import HR from './HR'
import Employee from './Employee'

const Controllers = {
    Settings: Object.assign(Settings, Settings),
    Admin: Object.assign(Admin, Admin),
    HR: Object.assign(HR, HR),
    Employee: Object.assign(Employee, Employee),
}

export default Controllers