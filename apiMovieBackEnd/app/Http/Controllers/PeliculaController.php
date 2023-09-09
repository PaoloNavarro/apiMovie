<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelicula;


class PeliculaController extends Controller
{
    public function index()
    {
        $peliculas = Pelicula::all();
        return response()->json(['data' => $peliculas]);
    }

    public function show($id)
    {
        $pelicula = Pelicula::find($id);

        if (!$pelicula) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }

        return response()->json(['data' => $pelicula]);
    }

    public function store(Request $request)
    {
        // Validación y creación de una nueva película aquí
        // Añade la lógica según tus requerimientos
    }

    public function update(Request $request, $id)
    {
        // Actualización de una película existente aquí
        // Añade la lógica según tus requerimientos
    }

    public function destroy($id)
    {
        // Eliminación de una película aquí
        // Añade la lógica según tus requerimientos
    }
}
