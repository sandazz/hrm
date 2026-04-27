import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\AttendanceController::index
* @see app/Http/Controllers/HR/AttendanceController.php:17
* @route '/hr/attendance'
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
* @see \App\Http\Controllers\HR\AttendanceController::store
* @see app/Http/Controllers/HR/AttendanceController.php:28
* @route '/hr/attendance'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hr/attendance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HR\AttendanceController::store
* @see app/Http/Controllers/HR/AttendanceController.php:28
* @route '/hr/attendance'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\AttendanceController::store
* @see app/Http/Controllers/HR/AttendanceController.php:28
* @route '/hr/attendance'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HR\AttendanceController::store
* @see app/Http/Controllers/HR/AttendanceController.php:28
* @route '/hr/attendance'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HR\AttendanceController::store
* @see app/Http/Controllers/HR/AttendanceController.php:28
* @route '/hr/attendance'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const attendance = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
}

export default attendance