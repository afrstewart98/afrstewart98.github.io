<?php

namespace Database\Seeders;

use App\Models\Component;
use App\Models\ComponentType;
use App\Models\Farm;
use App\Models\Grade;
use App\Models\GradeType;
use App\Models\Inspection;
use App\Models\Turbine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ComponentTypeSeeder::class);
        $this->call(GradeTypeSeeder::class);

        $componentTypes = ComponentType::all();
        $gradeTypes = GradeType::all();

         Farm::factory()
             ->count(5)
            ->has(
                Turbine::factory(5)
                    ->afterCreating(function($turbine) use ($componentTypes) {
                        $componentTypes->each(function($componentType) use ($turbine) {
                            Component::factory()
                                ->create([
                                    'component_type_id' => $componentType->id,
                                    'turbine_id' => $turbine->id
                                ]);
                        });
                    })
                    ->has(
                        Inspection::factory(2)
                    )
            )->create();

         Inspection::all()->each((function($inspection) use ($gradeTypes) {
             $components = $inspection->turbine->components;
             $components->each(function($component) use ($inspection, $gradeTypes) {
                 $component->grades()->save(
                     Grade::factory()
                         ->create([
                             'inspection_id' => $inspection->id,
                             'grade_type_id' => $gradeTypes->random()->id,
                             'component_id' => $component->id
                         ])
                 );
             });
         }));
    }
}
