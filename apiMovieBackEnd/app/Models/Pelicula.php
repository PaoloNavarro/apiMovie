<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelicula extends Model
{
    protected $fillable = ['titulo', 'anio'];
    
    public function detalles()
    {
        return $this->hasMany(DetallePelicula::class);
    }
}
