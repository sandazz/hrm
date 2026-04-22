"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditDepartment;
var react_1 = require("@inertiajs/react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var input_error_1 = require("@/components/input-error");
var departmentRoutes = require("@/routes/admin/departments");
function EditDepartment(_a) {
    var _b;
    var department = _a.department, managers = _a.managers;
    var _c = (0, react_1.useForm)({
        name: department.name,
        code: department.code,
        description: (_b = department.description) !== null && _b !== void 0 ? _b : '',
        manager_id: department.manager_id ? String(department.manager_id) : '',
        is_active: department.is_active ? '1' : '0',
    }), data = _c.data, setData = _c.setData, put = _c.put, processing = _c.processing, errors = _c.errors;
    var submit = function (event) {
        event.preventDefault();
        put(departmentRoutes.update({ department: department.id }).url);
    };
    return (<>
            <react_1.Head title="Edit Department"/>
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Department</h1>
                        <p className="text-muted-foreground text-sm">Update department details and manager assignments.</p>
                    </div>
                    <button_1.Button variant="outline" asChild>
                        <react_1.Link href={departmentRoutes.index().url}>← Back to Departments</react_1.Link>
                    </button_1.Button>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Department Details</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                            <div className="space-y-1">
                                <label_1.Label htmlFor="name">Name *</label_1.Label>
                                <input_1.Input id="name" value={data.name} onChange={function (event) { return setData('name', event.target.value); }} required/>
                                <input_error_1.default message={errors.name}/>
                            </div>

                            <div className="space-y-1">
                                <label_1.Label htmlFor="code">Code *</label_1.Label>
                                <input_1.Input id="code" value={data.code} onChange={function (event) { return setData('code', event.target.value); }} required/>
                                <input_error_1.default message={errors.code}/>
                            </div>

                            <div className="space-y-1">
                                <label_1.Label htmlFor="description">Description</label_1.Label>
                                <input_1.Input id="description" value={data.description} onChange={function (event) { return setData('description', event.target.value); }}/>
                                <input_error_1.default message={errors.description}/>
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>

                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Manager & Status</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                            <div className="space-y-1">
                                <label_1.Label htmlFor="manager_id">Manager</label_1.Label>
                                <select_1.Select value={data.manager_id} onValueChange={function (value) { return setData('manager_id', value); }}>
                                    <select_1.SelectTrigger id="manager_id">
                                        <select_1.SelectValue placeholder="Select manager"/>
                                    </select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                        <select_1.SelectItem value="">None</select_1.SelectItem>
                                        {managers.map(function (manager) { return (<select_1.SelectItem key={manager.id} value={String(manager.id)}>{manager.name}</select_1.SelectItem>); })}
                                    </select_1.SelectContent>
                                </select_1.Select>
                                <input_error_1.default message={errors.manager_id}/>
                            </div>

                            <div className="space-y-1">
                                <label_1.Label htmlFor="is_active">Status</label_1.Label>
                                <select_1.Select value={data.is_active} onValueChange={function (value) { return setData('is_active', value); }}>
                                    <select_1.SelectTrigger id="is_active">
                                        <select_1.SelectValue />
                                    </select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                        <select_1.SelectItem value="1">Active</select_1.SelectItem>
                                        <select_1.SelectItem value="0">Inactive</select_1.SelectItem>
                                    </select_1.SelectContent>
                                </select_1.Select>
                                <input_error_1.default message={errors.is_active}/>
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>

                    <div className="lg:col-span-2 flex justify-end gap-3">
                        <button_1.Button variant="outline" type="button" asChild>
                            <react_1.Link href={departmentRoutes.index().url}>Cancel</react_1.Link>
                        </button_1.Button>
                        <button_1.Button type="submit" disabled={processing}>
                            {processing ? 'Updating…' : 'Save Changes'}
                        </button_1.Button>
                    </div>
                </form>
            </div>
        </>);
}
