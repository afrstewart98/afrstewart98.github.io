<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeResource;
use App\Models\Grade;
use App\Models\Inspection;

class InspectionGradeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \App\Models\Inspection $inspection
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Inspection $inspection): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return GradeResource::collection($inspection->grades);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Inspection $inspection
     * @param \App\Models\Grade $grade
     * @return \App\Http\Resources\GradeResource
     */
    public function show(Inspection $inspection, Grade $grade): GradeResource
    {
        return new GradeResource($grade);
    }
}
