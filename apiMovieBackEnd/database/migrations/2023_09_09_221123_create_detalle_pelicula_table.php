<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('detalle_peliculas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pelicula_id');
            $table->unsignedBigInteger('genero_id')->nullable();
            $table->unsignedBigInteger('actor_id')->nullable();
            $table->timestamps();
    
            $table->foreign('pelicula_id')->references('id')->on('peliculas')->onDelete('cascade');
            
            // Puedes eliminar las restricciones de clave externa en género y actor si no son siempre necesarias
            // $table->foreign('genero_id')->references('id')->on('generos')->onDelete('cascade');
            // $table->foreign('actor_id')->references('id')->on('actors')->onDelete('cascade');
        });
    }
    

    public function down()
    {
        Schema::dropIfExists('detalle_pelicula');
    }
};
