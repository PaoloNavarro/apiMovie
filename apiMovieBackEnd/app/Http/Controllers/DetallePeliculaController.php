<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetallePelicula;


class DetallePeliculaController extends Controller
{
    public function index()
    {
        $detalles = DetallePelicula::all();
        return response()->json(['data' => $detalles]);
    }

    public function show($id)
    {
        $detalle = DetallePelicula::find($id);

        if (!$detalle) {
            return response()->json(['message' => 'Detalle de película no encontrado'], 404);
        }

        return response()->json(['data' => $detalle]);
    }

    public function store(Request $request)
    {
        // Validación y creación de un nuevo detalle de película aquí
        // Añade la lógica según tus requerimientos
    }

    public function update(Request $request, $id)
    {
        // Actualización de un detalle de película existente aquí
        // Añade la lógica según tus requerimientos
    }

    public function destroy($id)
    {
        // Eliminación de un detalle de película aquí
        // Añade la lógica según tus requerimientos
    }
}
