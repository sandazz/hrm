<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreBiometricLogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            '*'              => ['required', 'array'],
            '*.UID'          => ['required', 'string', 'max:50'],
            '*.AttTime'      => ['required', 'date_format:Y-m-d H:i:s'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.UID.required'     => 'Each record must have a UID.',
            '*.AttTime.required' => 'Each record must have an AttTime.',
            '*.AttTime.date_format' => 'AttTime must be in format: Y-m-d H:i:s (e.g. 2026-04-30 08:15:00).',
        ];
    }

    /**
     * Return JSON error response instead of redirect on validation failure.
     */
    protected function failedValidation(Validator $validator): never
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
