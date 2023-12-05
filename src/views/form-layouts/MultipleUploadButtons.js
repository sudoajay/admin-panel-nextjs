import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import CloudUpload from 'mdi-material-ui/CloudUpload'

import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'

import FileNameTypography from './FileNameTypography'
import * as React from 'react'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'

export default function MultipleUploadButtons({
  number,
  upadteImages,
  onDelete,
  imageNameArr,
  imageSizeArr,
  setImageSaved
}) {
  const [open, setOpen] = useState(false)
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')

  const handleClick = () => {
    setOpen(true)
  }

  const handleMultipleFileUpload = event => {
    let arrFileName = [],
      arrFileSize = [],
      arrFile = []
    setImageSaved(false)

    Array.from(event.target.files).map((file, index) => {
      let suffix = 'bytes'
      let fileSize = file.size
      var ext = file.name.split('.').pop()
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg' && ext !== 'webp') {
        setSnackbarType('error')
        setMessage('Only PNG, JPG, JPEG, WebP. Supported')
        handleClick()
      } else if (file.size > 1024 * 1024 * 5) {
        setSnackbarType('error')
        setMessage('File size limit: 5 MB')
        handleClick()
      } else if (index >= 8) {
        setSnackbarType('error')
        setMessage('You can upload a maximum of 8 files')
        handleClick()
        return
      } else {
        if (fileSize >= 1024 && fileSize < 1024000) {
          suffix = 'KB'
          fileSize = Math.round((fileSize / 1024) * 100) / 100
        } else if (size >= 1024000) {
          suffix = 'MB'
          fileSize = Math.round((fileSize / 1024000) * 100) / 100
        }
        arrFileName.push(file.name)
        arrFileSize.push(fileSize + ' ' + suffix)
        arrFile.push(file)
      }
    })

    upadteImages(arrFileName, arrFileSize, arrFile)
  }

  return (
    <Container maxWidth='none' sx={{ mt: 0, marginTop: 1 }}>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />

      <CardContent
        sx={{
          borderRadius: '8px',
          backgroundColor: '#d6d6d6',
          marginTop: 2,
          padding: theme => `${theme.spacing(7, 5, 7)} !important`
        }}
      >
        <Typography variant='h5' sx={{ color: '#000', marginBottom: 2 }}>
          Multiple File Upload
        </Typography>
        {Array(imageNameArr.length)
          .fill()
          .map(function (v, i) {
            return (
              <FileNameTypography fileName={imageNameArr[i]} fileSize={imageSizeArr[i]} onDelete={onDelete} index={i} />
            )
          })}
      </CardContent>
      <Stack direction='row' alignItems='' spacing={2} sx={{ height: 50, marginBottom: '1rem' }}>
        <label htmlFor={'upload-multipleImage' + number}>
          <Button
            variant='contained'
            component='span'
            sx={{ height: 52, marginTop: 5, color: 'common.white', backgroundColor: 'primary.main' }}
            startIcon={<CloudUpload sx={{ fontSize: '3rem' }} />}
          >
            Upload Multipe File
          </Button>

          <input
            multiple
            id={'upload-multipleImage' + number}
            hidden
            accept='image/png, image/jpeg,image/jpg,image/webp'
            type='file'
            onChange={handleMultipleFileUpload}
          />
        </label>
        {/* {imageUrl && <img src={imageUrl} alt='Uploaded Image' height='300' />} */}
      </Stack>
      <Card></Card>
    </Container>
  )
}
