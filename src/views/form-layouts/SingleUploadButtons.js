import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { Container } from '@mui/material'

// ** Icons Imports
import CloudUpload from 'mdi-material-ui/CloudUpload'
import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function SlideTransition(props) {
  return <Slide {...props} direction='down' />
}

export default function SingleUploadButtons({ number, upadteMainImage, mainImageName }) {
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

  const handleFileUpload = event => {
    const file = event.target.files[0]

    // make your own key on the object instance:
    upadteMainImage('')
    var ext = file.name.split('.').pop()
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg' && ext !== 'webp') {
      setSnackbarType('error')
      setMessage('Only PNG, JPG, JPEG, WebP. Supported')
      handleClick()
    } else if (file.size > 1024 * 1024 * 5) {
      setSnackbarType('error')
      setMessage('File size limit: 5 MB')
      handleClick()
    } else {
      // const formData = new FormData()
      // formData.append('file', file)
      // formData.append('fileName', file.name)
      // formData.append('number', number)
      // uploadSingleFile(formData)

      upadteMainImage(file)
    }
  }

  return (
    <Container maxWidth='none' sx={{ mt: 0 }}>
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
      <Stack direction='row' alignItems='' spacing={2} sx={{ height: 50, marginBottom: '1rem' }}>
        <TextField
          type='text'
          value={mainImageName}
          placeholder=''
          helperText='Supported formats: PNG, JPG, JPEG, WebP, with a file size limit of 5 MB.'
        />
        <label htmlFor={'upload-image' + number}>
          <Button
            variant='contained'
            component='span'
            sx={{ height: 52, marginTop: 0.5, color: 'common.white', backgroundColor: 'primary.main' }}
            startIcon={<CloudUpload sx={{ fontSize: '3rem' }} />}
          >
            Upload Main Image
          </Button>

          <input id={'upload-image' + number} hidden accept='image/*' type='file' onChange={handleFileUpload} />
        </label>
        {/* {imageUrl && <img src={imageUrl} alt='Uploaded Image' height='300' />} */}
      </Stack>
    </Container>
  )
}
