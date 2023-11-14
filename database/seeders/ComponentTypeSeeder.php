<?php

namespace Database\Seeders;

use App\Models\ComponentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ComponentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ComponentType::factory(3)
            ->state(new Sequence(
                ['name' => 'Blade'],
                ['name' => 'Rotor'],
                ['name'=> 'Hub']
            ))
            ->create();
    }
}
