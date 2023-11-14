<?php

namespace Database\Seeders;

use App\Models\GradeType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class GradeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GradeType::factory(5)
            ->state(new Sequence(
                ['name' => '1'],
                ['name' => '2'],
                ['name'=> '3'],
                ['name' => '4'],
                ['name' => '5']
            ))
            ->create();
    }
}
