<?php

namespace RamaID\Frontend\Commands;

use Illuminate\Console\Command;

class FrontendCommand extends Command
{
    public $signature = 'frontend';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
