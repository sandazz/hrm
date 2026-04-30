import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\BiometricAttendanceController::store
* @see app/Http/Controllers/Api/BiometricAttendanceController.php:27
* @route '/api/attendance/logs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/attendance/logs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\BiometricAttendanceController::store
* @see app/Http/Controllers/Api/BiometricAttendanceController.php:27
* @route '/api/attendance/logs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\BiometricAttendanceController::store
* @see app/Http/Controllers/Api/BiometricAttendanceController.php:27
* @route '/api/attendance/logs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\BiometricAttendanceController::store
* @see app/Http/Controllers/Api/BiometricAttendanceController.php:27
* @route '/api/attendance/logs'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\BiometricAttendanceController::store
* @see app/Http/Controllers/Api/BiometricAttendanceController.php:27
* @route '/api/attendance/logs'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const BiometricAttendanceController = { store }

export default BiometricAttendanceController