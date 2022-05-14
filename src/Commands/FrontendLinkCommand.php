<?php

namespace RamaID\Frontend\Commands;

use Illuminate\Console\Command;

class FrontendLinkCommand extends Command
{
    public $signature = 'frontend:link {type?}';

    protected $description = 'Create a symbolic link compiled assets to public';

    public function handle(): int
    {
        /** @var \Illuminate\Filesystem\Filesystem */
        $files = $this->laravel->make('files');
        $type = $this->getType();

        if (! file_exists(public_path($type))) {
            $files->link(
                $this->platformPath("dist/$type"),
                public_path($type)
            );
        }

        $this->info("The [public/$type] directory has been linked.");

        return self::SUCCESS;
    }

    private function platformPath(string $path): string
    {
        return realpath(__DIR__.'/../..'.($path ? DIRECTORY_SEPARATOR.$path : $path));
    }

    private function getType(): string
    {
        $type = $this->argument('type');

        if ($type === 'ramio') {
            return $type;
        }

        return 'dashkit';
    }
}
