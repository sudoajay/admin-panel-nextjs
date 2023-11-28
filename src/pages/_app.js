// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCookies, setCookie } from 'cookies-next' // ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import { setAuth } from 'src/@core/utils/helpers'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [getCheckSession, setCheckSession] = useState(false)

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const router = useRouter()

  // const handleRouteChange = url => {
  //   // setShowData(false)
  //   checkIfSessionPresent(url)
  // }

  // useEffect(() => {
  //   // checkIfSessionPresent(router.asPath)

  //   // console.log(' get cokkies' + JSON.stringify(getCookies()))
  //   // => { 'name1': 'value1', name2: 'value2' }
  //   // router.events.on('routeChangeStart', handleRouteChange)
  //   // return () => {
  //   //   router.events.off('routeChangeStart', handleRouteChange)
  //   // }
  // }, [])

  useEffect(() => {
    checkIfSessionPresent(router.asPath)
  }, [router.asPath])

  async function checkIfSessionPresent(url = '') {
    try {
      const response = await fetch('http://localhost:3002/api/admin/check/login', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      console.log('Success:', JSON.stringify(result) + ' --- ' + url)

      setCheckSession(result.CheckLogin)

      // setCookie('key', 'value')

      if (url == '/pages/login/') {
        if (result.CheckLogin) {
          router.push('/')
        }
      } else {
        if (!result.CheckLogin) {
          router.push('/pages/login')
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
