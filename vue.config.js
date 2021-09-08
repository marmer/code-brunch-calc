// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: /* process.env.NODE_ENV === 'production' && !process.env.CYPRESS
    ? '/code-brunch-calc'
    : */'/'
}
// TODO: marmer 08.09.2021 Merge coverage reports
// TODO: marmer 08.09.2021 get coverage for all scripts using cypress
