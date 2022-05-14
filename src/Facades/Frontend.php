<?php

namespace RamaID\Frontend\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \RamaID\Frontend\Frontend
 */
class Frontend extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'frontend';
    }
}
