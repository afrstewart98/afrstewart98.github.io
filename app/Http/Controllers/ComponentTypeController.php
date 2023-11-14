<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComponentTypeResource;
use App\Models\ComponentType;
use Illuminate\Http\Request;

class ComponentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ComponentTypeResource::collection(ComponentType::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ComponentType  $componentType
     * @return \App\Http\Resources\ComponentTypeResource
     */
    public function show(ComponentType $componentType)
    {
        return new ComponentTypeResource($componentType);
    }
}
