/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const PagesController = () => import('#controllers/pages_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [PagesController, 'home'])
