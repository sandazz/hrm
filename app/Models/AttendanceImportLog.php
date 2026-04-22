<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceImportLog extends Model
{
    protected $fillable = [
        'filename',
        'imported_by',
        'total_records',
        'success_count',
        'error_count',
        'duplicate_count',
        'error_details',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'error_details' => 'array',
        ];
    }

    public function importer()
    {
        return $this->belongsTo(User::class, 'imported_by');
    }
}
