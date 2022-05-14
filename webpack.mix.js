let mix = require('laravel-mix');

// mix.setPublicPath('dist/dashkit')
//     .copy('resources/dashkit/img/logo/dashkit-violet.svg', 'dist/dashkit/images')
//     .js('resources/js/dashkit.js', 'app.js')
//     .sass('resources/dashkit/scss/main.scss', 'style.css')
// ;

// mix.setPublicPath('dist/ramio')
//     .js('resources/js/ramio.js', 'app.js')
//     .sass('resources/ramio/sass/main-demo.sass', 'main-demo.css')
//     .sass('resources/ramio/sass/main.sass', 'main.css')
//     .sass('resources/ramio/sass/plugins-demo.sass', 'plugins-demo.css')
//     .sass('resources/ramio/sass/plugins.sass', 'plugins.css')
// ;

mix
    .extract()
    .version()
;
