<?php

namespace RamaID\Frontend;

use RamaID\Frontend\Commands\FrontendCommand;
use RamaID\Frontend\Commands\FrontendLinkCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FrontendServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('frontend')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_frontend_table')
            ->hasCommand(FrontendCommand::class)
            ->hasCommand(FrontendLinkCommand::class)
        ;
    }
}
