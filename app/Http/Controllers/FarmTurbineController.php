<?php

namespace App\Http\Controllers;

use App\Http\Resources\TurbineResource;
use App\Models\Farm;
use App\Models\Turbine;
use Illuminate\Http\Request;

class FarmTurbineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \App\Models\Farm $farm
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Farm $farm): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return TurbineResource::collection($farm->turbines);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Farm $farm
     * @param \App\Models\Turbine $turbine
     * @return \App\Http\Resources\TurbineResource
     */
    public function show(Farm $farm, Turbine $turbine): TurbineResource
    {
        return new TurbineResource($turbine);
    }
}
