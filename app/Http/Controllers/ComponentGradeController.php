<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeResource;
use App\Models\Component;
use App\Models\Grade;

class ComponentGradeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \App\Models\Component $component
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Component $component): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return GradeResource::collection($component->grades);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Component $component
     * @param \App\Models\Grade $grade
     * @return \App\Http\Resources\GradeResource
     */
    public function show(Component $component, Grade $grade): GradeResource
    {
        return new GradeResource($grade);
    }
}
