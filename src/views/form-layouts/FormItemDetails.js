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
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import { IconButton } from '@mui/material'

import SingleUploadButtons from './SingleUploadButtons'
import MultipleUploadButtons from './MultipleUploadButtons'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteForever from 'mdi-material-ui/DeleteForever'
import ContentSave from 'mdi-material-ui/ContentSave'
import Slide from '@mui/material/Slide'

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
const FormItemsDetails = ({ number, decrement }) => {
  const [getItemSlug, setItemSlug] = useState('')
  const [getItemTitle, setItemTitle] = useState('')
  const [getItemDescription, setItemDescription] = useState('')
  const [getItemAmount, setItemAmount] = useState('')
  const [getItemPrice, setItemPrice] = useState('')

  const [openDelete, setOpenDelete] = useState(false)
  const [openSave, setOpenSave] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')
  const [mainImage, setMainImage] = useState('')
  const [mainImageName, setMainImageName] = useState('')
  const [imageNameArr, setImageNameArr] = useState([])
  const [imageSizeArr, setImageSizeArr] = useState([])
  const [imageArr, setImageArr] = useState([])
  const [getItemData, setItemData] = useState({})

  useEffect(() => {
    getItemDetail()
  }, [])
  useEffect(() => {
    setItemSlug(getItemData.ItemSlug)
    setItemTitle(getItemData.ItemTitle)
    setItemDescription(getItemData.ItemDescription)
    setItemAmount(getItemData.ItemAmount)
    setItemPrice(getItemData.ItemPrice)
    setMainImageName(getItemData.ItemMainImage)
    let arrFileName = [],
      arrFileSize = []

    if (getItemData.ItemImages !== undefined && getItemData.ItemImages != '') {
      getItemData.ItemImages.replaceAll('(', '')
        .replaceAll(')', '')
        .split(',')
        .map(info => {
          let split = info.split(' - ')
          arrFileName.push(split[0])
          arrFileSize.push([split[1]])
        })

      setImageNameArr(arrFileName)
      setImageSizeArr(arrFileSize)
    }
  }, [getItemData])

  const upadteMainImage = image => {
    setMainImage(image)
    setMainImageName(image.name)
  }

  const upadteImages = (arrFileName, arrFileSize, arrFile) => {
    setImageNameArr(arrFileName)
    setImageSizeArr(arrFileSize)
    setImageArr(arrFile)
  }

  const onDelete = index => {
    setImageNameArr(imageNameArr.filter(x => x !== imageNameArr[index]))
    setImageSizeArr(imageSizeArr.filter(x => x !== imageSizeArr[index]))
    setImageArr(imageArr.filter(x => x !== imageArr[index]))
  }

  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'right'
  }

  const handleOnSubmit = () => {
    if (!getItemSlug || getItemSlug.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Item Slug.')
      handleClick()
    } else if (!getItemTitle || getItemTitle.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Item Title.')
      handleClick()
    } else if (!getItemDescription || getItemDescription.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Item Description.')
      handleClick()
    } else if (!getItemAmount || getItemAmount.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Item Amount.')
      handleClick()
    } else if (!getItemPrice || getItemPrice.length == '') {
      setSnackbarType('error')
      setMessage('Please provide the Item Price.')
      handleClick()
    } else if (!mainImageName || mainImageName == '') {
      setSnackbarType('error')
      setMessage('Upload Main image.')
      handleClick()
    } else if (!imageNameArr || imageNameArr.length == 0) {
      setSnackbarType('error')
      setMessage('mutiplee file uploadf.')
      handleClick()
    } else {
      setOpenSave(true)
    }
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

  const handleSaveItemDetail = () => {
    setOpenSave(false)

    // single upload file

    const formData = new FormData()
    formData.append('file', mainImage)
    formData.append('number', number)
    uploadSingleFile(formData)
  }

  async function uploadSingleFile(formData) {
    try {
      const response = await fetch('http://localhost:3002/api/single/upload', {
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

      if (result.Success || mainImageName.length != 0) {
        const formData = new FormData()
        imageArr.map(file => {
          console.log(' files', JSON.stringify(file.name))
          formData.append('files', file)
        })

        formData.append('number', number)
        uploadMultipleFile(formData)
      } else {
        setSnackbarType('error')
        setMessage(result.error)
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function uploadMultipleFile(formData) {
    try {
      const response = await fetch('http://localhost:3002/api/multiple/upload', {
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
      if (result.Success || imageNameArr.length != 0) {
        var imagesData = ''
        imageNameArr.map((item, index) => {
          imagesData +=
            (imagesData.length == 0 ? '' : ',') +
            (imageArr.length == 0
              ? '(' + item + ' - ' + imageSizeArr[index] + ')'
              : '(' + (index + 1) + '.webp' + ' - ' + imageSizeArr[index] + ')')
        })

        let sendData = {
          ItemSlug: getItemSlug,
          ItemTitle: getItemTitle,
          ItemDescription: getItemDescription,
          ItemAmount: getItemAmount,
          ItemPrice: getItemPrice,
          ItemMainImage: 'mainImage.webp',
          ItemImages: imagesData
        }
        postJsonDataItemDetail(sendData)
      } else {
        setSnackbarType('error')
        setMessage(result.error)
        handleClick()
      }
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  async function getItemDetail() {
    try {
      const response = await fetch('http://localhost:3002/api/get/item/' + number, {
        method: 'GET' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      if (result) {
        setItemData(result)
      } else {
        setItemData({
          ItemSlug: '',
          ItemTitle: '',
          ItemDescription: '',
          ItemAmount: '',
          ItemPrice: '',
          ItemMainImage: '',
          ItemImages: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  async function postJsonDataItemDetail(data) {
    try {
      const response = await fetch('http://localhost:3002/api/set/item/' + number, {
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
        resetEverything()
      } else {
        setSnackbarType('error')
        setMessage("An error occurred, and the data couldn't be saved successfully")
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetEverything = () => {
    setMainImageName('mainImage.webp')
    setMainImage('')
    if (imageArr.length != 0) {
      let nameArr = []
      imageArr.map((item, index) => {
        nameArr.push(index + 1 + '.webp')
      })
      setImageNameArr(nameArr)
    }
    setImageArr([])
  }

  const handleOpenDelete = () => {
    setOpenDelete(false)
    decrement()
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
      <CardHeader title={' Item ' + number} titleTypographyProps={{ variant: 'h6' }} />

      <CardContent>
        <form enctype='multipart/form-data' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={getItemSlug}
                onChange={evt => {
                  setItemSlug(evt.target.value)
                }}
                type='text'
                label='Slug'
                placeholder='novice-abs-blitz'
                helperText='Please provide the slug for your item page to uniquely identify the specific item.'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={getItemTitle}
                onChange={evt => {
                  setItemTitle(evt.target.value)
                }}
                type='text'
                label='Title'
                placeholder='Novice Abs Blitz'
                helperText='Type your item Title'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={getItemDescription}
                onChange={evt => {
                  setItemDescription(evt.target.value)
                }}
                type='text'
                label='Description'
                placeholder='Novice Abs Blitz'
                helperText='Type your item Description'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
                <OutlinedInput
                  required
                  id='outlined-adornment-amount'
                  startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                  placeholder='9.99'
                  type='number'
                  label='Amount'
                  value={getItemAmount}
                  onChange={evt => {
                    setItemAmount(evt.target.value)
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor='outlined-adornment-price'>Rupee</InputLabel>
                <OutlinedInput
                  required
                  id='outlined-adornment-price'
                  startAdornment={<InputAdornment position='start'>₹</InputAdornment>}
                  placeholder='799'
                  label='price'
                  type='number'
                  value={getItemPrice}
                  onChange={evt => {
                    setItemPrice(evt.target.value)
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <SingleUploadButtons number={number} upadteMainImage={upadteMainImage} mainImageName={mainImageName} />
            </Grid>

            <Grid item xs={12}>
              <MultipleUploadButtons
                number={number}
                upadteImages={upadteImages}
                onDelete={onDelete}
                imageNameArr={imageNameArr}
                imageSizeArr={imageSizeArr}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: '2rem' }}>
              <Box
                sx={{
                  gap: 5,
                  marginTop: '1rem',
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
                    startIcon={<DeleteForever />}
                    onClick={() => setOpenDelete(true)}
                  >
                    Delete
                  </Button>
                </Box>
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
              open={openDelete}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setOpenDelete(false)}
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle>{'Confirmation'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                  Are you sure you want to delete this item from the list?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                <Button onClick={() => handleOpenDelete()}>Agree</Button>
              </DialogActions>
            </Dialog>

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
                <Button onClick={() => handleSaveItemDetail()}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormItemsDetails
