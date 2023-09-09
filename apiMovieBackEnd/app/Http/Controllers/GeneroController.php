<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genero;


class GeneroController extends Controller
{
       /**
     * Mostrar la lista de géneros.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $generos = Genero::all();
        return response()->json(['data' => $generos]);
    }

    /**
     * Mostrar un género específico por su ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $genero = Genero::find($id);

        if (!$genero) {
            return response()->json(['message' => 'Género no encontrado'], 404);
        }

        return response()->json(['data' => $genero]);
    }

    /**
     * Crear un nuevo género.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'nombre' => 'required|unique:generos,nombre',
        ]);
    
        $genero = Genero::create([
            'nombre' => $request->input('nombre'),
        ]);
    
        return response()->json(['message' => 'Género creado con éxito', 'data' => $genero], 201);
    }

    /**
     * Actualizar un género existente por su ID.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $genero = Genero::find($id);

        if (!$genero) {
            return response()->json(['message' => 'Género no encontrado'], 404);
        }

        $this->validate($request, [
            'nombre' => 'required|unique:generos,nombre,' . $id,
        ]);

        $genero->nombre = $request->input('nombre');
        $genero->save();

        return response()->json(['message' => 'Género actualizado con éxito', 'data' => $genero]);
    }

    /**
     * Eliminar un género existente por su ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $genero = Genero::find($id);

        if (!$genero) {
            return response()->json(['message' => 'Género no encontrado'], 404);
        }

        $genero->delete();

        return response()->json(['message' => 'Género eliminado con éxito']);
    }
}
