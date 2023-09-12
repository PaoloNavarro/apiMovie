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
        // Validación de los datos del formulario
        $request->validate([
            'pelicula_id' => 'required|integer',
            'genero_id' => 'required|integer',
            'actor_id' => 'required|integer',
        ]);
    
        // Crear un nuevo detalle de película
        $detalle = DetallePelicula::create([
            'pelicula_id' => $request->input('pelicula_id'),
            'genero_id' => $request->input('genero_id'),
            'actor_id' => $request->input('actor_id'),
        ]);
    
        return response()->json(['data' => $detalle], 201);
    }
    

    public function update(Request $request, $id)
{
    // Buscar el detalle de película por ID
    $detalle = DetallePelicula::find($id);

    if (!$detalle) {
        return response()->json(['message' => 'Detalle de película no encontrado'], 404);
    }

    // Validación de los datos del formulario
    $request->validate([
        'pelicula_id' => 'required|integer',
        'genero_id' => 'required|integer',
        'actor_id' => 'required|integer',
    ]);

    // Actualizar los campos del detalle de película
    $detalle->update([
        'pelicula_id' => $request->input('pelicula_id'),
        'genero_id' => $request->input('genero_id'),
        'actor_id' => $request->input('actor_id'),
    ]);

    return response()->json(['data' => $detalle], 200);
}
public function destroy($id)
{
    // Buscar el detalle de película por ID
    $detalle = DetallePelicula::find($id);

    if (!$detalle) {
        return response()->json(['message' => 'Detalle de película no encontrado'], 404);
    }

    // Eliminar el detalle de película
    $detalle->delete();

    return response()->json(['message' => 'Detalle de película eliminado'], 200);
}

}
