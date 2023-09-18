<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelicula extends Model
{
    protected $fillable = ['titulo', 'anio','descripcion','favorito','puntuacion'];
    
    public function detalles()
    {
        return $this->hasMany(DetallePelicula::class);
    }
    public function Genero()
    {
        return $this->belongsToMany(Genero::class, 'detalle_peliculas', 'pelicula_id', 'genero_id');
    }

    public function Actor()
    {
        return $this->belongsToMany(Actor::class, 'detalle_peliculas', 'pelicula_id', 'actor_id');
    }
}
