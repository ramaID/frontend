import $ from 'jquery'
import simplebar from 'simplebar'
import autoNumeric from 'autonumeric'
import Turbolinks from 'turbolinks'
import Fuse from './components/fuse.min.js'

window.$ = window.jQuery = window.jquery = $
window.simplebar = simplebar
window.autoNumeric = autoNumeric
window.Fuse = Fuse
window.Turbolinks = Turbolinks

import './../../node_modules/fomantic-ui/dist/semantic'
import './../js/components/basictable'
import './../js/components/keymaster'
import './../js/components/fileuploader'
import './../js/components/modal'

import './../js/init/sidebar'
import './../js/init/ui'
import './../js/init/quick-switcher'
