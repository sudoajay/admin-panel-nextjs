import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { Container } from '@mui/material'

// ** Icons Imports
import CloudUpload from 'mdi-material-ui/CloudUpload'
import * as React from 'react'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'

export default function SingleUploadButtons({ number, upadteMainImage, mainImageName }) {
  const [open, setOpen] = useState(false)
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')

  const handleClick = () => {
    setOpen(true)
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
      upadteMainImage(file)
    }
  }

  return (
    <Container maxWidth='none' sx={{ mt: 0 }}>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />

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

          <input
            id={'upload-image' + number}
            hidden
            accept='image/png, image/jpeg,image/jpg,image/webp'
            type='file'
            onChange={handleFileUpload}
          />
        </label>
      </Stack>
    </Container>
  )
}
