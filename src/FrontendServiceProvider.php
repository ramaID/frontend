<?php

namespace RamaID\Frontend;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use RamaID\Frontend\Commands\FrontendCommand;
use RamaID\Frontend\Commands\FrontendLinkCommand;

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
