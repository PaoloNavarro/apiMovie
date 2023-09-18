<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetallePelicula;
use App\Models\Pelicula;
use App\Models\Genero;
use App\Models\Actor;
use Illuminate\Database\QueryException;



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
        try {
            // Validación de los datos del formulario para la película
            $request->validate([
                'titulo' => 'required|string',
                'anio' => 'required|string',
                'descripcion' => 'required|string',
            ]);
    
            // Comprobar si la película ya existe en la base de datos
            $pelicula = Pelicula::where('titulo', $request->input('titulo'))->first();
    
            if (!$pelicula) {
                // Crear una nueva película si no existe
                $pelicula = Pelicula::create([
                    'titulo' => $request->input('titulo'),
                    'anio' => $request->input('anio'),
                    'descripcion' => $request->input('descripcion'),
                ]);
                // Verificar si la clave 'imagen' está presente en el cuerpo de la solicitud
                if ($request->has('imagen')) {
                    $pelicula->imagen = $request->input('imagen');
                    $pelicula->save();
                }
            }
    
            // Procesar los géneros si están presentes
            if ($request->has('generos') && is_array($request->input('generos'))) {
                $generos = [];
                foreach ($request->input('generos') as $generoNombre) {
                    $genero = Genero::firstOrCreate(['nombre' => $generoNombre]);
                    $generos[] = $genero->id;
                }
                // Asociar los géneros con la película
                $pelicula->Genero()->sync($generos);
            }
    
            // Procesar los actores si están presentes
            if ($request->has('actores') && is_array($request->input('actores'))) {
                $actores = [];
                foreach ($request->input('actores') as $actorNombre) {
                    $actor = Actor::firstOrCreate(['nombre' => $actorNombre]);
                    $actores[] = $actor->id;
                }
                // Asociar los actores con la película
                $pelicula->Actor()->sync($actores);
            }
    
            // Devolver una respuesta exitosa
            return response()->json(['message' => 'Película almacenada con éxito'], 201);
        } catch (QueryException $e) {
            // Captura excepciones de consulta y devuelve un mensaje de error específico
            return response()->json(['message' => 'Error al procesar la solicitud: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Captura cualquier otra excepción y devuelve un mensaje de error genérico
            return response()->json(['message' => 'Error al procesar la solicitud: ' . $e->getMessage()], 500);
        }
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
