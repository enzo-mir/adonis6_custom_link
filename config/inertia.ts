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
    success: (ctx) => ctx.session.flashMessages.get('success'),
    user: async (ctx) => await getUserDatas(ctx),
    header_content: async (ctx) => new GetCustomDatas(ctx).getContent('header_content', undefined),
    style: async (ctx) => new GetCustomDatas(ctx).getContent('style', undefined),
    images: async (ctx) => new GetCustomDatas(ctx).getContent('images', undefined),
    links: async (ctx) => new GetCustomDatas(ctx).getLinks(undefined),
  },
})
