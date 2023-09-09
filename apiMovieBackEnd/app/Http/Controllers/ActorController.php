<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actor;

class ActorController extends Controller
{
    public function index()
    {
        $actores = Actor::all();
        return response()->json(['data' => $actores]);
    }

    public function show($id)
    {
        $actor = Actor::find($id);

        if (!$actor) {
            return response()->json(['message' => 'Actor no encontrado'], 404);
        }

        return response()->json(['data' => $actor]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nombre' => 'required',
        ]);

        $actor = Actor::create([
            'nombre' => $request->input('nombre'),
        ]);

        return response()->json(['message' => 'Actor creado con éxito', 'data' => $actor], 201);
    }

    public function update(Request $request, $id)
    {
        $actor = Actor::find($id);

        if (!$actor) {
            return response()->json(['message' => 'Actor no encontrado'], 404);
        }

        $this->validate($request, [
            'nombre' => 'required',
        ]);

        $actor->nombre = $request->input('nombre');
        $actor->save();

        return response()->json(['message' => 'Actor actualizado con éxito', 'data' => $actor]);
    }

    public function destroy($id)
    {
        $actor = Actor::find($id);

        if (!$actor) {
            return response()->json(['message' => 'Actor no encontrado'], 404);
        }

        $actor->delete();

        return response()->json(['message' => 'Actor eliminado con éxito']);
    }
}
