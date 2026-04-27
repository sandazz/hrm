import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import shifts from './shifts'
import leaveTypes from './leave-types'
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:18
* @route '/admin/settings'
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
* @see \App\Http\Controllers\Admin\SettingController::company
* @see app/Http/Controllers/Admin/SettingController.php:31
* @route '/admin/settings/company'
*/
export const company = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: company.url(options),
    method: 'post',
})

company.definition = {
    methods: ["post"],
    url: '/admin/settings/company',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::company
* @see app/Http/Controllers/Admin/SettingController.php:31
* @route '/admin/settings/company'
*/
company.url = (options?: RouteQueryOptions) => {
    return company.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::company
* @see app/Http/Controllers/Admin/SettingController.php:31
* @route '/admin/settings/company'
*/
company.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: company.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::company
* @see app/Http/Controllers/Admin/SettingController.php:31
* @route '/admin/settings/company'
*/
const companyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: company.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::company
* @see app/Http/Controllers/Admin/SettingController.php:31
* @route '/admin/settings/company'
*/
companyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: company.url(options),
    method: 'post',
})

company.form = companyForm

/**
* @see \App\Http\Controllers\Admin\SettingController::payroll
* @see app/Http/Controllers/Admin/SettingController.php:49
* @route '/admin/settings/payroll'
*/
export const payroll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payroll.url(options),
    method: 'post',
})

payroll.definition = {
    methods: ["post"],
    url: '/admin/settings/payroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::payroll
* @see app/Http/Controllers/Admin/SettingController.php:49
* @route '/admin/settings/payroll'
*/
payroll.url = (options?: RouteQueryOptions) => {
    return payroll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::payroll
* @see app/Http/Controllers/Admin/SettingController.php:49
* @route '/admin/settings/payroll'
*/
payroll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payroll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::payroll
* @see app/Http/Controllers/Admin/SettingController.php:49
* @route '/admin/settings/payroll'
*/
const payrollForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payroll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::payroll
* @see app/Http/Controllers/Admin/SettingController.php:49
* @route '/admin/settings/payroll'
*/
payrollForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payroll.url(options),
    method: 'post',
})

payroll.form = payrollForm

/**
* @see \App\Http\Controllers\Admin\SettingController::fingerprint
* @see app/Http/Controllers/Admin/SettingController.php:68
* @route '/admin/settings/fingerprint'
*/
export const fingerprint = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fingerprint.url(options),
    method: 'post',
})

fingerprint.definition = {
    methods: ["post"],
    url: '/admin/settings/fingerprint',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::fingerprint
* @see app/Http/Controllers/Admin/SettingController.php:68
* @route '/admin/settings/fingerprint'
*/
fingerprint.url = (options?: RouteQueryOptions) => {
    return fingerprint.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::fingerprint
* @see app/Http/Controllers/Admin/SettingController.php:68
* @route '/admin/settings/fingerprint'
*/
fingerprint.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fingerprint.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::fingerprint
* @see app/Http/Controllers/Admin/SettingController.php:68
* @route '/admin/settings/fingerprint'
*/
const fingerprintForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fingerprint.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::fingerprint
* @see app/Http/Controllers/Admin/SettingController.php:68
* @route '/admin/settings/fingerprint'
*/
fingerprintForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fingerprint.url(options),
    method: 'post',
})

fingerprint.form = fingerprintForm

const settings = {
    index: Object.assign(index, index),
    company: Object.assign(company, company),
    payroll: Object.assign(payroll, payroll),
    fingerprint: Object.assign(fingerprint, fingerprint),
    shifts: Object.assign(shifts, shifts),
    leaveTypes: Object.assign(leaveTypes, leaveTypes),
}

export default settings