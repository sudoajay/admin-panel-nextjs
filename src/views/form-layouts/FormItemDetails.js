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

import SingleUploadButtons from './SingleUploadButtons'
import MultipleUploadButtons from './MultipleUploadButtons'

import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteForever from 'mdi-material-ui/DeleteForever'
import ContentSave from 'mdi-material-ui/ContentSave'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'

const FormItemsDetails = ({ number, decrement, getItemDetail }) => {
  const [openDelete, setOpenDelete] = useState(false)
  const [openSave, setOpenSave] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')
  const [mainImage, setMainImage] = useState('')
  const [imageNameArr, setImageNameArr] = useState([])
  const [imageSizeArr, setImageSizeArr] = useState([])
  const [imageArr, setImageArr] = useState([])
  const [imageSaved, setImageSaved] = useState(false)

  // ** State
  const [values, setValues] = useState({
    ID: '',
    ItemSlug: '',
    ItemTitle: '',
    ItemDescription: '',
    ItemAmount: '',
    ItemPrice: '',
    ItemMainImage: '',
    ItemImages: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangeMainImage = value => {
    setValues({ ...values, ItemMainImage: value })
  }

  const handleChangeImages = value => {
    setValues({ ...values, ItemImages: value })
  }

  useEffect(() => {
    if (getItemDetail != undefined) {
      console.log(getItemDetail)
      setValues(getItemDetail)
      let arrFileName = [],
        arrFileSize = []

      if (getItemDetail.ItemImages !== undefined && getItemDetail.ItemImages != '') {
        getItemDetail.ItemImages.map(info => {
          let split = info.split(' - ')
          arrFileName.push(String(split[0]).replace(/\s/g, ''))
          arrFileSize.push(String(split[1]).replace(/\s/g, ''))
        })

        setImageNameArr(arrFileName)
        setImageSizeArr(arrFileSize)
      }
    }
  }, [getItemDetail])

  useEffect(() => {
    if (imageSaved) postJsonDataItemDetail()
  }, [values.ItemImages])

  const upadteMainImage = image => {
    setMainImage(image)
    handleChangeMainImage(image.name)
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

  const handleOnSubmit = () => {
    if (values.ItemSlug.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Item Slug.')
      handleClick()
    } else if (values.ItemTitle.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Item Title.')
      handleClick()
    } else if (values.ItemDescription.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Item Description.')
      handleClick()
    } else if (values.ItemAmount.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Item Amount.')
      handleClick()
    } else if (values.ItemPrice.length == 0) {
      setSnackbarType('error')
      setMessage('Please provide the Item Price.')
      handleClick()
    } else if (values.ItemMainImage.length == 0) {
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
  const handleOpenDelete = () => {
    setOpenDelete(false)
    decrement()
    if (getItemDetail != undefined) {
      deleteItem()
    }
  }

  const handleSaveItemDetail = () => {
    setOpenSave(false)

    // single upload file

    const formData = new FormData()
    formData.append('file', mainImage)
    formData.append('number', getItemDetail != undefined ? getItemDetail.ID : number)
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

      if (result.message || values.ItemMainImage.length != 0) {
        const formData = new FormData()
        imageArr.map(file => {
          console.log(' files', JSON.stringify(file.name))

          formData.append('files', file)
        })

        formData.append('number', getItemDetail != undefined ? getItemDetail.ID : number)

        handleChangeMainImage('mainImage.webp')
        setImageSaved(true)

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

      if (result.message || imageNameArr.length != 0) {
        var imagesData = ''
        imageNameArr.map((item, index) => {
          imagesData +=
            (imagesData.length == 0 ? '' : ',') +
            (imageArr.length == 0
              ? '(' + item + ' - ' + imageSizeArr[index] + ')'
              : '(' + (index + 1) + '.webp' + ' - ' + imageSizeArr[index] + ')')
        })
        console.log(values.ItemImages)

        console.log(imagesData)
        console.log(imageSaved)

        if (imagesData == values.ItemImages) postJsonDataItemDetail()
        else handleChangeImages(imagesData)
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

  async function postJsonDataItemDetail() {
    let url =
      getItemDetail != undefined
        ? 'http://localhost:3002/api/set/update/item'
        : 'http://localhost:3002/api/set/new/item'
    let met = getItemDetail != undefined ? 'PUT' : 'POST'
    try {
      const response = await fetch(url, {
        method: met, // *GET, POST, PUT, DELETE, etc.
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
        if (getItemDetail != undefined) {
          setSnackbarType('success')
          setMessage('Data saved successfully.')
          handleClick()
        } else window.location.reload()
      } else {
        setSnackbarType('error')
        setMessage("An error occurred, and the data couldn't be saved successfully")
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // const resetEverything = () => {
  //   setMainImage('')
  //   if (imageArr.length != 0) {
  //     let nameArr = []
  //     imageArr.map((item, index) => {
  //       nameArr.push(index + 1 + '.webp')
  //     })
  //     setImageNameArr(nameArr)
  //   }
  //   setImageArr([])
  // }

  async function deleteItem() {
    try {
      const response = await fetch('http://localhost:3002/api/delete/item/' + getItemDetail.ID, {
        method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      if (result) {
        window.location.reload()
      } else {
        setSnackbarType('error')
        setMessage('Unable to delete data; an error occurred.')
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
        openSave={openDelete}
        setOpenSave={setOpenDelete}
        message={'Are you sure you want to delete this user from the list?'}
        handleYes={handleOpenDelete}
        Button1={'Cancel'}
        Button2={'Agree'}
      />
      <DialogComponent
        openSave={openSave}
        setOpenSave={setOpenSave}
        message={'Are you certain you want to add this user to the list?'}
        handleYes={handleSaveItemDetail}
      />
      <CardHeader title={' Item ' + number} titleTypographyProps={{ variant: 'h6' }} />

      <CardContent>
        <form enctype='multipart/form-data' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={values.ItemSlug}
                onChange={handleChange('ItemSlug')}
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
                value={values.ItemTitle}
                onChange={handleChange('ItemTitle')}
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
                value={values.ItemDescription}
                onChange={handleChange('ItemDescription')}
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
                  value={values.ItemAmount}
                  onChange={handleChange('ItemAmount')}
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
                  value={values.ItemPrice}
                  onChange={handleChange('ItemPrice')}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <SingleUploadButtons
                number={number}
                upadteMainImage={upadteMainImage}
                mainImageName={values.ItemMainImage}
              />
            </Grid>

            <Grid item xs={12}>
              <MultipleUploadButtons
                number={number}
                upadteImages={upadteImages}
                onDelete={onDelete}
                imageNameArr={imageNameArr}
                imageSizeArr={imageSizeArr}
                setImageSaved={setImageSaved}
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
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormItemsDetails
