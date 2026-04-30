import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:21
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
* @see app/Http/Controllers/Admin/SettingController.php:21
* @route '/admin/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:21
* @route '/admin/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:21
* @route '/admin/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:21
* @route '/admin/settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:21
* @route '/admin/settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:21
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
* @see \App\Http\Controllers\Admin\SettingController::updateCompany
* @see app/Http/Controllers/Admin/SettingController.php:36
* @route '/admin/settings/company'
*/
export const updateCompany = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateCompany.url(options),
    method: 'post',
})

updateCompany.definition = {
    methods: ["post"],
    url: '/admin/settings/company',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::updateCompany
* @see app/Http/Controllers/Admin/SettingController.php:36
* @route '/admin/settings/company'
*/
updateCompany.url = (options?: RouteQueryOptions) => {
    return updateCompany.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::updateCompany
* @see app/Http/Controllers/Admin/SettingController.php:36
* @route '/admin/settings/company'
*/
updateCompany.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateCompany.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateCompany
* @see app/Http/Controllers/Admin/SettingController.php:36
* @route '/admin/settings/company'
*/
const updateCompanyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCompany.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateCompany
* @see app/Http/Controllers/Admin/SettingController.php:36
* @route '/admin/settings/company'
*/
updateCompanyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateCompany.url(options),
    method: 'post',
})

updateCompany.form = updateCompanyForm

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayroll
* @see app/Http/Controllers/Admin/SettingController.php:54
* @route '/admin/settings/payroll'
*/
export const updatePayroll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePayroll.url(options),
    method: 'post',
})

updatePayroll.definition = {
    methods: ["post"],
    url: '/admin/settings/payroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayroll
* @see app/Http/Controllers/Admin/SettingController.php:54
* @route '/admin/settings/payroll'
*/
updatePayroll.url = (options?: RouteQueryOptions) => {
    return updatePayroll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayroll
* @see app/Http/Controllers/Admin/SettingController.php:54
* @route '/admin/settings/payroll'
*/
updatePayroll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePayroll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayroll
* @see app/Http/Controllers/Admin/SettingController.php:54
* @route '/admin/settings/payroll'
*/
const updatePayrollForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePayroll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayroll
* @see app/Http/Controllers/Admin/SettingController.php:54
* @route '/admin/settings/payroll'
*/
updatePayrollForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePayroll.url(options),
    method: 'post',
})

updatePayroll.form = updatePayrollForm

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayeTax
* @see app/Http/Controllers/Admin/SettingController.php:73
* @route '/admin/settings/paye'
*/
export const updatePayeTax = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePayeTax.url(options),
    method: 'post',
})

updatePayeTax.definition = {
    methods: ["post"],
    url: '/admin/settings/paye',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayeTax
* @see app/Http/Controllers/Admin/SettingController.php:73
* @route '/admin/settings/paye'
*/
updatePayeTax.url = (options?: RouteQueryOptions) => {
    return updatePayeTax.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayeTax
* @see app/Http/Controllers/Admin/SettingController.php:73
* @route '/admin/settings/paye'
*/
updatePayeTax.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePayeTax.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayeTax
* @see app/Http/Controllers/Admin/SettingController.php:73
* @route '/admin/settings/paye'
*/
const updatePayeTaxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePayeTax.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updatePayeTax
* @see app/Http/Controllers/Admin/SettingController.php:73
* @route '/admin/settings/paye'
*/
updatePayeTaxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePayeTax.url(options),
    method: 'post',
})

updatePayeTax.form = updatePayeTaxForm

/**
* @see \App\Http\Controllers\Admin\SettingController::storeAllowance
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
export const storeAllowance = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAllowance.url(options),
    method: 'post',
})

storeAllowance.definition = {
    methods: ["post"],
    url: '/admin/settings/allowances',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::storeAllowance
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
storeAllowance.url = (options?: RouteQueryOptions) => {
    return storeAllowance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::storeAllowance
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
storeAllowance.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAllowance.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::storeAllowance
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
const storeAllowanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeAllowance.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::storeAllowance
* @see app/Http/Controllers/Admin/SettingController.php:89
* @route '/admin/settings/allowances'
*/
storeAllowanceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeAllowance.url(options),
    method: 'post',
})

storeAllowance.form = storeAllowanceForm

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyAllowance
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
export const destroyAllowance = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAllowance.url(args, options),
    method: 'delete',
})

destroyAllowance.definition = {
    methods: ["delete"],
    url: '/admin/settings/allowances/{component}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyAllowance
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
destroyAllowance.url = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyAllowance.definition.url
            .replace('{component}', parsedArgs.component.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyAllowance
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
destroyAllowance.delete = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAllowance.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyAllowance
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
const destroyAllowanceForm = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyAllowance.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyAllowance
* @see app/Http/Controllers/Admin/SettingController.php:104
* @route '/admin/settings/allowances/{component}'
*/
destroyAllowanceForm.delete = (args: { component: number | { id: number } } | [component: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyAllowance.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyAllowance.form = destroyAllowanceForm

/**
* @see \App\Http\Controllers\Admin\SettingController::updateFingerprint
* @see app/Http/Controllers/Admin/SettingController.php:112
* @route '/admin/settings/fingerprint'
*/
export const updateFingerprint = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateFingerprint.url(options),
    method: 'post',
})

updateFingerprint.definition = {
    methods: ["post"],
    url: '/admin/settings/fingerprint',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::updateFingerprint
* @see app/Http/Controllers/Admin/SettingController.php:112
* @route '/admin/settings/fingerprint'
*/
updateFingerprint.url = (options?: RouteQueryOptions) => {
    return updateFingerprint.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::updateFingerprint
* @see app/Http/Controllers/Admin/SettingController.php:112
* @route '/admin/settings/fingerprint'
*/
updateFingerprint.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateFingerprint.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateFingerprint
* @see app/Http/Controllers/Admin/SettingController.php:112
* @route '/admin/settings/fingerprint'
*/
const updateFingerprintForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateFingerprint.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateFingerprint
* @see app/Http/Controllers/Admin/SettingController.php:112
* @route '/admin/settings/fingerprint'
*/
updateFingerprintForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateFingerprint.url(options),
    method: 'post',
})

updateFingerprint.form = updateFingerprintForm

/**
* @see \App\Http\Controllers\Admin\SettingController::storeShift
* @see app/Http/Controllers/Admin/SettingController.php:127
* @route '/admin/settings/shifts'
*/
export const storeShift = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeShift.url(options),
    method: 'post',
})

storeShift.definition = {
    methods: ["post"],
    url: '/admin/settings/shifts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::storeShift
* @see app/Http/Controllers/Admin/SettingController.php:127
* @route '/admin/settings/shifts'
*/
storeShift.url = (options?: RouteQueryOptions) => {
    return storeShift.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::storeShift
* @see app/Http/Controllers/Admin/SettingController.php:127
* @route '/admin/settings/shifts'
*/
storeShift.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeShift.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::storeShift
* @see app/Http/Controllers/Admin/SettingController.php:127
* @route '/admin/settings/shifts'
*/
const storeShiftForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeShift.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::storeShift
* @see app/Http/Controllers/Admin/SettingController.php:127
* @route '/admin/settings/shifts'
*/
storeShiftForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeShift.url(options),
    method: 'post',
})

storeShift.form = storeShiftForm

/**
* @see \App\Http\Controllers\Admin\SettingController::updateShift
* @see app/Http/Controllers/Admin/SettingController.php:144
* @route '/admin/settings/shifts/{shift}'
*/
export const updateShift = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateShift.url(args, options),
    method: 'put',
})

updateShift.definition = {
    methods: ["put"],
    url: '/admin/settings/shifts/{shift}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::updateShift
* @see app/Http/Controllers/Admin/SettingController.php:144
* @route '/admin/settings/shifts/{shift}'
*/
updateShift.url = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateShift.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::updateShift
* @see app/Http/Controllers/Admin/SettingController.php:144
* @route '/admin/settings/shifts/{shift}'
*/
updateShift.put = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateShift.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateShift
* @see app/Http/Controllers/Admin/SettingController.php:144
* @route '/admin/settings/shifts/{shift}'
*/
const updateShiftForm = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateShift.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateShift
* @see app/Http/Controllers/Admin/SettingController.php:144
* @route '/admin/settings/shifts/{shift}'
*/
updateShiftForm.put = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateShift.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateShift.form = updateShiftForm

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyShift
* @see app/Http/Controllers/Admin/SettingController.php:162
* @route '/admin/settings/shifts/{shift}'
*/
export const destroyShift = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyShift.url(args, options),
    method: 'delete',
})

destroyShift.definition = {
    methods: ["delete"],
    url: '/admin/settings/shifts/{shift}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyShift
* @see app/Http/Controllers/Admin/SettingController.php:162
* @route '/admin/settings/shifts/{shift}'
*/
destroyShift.url = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyShift.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyShift
* @see app/Http/Controllers/Admin/SettingController.php:162
* @route '/admin/settings/shifts/{shift}'
*/
destroyShift.delete = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyShift.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyShift
* @see app/Http/Controllers/Admin/SettingController.php:162
* @route '/admin/settings/shifts/{shift}'
*/
const destroyShiftForm = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyShift.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyShift
* @see app/Http/Controllers/Admin/SettingController.php:162
* @route '/admin/settings/shifts/{shift}'
*/
destroyShiftForm.delete = (args: { shift: number | { id: number } } | [shift: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyShift.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyShift.form = destroyShiftForm

/**
* @see \App\Http\Controllers\Admin\SettingController::storeLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:170
* @route '/admin/settings/leave-types'
*/
export const storeLeaveType = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLeaveType.url(options),
    method: 'post',
})

storeLeaveType.definition = {
    methods: ["post"],
    url: '/admin/settings/leave-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::storeLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:170
* @route '/admin/settings/leave-types'
*/
storeLeaveType.url = (options?: RouteQueryOptions) => {
    return storeLeaveType.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::storeLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:170
* @route '/admin/settings/leave-types'
*/
storeLeaveType.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLeaveType.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::storeLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:170
* @route '/admin/settings/leave-types'
*/
const storeLeaveTypeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeLeaveType.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::storeLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:170
* @route '/admin/settings/leave-types'
*/
storeLeaveTypeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeLeaveType.url(options),
    method: 'post',
})

storeLeaveType.form = storeLeaveTypeForm

/**
* @see \App\Http\Controllers\Admin\SettingController::updateLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:185
* @route '/admin/settings/leave-types/{leaveType}'
*/
export const updateLeaveType = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLeaveType.url(args, options),
    method: 'put',
})

updateLeaveType.definition = {
    methods: ["put"],
    url: '/admin/settings/leave-types/{leaveType}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::updateLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:185
* @route '/admin/settings/leave-types/{leaveType}'
*/
updateLeaveType.url = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveType: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { leaveType: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            leaveType: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        leaveType: typeof args.leaveType === 'object'
        ? args.leaveType.id
        : args.leaveType,
    }

    return updateLeaveType.definition.url
            .replace('{leaveType}', parsedArgs.leaveType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::updateLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:185
* @route '/admin/settings/leave-types/{leaveType}'
*/
updateLeaveType.put = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLeaveType.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:185
* @route '/admin/settings/leave-types/{leaveType}'
*/
const updateLeaveTypeForm = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateLeaveType.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::updateLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:185
* @route '/admin/settings/leave-types/{leaveType}'
*/
updateLeaveTypeForm.put = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateLeaveType.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateLeaveType.form = updateLeaveTypeForm

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:200
* @route '/admin/settings/leave-types/{leaveType}'
*/
export const destroyLeaveType = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLeaveType.url(args, options),
    method: 'delete',
})

destroyLeaveType.definition = {
    methods: ["delete"],
    url: '/admin/settings/leave-types/{leaveType}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:200
* @route '/admin/settings/leave-types/{leaveType}'
*/
destroyLeaveType.url = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveType: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { leaveType: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            leaveType: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        leaveType: typeof args.leaveType === 'object'
        ? args.leaveType.id
        : args.leaveType,
    }

    return destroyLeaveType.definition.url
            .replace('{leaveType}', parsedArgs.leaveType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:200
* @route '/admin/settings/leave-types/{leaveType}'
*/
destroyLeaveType.delete = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLeaveType.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:200
* @route '/admin/settings/leave-types/{leaveType}'
*/
const destroyLeaveTypeForm = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyLeaveType.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroyLeaveType
* @see app/Http/Controllers/Admin/SettingController.php:200
* @route '/admin/settings/leave-types/{leaveType}'
*/
destroyLeaveTypeForm.delete = (args: { leaveType: number | { id: number } } | [leaveType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyLeaveType.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyLeaveType.form = destroyLeaveTypeForm

const SettingController = { index, updateCompany, updatePayroll, updatePayeTax, storeAllowance, destroyAllowance, updateFingerprint, storeShift, updateShift, destroyShift, storeLeaveType, updateLeaveType, destroyLeaveType }

export default SettingController