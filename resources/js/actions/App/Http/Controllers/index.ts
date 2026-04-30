import Api from './Api'
import Settings from './Settings'
import Admin from './Admin'
import HR from './HR'
import Employee from './Employee'

const Controllers = {
    Api: Object.assign(Api, Api),
    Settings: Object.assign(Settings, Settings),
    Admin: Object.assign(Admin, Admin),
    HR: Object.assign(HR, HR),
    Employee: Object.assign(Employee, Employee),
}

export default Controllers