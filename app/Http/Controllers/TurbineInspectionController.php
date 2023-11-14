<?php

namespace App\Http\Controllers;

use App\Http\Resources\InspectionResource;
use App\Models\Inspection;
use App\Models\Turbine;

class TurbineInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \App\Models\Turbine $turbine
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Turbine $turbine): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return InspectionResource::collection($turbine->inspections);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Turbine $turbine
     * @param \App\Models\Inspection $inspection
     * @return \App\Http\Resources\InspectionResource
     */
    public function show(Turbine $turbine, Inspection $inspection): InspectionResource
    {
        return new InspectionResource($inspection);
    }
}
