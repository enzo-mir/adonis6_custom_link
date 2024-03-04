/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const PagesController = () => import('#controllers/Props/pages_controller')
const AuthentificationsController = () => import('#controllers/Auth/authentifications_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { HttpContext } from '@adonisjs/core/http'
const UpdateStylesController = () => import('#controllers/User/update_styles_controller')

router.get('/', [PagesController, 'home'])
router.get('/dashboard/:userid', [PagesController, 'dashboard']).middleware([middleware.auth()])
router.get('/logout', async (ctx: HttpContext) => {
  ctx.auth.use('web').logout()
  return ctx.response.redirect('/')
})

router
  .group(() => {
    router.post('/account/create', [AuthentificationsController, 'createAccount'])
    router.post('/login', [AuthentificationsController, 'login'])
  })
  .prefix('auth')

router
  .group(() => {
    router
      .post('/:userid/style', [UpdateStylesController, 'update'])
      .middleware([middleware.auth()])
  })
  .prefix('users')
