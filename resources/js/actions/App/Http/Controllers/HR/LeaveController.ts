import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::index
* @see app/Http/Controllers/HR/LeaveController.php:17
* @route '/hr/leave'
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
* @see \App\Http\Controllers\HR\LeaveController::approve
* @see app/Http/Controllers/HR/LeaveController.php:25
* @route '/hr/leave/{leave}/approve'
*/
export const approve = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/hr/leave/{leave}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HR\LeaveController::approve
* @see app/Http/Controllers/HR/LeaveController.php:25
* @route '/hr/leave/{leave}/approve'
*/
approve.url = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{leave}', parsedArgs.leave.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\LeaveController::approve
* @see app/Http/Controllers/HR/LeaveController.php:25
* @route '/hr/leave/{leave}/approve'
*/
approve.post = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::approve
* @see app/Http/Controllers/HR/LeaveController.php:25
* @route '/hr/leave/{leave}/approve'
*/
const approveForm = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::approve
* @see app/Http/Controllers/HR/LeaveController.php:25
* @route '/hr/leave/{leave}/approve'
*/
approveForm.post = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\HR\LeaveController::reject
* @see app/Http/Controllers/HR/LeaveController.php:31
* @route '/hr/leave/{leave}/reject'
*/
export const reject = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/hr/leave/{leave}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HR\LeaveController::reject
* @see app/Http/Controllers/HR/LeaveController.php:31
* @route '/hr/leave/{leave}/reject'
*/
reject.url = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{leave}', parsedArgs.leave.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\LeaveController::reject
* @see app/Http/Controllers/HR/LeaveController.php:31
* @route '/hr/leave/{leave}/reject'
*/
reject.post = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::reject
* @see app/Http/Controllers/HR/LeaveController.php:31
* @route '/hr/leave/{leave}/reject'
*/
const rejectForm = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HR\LeaveController::reject
* @see app/Http/Controllers/HR/LeaveController.php:31
* @route '/hr/leave/{leave}/reject'
*/
rejectForm.post = (args: { leave: number | { id: number } } | [leave: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

const LeaveController = { index, approve, reject }

export default LeaveController