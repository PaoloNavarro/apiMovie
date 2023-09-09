<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePelicula extends Model
{
    protected $fillable = ['pelicula_id', 'genero_id', 'actor_id'];

    public function pelicula()
    {
        return $this->belongsTo(Pelicula::class);
    }

    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }

    public function actor()
    {
        return $this->belongsTo(Actor::class);
    }
}
