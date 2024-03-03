import GetCustomDatas from '#services/get_custom_data_service'
import getUserDatas from '#services/user_data_service'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'root',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    user: async (ctx) => await getUserDatas(ctx),
    header_content: async (ctx) => new GetCustomDatas(ctx, 'header_content').getContent(),
    style: async (ctx) => new GetCustomDatas(ctx, 'style').getContent(),
    images: async (ctx) => new GetCustomDatas(ctx, 'images').getContent(),
    links: async (ctx) => new GetCustomDatas(ctx, 'links').getLinks(),
  },
})
