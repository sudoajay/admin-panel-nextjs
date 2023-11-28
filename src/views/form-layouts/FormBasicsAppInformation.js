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

import CardContent from '@mui/material/CardContent'
import ContentSave from 'mdi-material-ui/ContentSave'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))
const FormBasicsAppInformation = () => {
  const [openSave, setOpenSave] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')
  const [mainImage, setMainImage] = useState('')
  const [imageSaved, setImageSaved] = useState(false)

  const [values, setValues] = useState({
    ID: '',
    AppIcon: '',
    AppTitle: '',
    AppDescription: '',
    AppKeywords: '',
    MainTitle: '',
    MainDescription: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangeImage = value => {
    setValues({ ...values, AppIcon: value })
  }

  const handleClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (imageSaved) postJsonDataAppInformation()
  }, [values.AppIcon])

  const onChange = event => {
    const file = event.target.files[0]
    setImageSaved(false)

    // make your own key on the object instance:
    imageSaved
    var ext = file.name.split('.').pop()
    if (ext !== 'svg' && ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      setSnackbarType('error')
      setMessage('Only PNG, JPG, JPEG Supported')
      handleClick()
    } else if (file.size > 1024 * 1024 * 5) {
      setSnackbarType('error')
      setMessage('File size limit: 5 MB')
      handleClick()
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        handleChangeImage(reader.result)
      }
      reader.readAsDataURL(file)
      setMainImage(file)
    }

    // const reader = new FileReader()
    // const { files } = file.target
    // if (files && files.length !== 0) {
    //   reader.onload = () => setImgSrc(reader.result)
    //   reader.readAsDataURL(files[0])
    // }
  }

  useEffect(() => {
    getAppInformation()
  }, [])

  const handleOnSubmit = () => {
    if (values.AppIcon.length == 0) {
      setSnackbarType('error')
      setMessage('Please upload the app icon')
      handleClick()
    } else if (values.AppTitle.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the App Title.')
      handleClick()
    } else if (values.AppDescription.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the App Description.')
      handleClick()
    } else if (values.AppKeywords.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the App keywords.')
      handleClick()
    } else if (values.MainTitle.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Main Title.')
      handleClick()
    } else if (values.MainDescription.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Main Description.')
      handleClick()
    } else {
      setOpenSave(true)
    }
  }

  const handleSaveAppInformation = () => {
    setOpenSave(false)

    if (mainImage.length != '') {
      const formData = new FormData()
      formData.append('file', mainImage)

      uploadSingleFile(formData)
    } else {
      postJsonDataAppInformation()
    }
  }

  async function getAppInformation() {
    try {
      const response = await fetch('http://localhost:3002/api/get/app/information', {
        method: 'GET' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      setValues(result)
      console.log(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function uploadSingleFile(formData) {
    try {
      const response = await fetch('http://localhost:3002/api/app/upload', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'multipart/form-data'
          //'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData
      })

      const result = await response.json()
      console.log('Success:', result)

      if (result.message) {
        setImageSaved(true)
        handleChangeImage(result.filePath)
        setMainImage('')
      } else {
        setSnackbarType('error')
        setMessage(result.error)
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function postJsonDataAppInformation() {
    try {
      const response = await fetch('http://localhost:3002/api/set/app/information', {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(values)
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
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />
      <DialogComponent
        openSave={openSave}
        setOpenSave={setOpenSave}
        message={' Are you sure you want to add this item to the list? '}
        handleYes={handleSaveAppInformation}
      />
      <CardHeader title='App Basic Information' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={values.AppIcon} alt='' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload App Icon
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg,image/jpg, , image/svg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>

                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Supported formats: SVG , PNG, JPG, JPEG. Minimum size: 70x70 pixels. File size limit: 5 MB.
                  </Typography>
                  <Typography variant='body2' sx={{}}>
                    For optimal results, aim for dimensions of at least 260x260 pixels, with a preference for the SVG
                    format.{' '}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                value={values.AppTitle}
                onChange={handleChange('AppTitle')}
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
                value={values.AppDescription}
                onChange={handleChange('AppDescription')}
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
                value={values.AppKeywords}
                onChange={handleChange('AppKeywords')}
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
                value={values.MainTitle}
                onChange={handleChange('MainTitle')}
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
                value={values.MainDescription}
                onChange={handleChange('MainDescription')}
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
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormBasicsAppInformation
