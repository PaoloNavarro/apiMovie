<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\PeliculaController;
use App\Http\Controllers\DetallePeliculaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Rutas para el controlador de Género
Route::group(['prefix' => 'generos'], function () {
    Route::get('/', [GeneroController::class, 'index']); // Obtener todos los géneros
    Route::get('/{id}', [GeneroController::class, 'show']); // Obtener un género por ID
    Route::post('/', [GeneroController::class, 'store']); // Crear un nuevo género
    Route::put('/{id}', [GeneroController::class, 'update']); // Actualizar un género por ID
    Route::delete('/{id}', [GeneroController::class, 'destroy']); // Eliminar un género por ID
});

// Grupo de rutas para el controlador de Actores
Route::prefix('actores')->group(function () {
    Route::get('/', [ActorController::class, 'index']);
    Route::get('/{id}', [ActorController::class, 'show']);
    Route::post('/', [ActorController::class, 'store']);
    Route::put('/{id}', [ActorController::class, 'update']);
    Route::delete('/{id}', [ActorController::class, 'destroy']);
});

// Grupo de rutas para el controlador de Películas
Route::prefix('peliculas')->group(function () {
    Route::get('/', [PeliculaController::class, 'index']);
    Route::get('/{id}', [PeliculaController::class, 'show']);
    Route::post('/', [PeliculaController::class, 'store']);
    Route::put('/{id}', [PeliculaController::class, 'update']);
    Route::delete('/{id}', [PeliculaController::class, 'destroy']);
    Route::put('/{id}/asignar-puntuacion', [PeliculaController::class, 'asignarPuntuacion']);
    Route::put('/{id}/hacer-favorito', [PeliculaController::class, 'hacerFavorito']);
    Route::post('/filtrar', [PeliculaController::class, 'filtrar']);


});

// Grupo de rutas para el controlador de Detalles de Películas
Route::prefix('detalles')->group(function () {
    Route::get('/', [DetallePeliculaController::class, 'index']);
    Route::get('/{id}', [DetallePeliculaController::class, 'show']);
    Route::post('/', [DetallePeliculaController::class, 'store']);
    Route::put('/{id}', [DetallePeliculaController::class, 'update']);
    Route::delete('/{id}', [DetallePeliculaController::class, 'destroy']);
});