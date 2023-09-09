<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    protected $fillable = ['nombre'];

    public function detalles()
    {
        return $this->hasMany(DetallePelicula::class);
    }
}
