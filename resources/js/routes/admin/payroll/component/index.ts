import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PayrollController::store
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
export const store = (args: { employee: string | number | { id: string | number } } | [employee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/employees/{employee}/components',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::store
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
store.url = (args: { employee: string | number | { id: string | number } } | [employee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { employee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            employee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        employee: typeof args.employee === 'object'
        ? args.employee.id
        : args.employee,
    }

    return store.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::store
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
store.post = (args: { employee: string | number | { id: string | number } } | [employee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::store
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
const storeForm = (args: { employee: string | number | { id: string | number } } | [employee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::store
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
storeForm.post = (args: { employee: string | number | { id: string | number } } | [employee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroy
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
export const destroy = (args: { component: string | number | { id: string | number } } | [component: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/salary-components/{component}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroy
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
destroy.url = (args: { component: string | number | { id: string | number } } | [component: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\Admin\PayrollController::destroy
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
destroy.delete = (args: { component: string | number | { id: string | number } } | [component: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroy
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
const destroyForm = (args: { component: string | number | { id: string | number } } | [component: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroy
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
destroyForm.delete = (args: { component: string | number | { id: string | number } } | [component: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const component = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default component