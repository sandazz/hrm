import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:83
* @route '/admin/settings/shifts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/settings/shifts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:83
* @route '/admin/settings/shifts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:83
* @route '/admin/settings/shifts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:83
* @route '/admin/settings/shifts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:83
* @route '/admin/settings/shifts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:100
* @route '/admin/settings/shifts/{shift}'
*/
export const update = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/settings/shifts/{shift}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:100
* @route '/admin/settings/shifts/{shift}'
*/
update.url = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { shift: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: typeof args.shift === 'object'
        ? args.shift.id
        : args.shift,
    }

    return update.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:100
* @route '/admin/settings/shifts/{shift}'
*/
update.put = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:100
* @route '/admin/settings/shifts/{shift}'
*/
const updateForm = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:100
* @route '/admin/settings/shifts/{shift}'
*/
updateForm.put = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:118
* @route '/admin/settings/shifts/{shift}'
*/
export const destroy = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/settings/shifts/{shift}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:118
* @route '/admin/settings/shifts/{shift}'
*/
destroy.url = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { shift: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: typeof args.shift === 'object'
        ? args.shift.id
        : args.shift,
    }

    return destroy.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:118
* @route '/admin/settings/shifts/{shift}'
*/
destroy.delete = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:118
* @route '/admin/settings/shifts/{shift}'
*/
const destroyForm = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:118
* @route '/admin/settings/shifts/{shift}'
*/
destroyForm.delete = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const shifts = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default shifts