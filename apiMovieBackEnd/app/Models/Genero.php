<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    protected $fillable = ['nombre'];

    public function detalles()
    {
        return $this->hasMany(DetallePelicula::class);
    }
}
