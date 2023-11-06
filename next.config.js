const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  env: {
    siteTitle: 'Regime Fit',
    siteDescription: 'Get Workout Plans!',
    siteKeywords: 'Workout Plan, Transform your life, strength,wellness,self-improvement',
    siteUrl: 'https://fitness-plans.regimefit.com',
    productTitle: 'Regime_Fit_Product',
    paymentForm: 'Regime_Fit_Form',
    promoCode: 'Promo_code',
    GOOGLE_ANALYTICS: 'G-X5VCJV58T5',
    INR_TO_DOLLOR: '83',
    settingsCache: 'Settings_Cache'
  },

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
