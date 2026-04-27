import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
export const attendance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/admin/reports/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
attendance.url = (options?: RouteQueryOptions) => {
    return attendance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
attendance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
attendance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
const attendanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: attendance.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
attendanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: attendance.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::attendance
* @see app/Http/Controllers/Admin/ReportController.php:18
* @route '/admin/reports/attendance'
*/
attendanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: attendance.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

attendance.form = attendanceForm

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
export const payroll = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payroll.url(options),
    method: 'get',
})

payroll.definition = {
    methods: ["get","head"],
    url: '/admin/reports/payroll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
payroll.url = (options?: RouteQueryOptions) => {
    return payroll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
payroll.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payroll.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
payroll.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payroll.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
const payrollForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payroll.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
payrollForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payroll.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::payroll
* @see app/Http/Controllers/Admin/ReportController.php:35
* @route '/admin/reports/payroll'
*/
payrollForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payroll.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

payroll.form = payrollForm

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
export const leave = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leave.url(options),
    method: 'get',
})

leave.definition = {
    methods: ["get","head"],
    url: '/admin/reports/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
leave.url = (options?: RouteQueryOptions) => {
    return leave.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
leave.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leave.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
leave.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leave.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
const leaveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leave.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
leaveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leave.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ReportController::leave
* @see app/Http/Controllers/Admin/ReportController.php:117
* @route '/admin/reports/leave'
*/
leaveForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leave.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

leave.form = leaveForm

const reports = {
    attendance: Object.assign(attendance, attendance),
    payroll: Object.assign(payroll, payroll),
    leave: Object.assign(leave, leave),
}

export default reports