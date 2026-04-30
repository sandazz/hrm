import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import component from './component'
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
export const show = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
show.url = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
show.get = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
show.head = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
const showForm = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
showForm.get = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::show
* @see app/Http/Controllers/Admin/PayrollController.php:76
* @route '/admin/payroll/{payroll}'
*/
showForm.head = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
export const download = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
download.url = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
download.get = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
download.head = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
const downloadForm = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
downloadForm.get = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::download
* @see app/Http/Controllers/Admin/PayrollController.php:83
* @route '/admin/payroll/{payroll}/download'
*/
downloadForm.head = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
export const markPaid = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
markPaid.url = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
markPaid.post = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
const markPaidForm = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markPaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PayrollController::markPaid
* @see app/Http/Controllers/Admin/PayrollController.php:70
* @route '/admin/payroll/{payroll}/mark-paid'
*/
markPaidForm.post = (args: { payroll: string | number | { id: string | number } } | [payroll: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markPaid.url(args, options),
    method: 'post',
})

markPaid.form = markPaidForm

const payroll = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    download: Object.assign(download, download),
    generate: Object.assign(generate, generate),
    generateBulk: Object.assign(generateBulk, generateBulk),
    markPaid: Object.assign(markPaid, markPaid),
    component: Object.assign(component, component),
}

export default payroll