<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeTypeResource;
use App\Models\GradeType;

class GradeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return GradeTypeResource::collection(GradeType::all());
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GradeType  $gradeType
     * @return \App\Http\Resources\GradeTypeResource
     */
    public function show(GradeType $gradeType)
    {
        return new GradeTypeResource($gradeType);
    }
}
