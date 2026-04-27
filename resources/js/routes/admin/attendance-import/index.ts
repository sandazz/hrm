import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/attendance-import',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::index
* @see app/Http/Controllers/Admin/AttendanceImportController.php:17
* @route '/admin/attendance-import'
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
* @see \App\Http\Controllers\Admin\AttendanceImportController::store
* @see app/Http/Controllers/Admin/AttendanceImportController.php:26
* @route '/admin/attendance-import'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/attendance-import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::store
* @see app/Http/Controllers/Admin/AttendanceImportController.php:26
* @route '/admin/attendance-import'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::store
* @see app/Http/Controllers/Admin/AttendanceImportController.php:26
* @route '/admin/attendance-import'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::store
* @see app/Http/Controllers/Admin/AttendanceImportController.php:26
* @route '/admin/attendance-import'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::store
* @see app/Http/Controllers/Admin/AttendanceImportController.php:26
* @route '/admin/attendance-import'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
export const show = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/attendance-import/{import}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
show.url = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { import: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { import: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            import: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        import: typeof args.import === 'object'
        ? args.import.id
        : args.import,
    }

    return show.definition.url
            .replace('{import}', parsedArgs.import.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
show.get = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
show.head = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
const showForm = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
showForm.get = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AttendanceImportController::show
* @see app/Http/Controllers/Admin/AttendanceImportController.php:48
* @route '/admin/attendance-import/{import}'
*/
showForm.head = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const attendanceImport = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
}

export default attendanceImport