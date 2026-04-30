import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/settings/allowances',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
export const destroy = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/settings/allowances/{component}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
destroy.url = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { component: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { component: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            component: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        component: typeof args.component === 'object'
        ? args.component.id
        : args.component,
    }

    return destroy.definition.url
            .replace('{component}', parsedArgs.component.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
destroy.delete = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
const destroyForm = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
destroyForm.delete = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const allowances = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default allowances