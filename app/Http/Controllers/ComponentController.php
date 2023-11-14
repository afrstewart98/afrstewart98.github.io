<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComponentResource;
use App\Models\Component;

class ComponentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ComponentResource::collection(Component::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Component  $component
     * @return \App\Http\Resources\ComponentResource
     */
    public function show(Component $component)
    {
        return new ComponentResource($component);
    }
}
