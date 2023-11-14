<?php

namespace App\Http\Controllers;

use App\Http\Resources\TurbineResource;
use App\Models\Turbine;

class TurbineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TurbineResource::collection(Turbine::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Turbine  $turbine
     * @return \App\Http\Resources\TurbineResource
     */
    public function show(Turbine $turbine)
    {
        return new TurbineResource($turbine);
    }
}
