import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/fingerprint',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::index
* @see app/Http/Controllers/Admin/FingerprintController.php:23
* @route '/admin/fingerprint'
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
* @see \App\Http\Controllers\Admin\FingerprintController::store
* @see app/Http/Controllers/Admin/FingerprintController.php:40
* @route '/admin/fingerprint'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/fingerprint',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::store
* @see app/Http/Controllers/Admin/FingerprintController.php:40
* @route '/admin/fingerprint'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::store
* @see app/Http/Controllers/Admin/FingerprintController.php:40
* @route '/admin/fingerprint'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::store
* @see app/Http/Controllers/Admin/FingerprintController.php:40
* @route '/admin/fingerprint'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::store
* @see app/Http/Controllers/Admin/FingerprintController.php:40
* @route '/admin/fingerprint'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\FingerprintController::update
* @see app/Http/Controllers/Admin/FingerprintController.php:58
* @route '/admin/fingerprint/{device}'
*/
export const update = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/fingerprint/{device}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::update
* @see app/Http/Controllers/Admin/FingerprintController.php:58
* @route '/admin/fingerprint/{device}'
*/
update.url = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { device: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { device: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            device: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        device: typeof args.device === 'object'
        ? args.device.id
        : args.device,
    }

    return update.definition.url
            .replace('{device}', parsedArgs.device.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::update
* @see app/Http/Controllers/Admin/FingerprintController.php:58
* @route '/admin/fingerprint/{device}'
*/
update.put = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::update
* @see app/Http/Controllers/Admin/FingerprintController.php:58
* @route '/admin/fingerprint/{device}'
*/
const updateForm = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::update
* @see app/Http/Controllers/Admin/FingerprintController.php:58
* @route '/admin/fingerprint/{device}'
*/
updateForm.put = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\FingerprintController::destroy
* @see app/Http/Controllers/Admin/FingerprintController.php:77
* @route '/admin/fingerprint/{device}'
*/
export const destroy = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/fingerprint/{device}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::destroy
* @see app/Http/Controllers/Admin/FingerprintController.php:77
* @route '/admin/fingerprint/{device}'
*/
destroy.url = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { device: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { device: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            device: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        device: typeof args.device === 'object'
        ? args.device.id
        : args.device,
    }

    return destroy.definition.url
            .replace('{device}', parsedArgs.device.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::destroy
* @see app/Http/Controllers/Admin/FingerprintController.php:77
* @route '/admin/fingerprint/{device}'
*/
destroy.delete = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::destroy
* @see app/Http/Controllers/Admin/FingerprintController.php:77
* @route '/admin/fingerprint/{device}'
*/
const destroyForm = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::destroy
* @see app/Http/Controllers/Admin/FingerprintController.php:77
* @route '/admin/fingerprint/{device}'
*/
destroyForm.delete = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Admin\FingerprintController::sync
* @see app/Http/Controllers/Admin/FingerprintController.php:86
* @route '/admin/fingerprint/{device}/sync'
*/
export const sync = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/admin/fingerprint/{device}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::sync
* @see app/Http/Controllers/Admin/FingerprintController.php:86
* @route '/admin/fingerprint/{device}/sync'
*/
sync.url = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { device: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { device: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            device: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        device: typeof args.device === 'object'
        ? args.device.id
        : args.device,
    }

    return sync.definition.url
            .replace('{device}', parsedArgs.device.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::sync
* @see app/Http/Controllers/Admin/FingerprintController.php:86
* @route '/admin/fingerprint/{device}/sync'
*/
sync.post = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::sync
* @see app/Http/Controllers/Admin/FingerprintController.php:86
* @route '/admin/fingerprint/{device}/sync'
*/
const syncForm = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::sync
* @see app/Http/Controllers/Admin/FingerprintController.php:86
* @route '/admin/fingerprint/{device}/sync'
*/
syncForm.post = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(args, options),
    method: 'post',
})

sync.form = syncForm

/**
* @see \App\Http\Controllers\Admin\FingerprintController::syncNow
* @see app/Http/Controllers/Admin/FingerprintController.php:100
* @route '/admin/fingerprint/{device}/sync-now'
*/
export const syncNow = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncNow.url(args, options),
    method: 'post',
})

syncNow.definition = {
    methods: ["post"],
    url: '/admin/fingerprint/{device}/sync-now',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::syncNow
* @see app/Http/Controllers/Admin/FingerprintController.php:100
* @route '/admin/fingerprint/{device}/sync-now'
*/
syncNow.url = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { device: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { device: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            device: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        device: typeof args.device === 'object'
        ? args.device.id
        : args.device,
    }

    return syncNow.definition.url
            .replace('{device}', parsedArgs.device.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::syncNow
* @see app/Http/Controllers/Admin/FingerprintController.php:100
* @route '/admin/fingerprint/{device}/sync-now'
*/
syncNow.post = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncNow.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::syncNow
* @see app/Http/Controllers/Admin/FingerprintController.php:100
* @route '/admin/fingerprint/{device}/sync-now'
*/
const syncNowForm = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: syncNow.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::syncNow
* @see app/Http/Controllers/Admin/FingerprintController.php:100
* @route '/admin/fingerprint/{device}/sync-now'
*/
syncNowForm.post = (args: { device: string | number | { id: string | number } } | [device: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: syncNow.url(args, options),
    method: 'post',
})

syncNow.form = syncNowForm

/**
* @see \App\Http\Controllers\Admin\FingerprintController::processLogs
* @see app/Http/Controllers/Admin/FingerprintController.php:115
* @route '/admin/fingerprint/process-logs'
*/
export const processLogs = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processLogs.url(options),
    method: 'post',
})

processLogs.definition = {
    methods: ["post"],
    url: '/admin/fingerprint/process-logs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::processLogs
* @see app/Http/Controllers/Admin/FingerprintController.php:115
* @route '/admin/fingerprint/process-logs'
*/
processLogs.url = (options?: RouteQueryOptions) => {
    return processLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::processLogs
* @see app/Http/Controllers/Admin/FingerprintController.php:115
* @route '/admin/fingerprint/process-logs'
*/
processLogs.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processLogs.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::processLogs
* @see app/Http/Controllers/Admin/FingerprintController.php:115
* @route '/admin/fingerprint/process-logs'
*/
const processLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: processLogs.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::processLogs
* @see app/Http/Controllers/Admin/FingerprintController.php:115
* @route '/admin/fingerprint/process-logs'
*/
processLogsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: processLogs.url(options),
    method: 'post',
})

processLogs.form = processLogsForm

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
export const logs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/admin/fingerprint/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
logs.url = (options?: RouteQueryOptions) => {
    return logs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
logs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
logs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
const logsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
logsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FingerprintController::logs
* @see app/Http/Controllers/Admin/FingerprintController.php:125
* @route '/admin/fingerprint/logs'
*/
logsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

logs.form = logsForm

const FingerprintController = { index, store, update, destroy, sync, syncNow, processLogs, logs }

export default FingerprintController