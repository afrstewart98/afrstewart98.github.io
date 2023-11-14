<?php

use App\Http\Controllers\ComponentController;
use App\Http\Controllers\ComponentGradeController;
use App\Http\Controllers\ComponentTypeController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\FarmTurbineController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\GradeTypeController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\InspectionGradeController;
use App\Http\Controllers\TurbineComponentController;
use App\Http\Controllers\TurbineController;
use App\Http\Controllers\TurbineInspectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('farms', FarmController::class)->only(['index', 'show']);
Route::resource('farms.turbines', FarmTurbineController::class)->only(['index', 'show']);

Route::resource('turbines', TurbineController::class)->only(['index', 'show']);
Route::resource('turbines.components', TurbineComponentController::class)->only(['index', 'show']);
Route::resource('turbines.inspections', TurbineInspectionController::class)->only(['index', 'show']);

Route::resource('components', ComponentController::class)->only(['index', 'show']);
Route::resource('components.grades', ComponentGradeController::class)->only(['index', 'show'])->scoped();

Route::resource('inspections', InspectionController::class)->only(['index', 'show']);
Route::resource('inspections.grades', InspectionGradeController::class)->only(['index', 'show']);

Route::resource('grades', GradeController::class)->only(['index', 'show']);

Route::resource('component-types', ComponentTypeController::class)->only(['index', 'show']);

Route::resource('grade-types', GradeTypeController::class)->only(['index', 'show']);
