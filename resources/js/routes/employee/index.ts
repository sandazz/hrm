import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import leave from './leave'
import payroll from './payroll'
/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/employee/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkIn
* @see app/Http/Controllers/Employee/DashboardController.php:34
* @route '/employee/check-in'
*/
export const checkIn = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkIn.url(options),
    method: 'post',
})

checkIn.definition = {
    methods: ["post"],
    url: '/employee/check-in',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkIn
* @see app/Http/Controllers/Employee/DashboardController.php:34
* @route '/employee/check-in'
*/
checkIn.url = (options?: RouteQueryOptions) => {
    return checkIn.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkIn
* @see app/Http/Controllers/Employee/DashboardController.php:34
* @route '/employee/check-in'
*/
checkIn.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkIn.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkIn
* @see app/Http/Controllers/Employee/DashboardController.php:34
* @route '/employee/check-in'
*/
const checkInForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkIn.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkIn
* @see app/Http/Controllers/Employee/DashboardController.php:34
* @route '/employee/check-in'
*/
checkInForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkIn.url(options),
    method: 'post',
})

checkIn.form = checkInForm

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkOut
* @see app/Http/Controllers/Employee/DashboardController.php:42
* @route '/employee/check-out'
*/
export const checkOut = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

checkOut.definition = {
    methods: ["post"],
    url: '/employee/check-out',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkOut
* @see app/Http/Controllers/Employee/DashboardController.php:42
* @route '/employee/check-out'
*/
checkOut.url = (options?: RouteQueryOptions) => {
    return checkOut.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkOut
* @see app/Http/Controllers/Employee/DashboardController.php:42
* @route '/employee/check-out'
*/
checkOut.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkOut
* @see app/Http/Controllers/Employee/DashboardController.php:42
* @route '/employee/check-out'
*/
const checkOutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkOut.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::checkOut
* @see app/Http/Controllers/Employee/DashboardController.php:42
* @route '/employee/check-out'
*/
checkOutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkOut.url(options),
    method: 'post',
})

checkOut.form = checkOutForm

const employee = {
    dashboard: Object.assign(dashboard, dashboard),
    checkIn: Object.assign(checkIn, checkIn),
    checkOut: Object.assign(checkOut, checkOut),
    leave: Object.assign(leave, leave),
    payroll: Object.assign(payroll, payroll),
}

export default employee