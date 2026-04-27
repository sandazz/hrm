import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import attendance from './attendance'
import leave from './leave'
/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/hr/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\DashboardController::dashboard
* @see app/Http/Controllers/HR/DashboardController.php:14
* @route '/hr/dashboard'
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

const hr = {
    dashboard: Object.assign(dashboard, dashboard),
    attendance: Object.assign(attendance, attendance),
    leave: Object.assign(leave, leave),
}

export default hr