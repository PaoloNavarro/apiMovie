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
        // Validar los datos del formulario (puedes personalizar las reglas de validación según tus necesidades)
        $request->validate([
            'titulo' => 'required|string|max:255',
            'anio' => 'required|integer',
            // Agrega aquí más reglas de validación según los campos que necesites para crear una película
        ]);
    
        // Crear una nueva instancia de la película y asignar los valores de la solicitud
        $pelicula = new Pelicula([
            'titulo' => $request->input('titulo'),
            'anio' => $request->input('anio'),
            'descrpion' => $request->input('descripcion')
            // Asigna otros campos según sea necesario
        ]);
    
        // Guardar la nueva película en la base de datos
        $pelicula->save();
    
        return response()->json(['message' => 'Película creada con éxito', 'data' => $pelicula], 201);
    }

    public function update(Request $request, $id)
    {
        // Buscar la película por su ID
        $pelicula = Pelicula::find($id);
    
        // Verificar si la película existe
        if (!$pelicula) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }
    
        // Validar los datos del formulario (puedes personalizar las reglas de validación según tus necesidades)
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'anio' => 'required|integer',
            // Agrega aquí más reglas de validación según los campos que necesites actualizar
        ]);
    
        // Actualizar la película con los datos proporcionados en la solicitud
        $pelicula->titulo = $request->input('titulo');
        $pelicula->descripcion = $request->input('descripcion');
        $pelicula->anio = $request->input('anio');
        // Actualiza otros campos según sea necesario
    
        // Guardar los cambios en la base de datos
        $pelicula->save();
    
        return response()->json(['message' => 'Película actualizada con éxito', 'data' => $pelicula]);
    }
    
    public function destroy($id)
    {
        // Buscar la película por su ID
        $pelicula = Pelicula::find($id);
    
        // Verificar si la película existe
        if (!$pelicula) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }
    
        // Eliminar la película de la base de datos
        $pelicula->delete();
    
        return response()->json(['message' => 'Película eliminada con éxito']);
    }
}
