<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelicula;
use App\Models\DetallePelicula;
use App\Models\Actor;
use App\Models\Genero;

class PeliculaController extends Controller
{
    public function index()
    {
        $peliculas = Pelicula::with(['Genero', 'Actor'])->get();
        return response()->json(['data' => $peliculas]);
    }
    
    public function show($id)
    {
        $pelicula = Pelicula::find($id);
    
        if (!$pelicula) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }
    
        // Obtén los detalles de la película desde la tabla "detalle_peliculas"
        $detalles = DetallePelicula::where('pelicula_id', $id)->get();
    
        // Inicializa matrices para almacenar actores y géneros
        $actores = [];
        $generos = [];
    
        // Itera a través de los detalles y agrega actores y géneros a las matrices
        foreach ($detalles as $detalle) {
            $actores[] = Actor::find($detalle->actor_id);
            $generos[] = Genero::find($detalle->genero_id);
        }
    
        // Agrega los actores y géneros a la respuesta JSON
        $pelicula->actores = $actores;
        $pelicula->generos = $generos;
    
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
    public function asignarPuntuacion(Request $request, $id)
    {
        // Buscar la película por su ID
        $pelicula = Pelicula::find($id);

        // Verificar si la película existe
        if (!$pelicula) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }

        $request->validate([
            'puntuacion' => 'required|integer|between:1,5', // Valida que la puntuación esté entre 1 y 5
        ]);

        // Asignar la puntuación proporcionada en la solicitud
        $pelicula->puntuacion = $request->input('puntuacion');

        // Guardar los cambios en la base de datos
        $pelicula->save();

        return response()->json(['message' => 'Puntuación asignada con éxito', 'data' => $pelicula]);
    }
    public function hacerFavorito(Request $request, $id)
    {
        // Buscar la película por su ID
        $pelicula = Pelicula::find($id);

        // Verificar si la película existe
        if (!$pelicula) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }

        $request->validate([
            'favorito' => 'required|in:s,n', // Valida que el favorito sea 's' o 'n'
        ]);

        // Asignar el estado de favorito proporcionado en la solicitud
        $pelicula->favorito = $request->input('favorito');

        // Guardar los cambios en la base de datos
        $pelicula->save();

        return response()->json(['message' => 'Estado de favorito actualizado con éxito', 'data' => $pelicula]);
    }
    public function filtrar(Request $request)
    {
        // Obtén los parámetros de filtro del cuerpo de la solicitud
        $filtro = $request->input('filtro');
    
        // Realiza la consulta de películas filtradas en función de los criterios proporcionados
        $query = Pelicula::query();
    
        // Agrega condiciones de filtrado según los campos y valores proporcionados en el cuerpo de la solicitud
    
        if (isset($filtro['genero'])) {
            $query->whereHas('Genero', function ($q) use ($filtro) {
                $q->where('nombre', $filtro['genero']);
            });
        }
    
        if (isset($filtro['actor'])) {
            $query->whereHas('Actor', function ($q) use ($filtro) {
                $q->where('nombre', $filtro['actor']);
            });
        }
    
        if (isset($filtro['calificacion'])) {
            $query->where('puntuacion', $filtro['calificacion']);
        }
    
        if (isset($filtro['favorito'])) {
            $query->where('favorito', $filtro['favorito']);
        }
    
        if (isset($filtro['anio'])) {
            $query->where('anio', $filtro['anio']);
        }
        if (isset($filtro['nombrePelicula'])) {
            $query->where('titulo', 'like', '%' . $filtro['nombrePelicula'] . '%');
        }
        // Carga las relaciones Genero y Actor siempre
        $query->with(['Genero', 'Actor']);
    
        // Ejecuta la consulta y obtén los resultados
        $peliculasFiltradas = $query->get();
    
        // Si no se proporcionaron filtros, obtén todas las películas
        if (empty($filtro)) {
            $peliculasFiltradas = Pelicula::with(['Genero', 'Actor'])->get();
        }
    
        return response()->json(['data' => $peliculasFiltradas]);
    }
    
    
    
}
