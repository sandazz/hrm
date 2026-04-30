import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employee/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::index
* @see app/Http/Controllers/Employee/LeaveController.php:20
* @route '/employee/leave'
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
* @see \App\Http\Controllers\Employee\LeaveController::store
* @see app/Http/Controllers/Employee/LeaveController.php:39
* @route '/employee/leave'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/employee/leave',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\LeaveController::store
* @see app/Http/Controllers/Employee/LeaveController.php:39
* @route '/employee/leave'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\LeaveController::store
* @see app/Http/Controllers/Employee/LeaveController.php:39
* @route '/employee/leave'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::store
* @see app/Http/Controllers/Employee/LeaveController.php:39
* @route '/employee/leave'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::store
* @see app/Http/Controllers/Employee/LeaveController.php:39
* @route '/employee/leave'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Employee\LeaveController::cancel
* @see app/Http/Controllers/Employee/LeaveController.php:91
* @route '/employee/leave/{leave}/cancel'
*/
export const cancel = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: cancel.url(args, options),
    method: 'delete',
})

cancel.definition = {
    methods: ["delete"],
    url: '/employee/leave/{leave}/cancel',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Employee\LeaveController::cancel
* @see app/Http/Controllers/Employee/LeaveController.php:91
* @route '/employee/leave/{leave}/cancel'
*/
cancel.url = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leave: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { leave: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            leave: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        leave: typeof args.leave === 'object'
        ? args.leave.id
        : args.leave,
    }

    return cancel.definition.url
            .replace('{leave}', parsedArgs.leave.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\LeaveController::cancel
* @see app/Http/Controllers/Employee/LeaveController.php:91
* @route '/employee/leave/{leave}/cancel'
*/
cancel.delete = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: cancel.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::cancel
* @see app/Http/Controllers/Employee/LeaveController.php:91
* @route '/employee/leave/{leave}/cancel'
*/
const cancelForm = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Employee\LeaveController::cancel
* @see app/Http/Controllers/Employee/LeaveController.php:91
* @route '/employee/leave/{leave}/cancel'
*/
cancelForm.delete = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

cancel.form = cancelForm

const leave = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    cancel: Object.assign(cancel, cancel),
}

export default leave