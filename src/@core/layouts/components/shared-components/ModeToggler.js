import IconButton from '@mui/material/IconButton'
import { useEffect } from 'react'

// ** ThemeConfig Import

import { getThemeMode } from 'src/@core/utils/helpers'
// ** Icons Imports
import WeatherNight from 'mdi-material-ui/WeatherNight'
import WeatherSunny from 'mdi-material-ui/WeatherSunny'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  useEffect(() => {
    console.log('hello Theree')
    handleModeChange(getThemeMode() ? getThemeMode().ThemeMode : 'dark')
  }, [])

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode })
  }

  const handleModeToggle = () => {
    console.log(' updatee togglke ' + settings.mode)

    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      {settings.mode === 'dark' ? <WeatherSunny /> : <WeatherNight />}
    </IconButton>
  )
}

export default ModeToggler
