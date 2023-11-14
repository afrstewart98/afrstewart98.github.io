<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Models\Turbine;
use Illuminate\Http\Request;

class TurbineComponentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \App\Models\Turbine $turbine
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Turbine $turbine): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ComponentResource::collection($turbine->components);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Turbine $turbine
     * @param \App\Models\Component $component
     * @return \App\Http\Resources\ComponentResource
     */
    public function show(Turbine $turbine, Component $component): ComponentResource
    {
        return new ComponentResource($component);
    }
}
