// ** React Imports
import { useState, useEffect } from 'react'
import * as React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import CardContent from '@mui/material/CardContent'
import ContentSave from 'mdi-material-ui/ContentSave'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function SlideTransition(props) {
  return <Slide {...props} direction='down' />
}
const FormBasicsAppInformation = () => {
  const [openSave, setOpenSave] = useState(false)
  const [getAppTitle, setAppTitle] = useState('')
  const [getAppDescription, setAppDescription] = useState('')
  const [getAppKeywords, setAppKeywords] = useState('')
  const [getMainTitle, setMainTitle] = useState('')
  const [getMainDescription, setMainDescription] = useState('')

  const [currentGetAppData, currentSetAppData] = useState('')

  const [open, setOpen] = useState(false)
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')

  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'right'
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    setAppTitle(currentGetAppData.AppTitle)
    setAppDescription(currentGetAppData.AppDescription)
    setAppKeywords(currentGetAppData.AppKeywords)
    setMainTitle(currentGetAppData.MainTitle)
    setMainDescription(currentGetAppData.MainDescription)
  }, [currentGetAppData])

  useEffect(() => {
    getAppInformation()
  }, [])

  const handleOnSubmit = () => {
    if (!getAppTitle || getAppTitle.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the App Title.')
      handleClick()
    } else if (!getAppDescription || getAppDescription.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the App Description.')
      handleClick()
    } else if (!getAppKeywords || getAppKeywords.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the App keywords.')
      handleClick()
    } else if (!getMainTitle || getMainTitle.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Main Title.')
      handleClick()
    } else if (!getMainDescription || getMainDescription.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Main Description.')
      handleClick()
    } else {
      setOpenSave(true)
    }
  }

  const handleSaveAppInformation = () => {
    setOpenSave(false)
    let sendData = {
      AppTitle: getAppTitle,
      AppDescription: getAppDescription,
      AppKeywords: getAppKeywords,
      MainTitle: getMainTitle,
      MainDescription: getMainDescription
    }
    postJsonDataAppInformation(sendData)
  }

  async function getAppInformation() {
    try {
      const response = await fetch('http://localhost:3002/api/app-information', {
        method: 'GET' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      currentSetAppData(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function postJsonDataAppInformation(data) {
    try {
      const response = await fetch('http://localhost:3002/api/set-app-information', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })

      const result = await response.json()
      console.log('Success:', result)
      if (result) {
        setSnackbarType('success')
        setMessage('Data saved successfully.')
        handleClick()
      } else {
        setSnackbarType('error')
        setMessage("An error occurred, and the data couldn't be saved successfully")
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Card>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
          {showMessage}
        </Alert>
      </Snackbar>
      <CardHeader title='App Basic Information' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                value={getAppTitle}
                onChange={evt => {
                  setAppTitle(evt.target.value)
                }}
                label='App Title'
                placeholder='Regime Fit'
                helperText='Type your brand name '
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                value={getAppDescription}
                onChange={evt => {
                  setAppDescription(evt.target.value)
                }}
                label='App Description'
                placeholder='Get Workout Plans!'
                helperText='Enter the app description for your SEO metadata.'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                multiline
                fullWidth
                type='text'
                value={getAppKeywords}
                onChange={evt => {
                  setAppKeywords(evt.target.value)
                }}
                label='App Keywords'
                placeholder='Workout Plan, Transform your life, strength,wellness,self-improvement'
                helperText='Enter the app Keywords for your SEO metadata.'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                value={getMainTitle}
                onChange={evt => {
                  setMainTitle(evt.target.value)
                }}
                label='Main Title'
                placeholder='Get Workout Plans!'
                helperText="Enter the brand title you'd like to display on your app's  main homepage"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                required
                fullWidth
                value={getMainDescription}
                onChange={evt => {
                  setMainDescription(evt.target.value)
                }}
                type='text'
                label='Main Description'
                placeholder="Unleash your body's power. Transform your life through strength, wellness, and self-improvement. 💪"
                helperText="Enter the brand description you'd like to display on your app's main homepage"
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'end'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant='contained'
                    size='large'
                    type='submit'
                    startIcon={<ContentSave />}
                    onClick={() => handleOnSubmit()}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Dialog
              open={openSave}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setOpenSave(false)}
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle>{'Confirmation'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                  Are you sure you want to add this item to the list?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenSave(false)}>No</Button>
                <Button onClick={() => handleSaveAppInformation()}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormBasicsAppInformation
