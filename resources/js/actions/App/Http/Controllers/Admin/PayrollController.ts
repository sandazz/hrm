import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/payroll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::index
* @see app/Http/Controllers/Admin/PayrollController.php:22
* @route '/admin/payroll'
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
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
export const show = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/payroll/{payroll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
show.url = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payroll: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payroll: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payroll: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payroll: typeof args.payroll === 'object'
        ? args.payroll.id
        : args.payroll,
    }

    return show.definition.url
            .replace('{payroll}', parsedArgs.payroll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
show.get = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
show.head = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
const showForm = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
showForm.get = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
showForm.head = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
export const download = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/payroll/{payroll}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
download.url = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payroll: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payroll: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payroll: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payroll: typeof args.payroll === 'object'
        ? args.payroll.id
        : args.payroll,
    }

    return download.definition.url
            .replace('{payroll}', parsedArgs.payroll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
download.get = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
download.head = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
const downloadForm = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
downloadForm.get = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
downloadForm.head = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::generate
* @see app/Http/Controllers/Admin/PayrollController.php:33
* @route '/admin/payroll/generate'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/admin/payroll/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::generate
* @see app/Http/Controllers/Admin/PayrollController.php:33
* @route '/admin/payroll/generate'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::generate
* @see app/Http/Controllers/Admin/PayrollController.php:33
* @route '/admin/payroll/generate'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::generate
* @see app/Http/Controllers/Admin/PayrollController.php:33
* @route '/admin/payroll/generate'
*/
const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::generate
* @see app/Http/Controllers/Admin/PayrollController.php:33
* @route '/admin/payroll/generate'
*/
generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

generate.form = generateForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::generateBulk
* @see app/Http/Controllers/Admin/PayrollController.php:54
* @route '/admin/payroll/generate-bulk'
*/
export const generateBulk = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateBulk.url(options),
    method: 'post',
})

generateBulk.definition = {
    methods: ["post"],
    url: '/admin/payroll/generate-bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::generateBulk
* @see app/Http/Controllers/Admin/PayrollController.php:54
* @route '/admin/payroll/generate-bulk'
*/
generateBulk.url = (options?: RouteQueryOptions) => {
    return generateBulk.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::generateBulk
* @see app/Http/Controllers/Admin/PayrollController.php:54
* @route '/admin/payroll/generate-bulk'
*/
generateBulk.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateBulk.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::generateBulk
* @see app/Http/Controllers/Admin/PayrollController.php:54
* @route '/admin/payroll/generate-bulk'
*/
const generateBulkForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateBulk.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::generateBulk
* @see app/Http/Controllers/Admin/PayrollController.php:54
* @route '/admin/payroll/generate-bulk'
*/
generateBulkForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateBulk.url(options),
    method: 'post',
})

generateBulk.form = generateBulkForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
export const markPaid = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

markPaid.definition = {
    methods: ["post"],
    url: '/admin/payroll/{payroll}/mark-paid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
markPaid.url = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payroll: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payroll: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payroll: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payroll: typeof args.payroll === 'object'
        ? args.payroll.id
        : args.payroll,
    }

    return markPaid.definition.url
            .replace('{payroll}', parsedArgs.payroll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
markPaid.post = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
const markPaidForm = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markPaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
markPaidForm.post = (args: { payroll: number | { id: number } } | [payroll: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markPaid.url(args, options),
    method: 'post',
})

markPaid.form = markPaidForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::storeComponent
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
export const storeComponent = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeComponent.url(args, options),
    method: 'post',
})

storeComponent.definition = {
    methods: ["post"],
    url: '/admin/employees/{employee}/components',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::storeComponent
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
storeComponent.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeComponent.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::storeComponent
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
storeComponent.post = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeComponent.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::storeComponent
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
const storeComponentForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeComponent.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::storeComponent
* @see app/Http/Controllers/Admin/PayrollController.php:106
* @route '/admin/employees/{employee}/components'
*/
storeComponentForm.post = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeComponent.url(args, options),
    method: 'post',
})

storeComponent.form = storeComponentForm

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroyComponent
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
export const destroyComponent = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyComponent.url(args, options),
    method: 'delete',
})

destroyComponent.definition = {
    methods: ["delete"],
    url: '/admin/salary-components/{component}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroyComponent
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
destroyComponent.url = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyComponent.definition.url
            .replace('{component}', parsedArgs.component.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroyComponent
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
destroyComponent.delete = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyComponent.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroyComponent
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
const destroyComponentForm = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyComponent.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::destroyComponent
* @see app/Http/Controllers/Admin/PayrollController.php:120
* @route '/admin/salary-components/{component}'
*/
destroyComponentForm.delete = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyComponent.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyComponent.form = destroyComponentForm

const PayrollController = { index, show, download, generate, generateBulk, markPaid, storeComponent, destroyComponent }

export default PayrollController