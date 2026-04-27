import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employee/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\DashboardController::index
* @see app/Http/Controllers/Employee/DashboardController.php:19
* @route '/employee/dashboard'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

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

const DashboardController = { index, checkIn, checkOut }

export default DashboardController