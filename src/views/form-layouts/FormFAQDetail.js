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
import DeleteForever from 'mdi-material-ui/DeleteForever'
import ContentSave from 'mdi-material-ui/ContentSave'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'

const FormItemsDetails = ({ number, decrement, getFAQDetail }) => {
  const [open, setOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('error')
  const [showMessage, setMessage] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openSave, setOpenSave] = useState(false)

  // ** State
  const [values, setValues] = useState({
    ID: '',
    Question: '',
    Answer: ''
  })

  useEffect(() => {
    if (getFAQDetail != undefined) setValues(getFAQDetail)
  }, [getFAQDetail])

  const handleOnSubmit = () => {
    if (values.Question.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The FAQ Question.')
      handleClick()
    } else if (values.Answer.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The FAQ Answer.')
      handleClick()
    } else {
      setOpenSave(true)
    }
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSaveItemDetail = () => {
    setOpenSave(false)
    postJsonFAQDetail()
  }

  const handleOpenDelete = () => {
    setOpenDelete(false)
    decrement()

    if (getFAQDetail != undefined) {
      deleteFAQ()
    }
  }

  async function postJsonFAQDetail() {
    let url =
      getFAQDetail != undefined ? 'http://localhost:3002/api/set/update/faq' : 'http://localhost:3002/api/set/new/faq'
    let met = getFAQDetail != undefined ? 'PUT' : 'POST'

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
        if (getFAQDetail != undefined) {
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

  async function deleteFAQ() {
    try {
      const response = await fetch('http://localhost:3002/api/delete/faq/' + getFAQDetail.ID, {
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
      <CardHeader title={' FAQ ' + number} titleTypographyProps={{ variant: 'h6' }} />

      <CardContent>
        <form enctype='multipart/form-data' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={values.Question}
                onChange={handleChange('Question')}
                type='text'
                label='FAQ Question'
                placeholder='What fitness level do I need to be at to start these workout plans?'
                helperText='Please provide the FAQ question in this space.'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                multiline
                rows={3}
                fullWidth
                value={values.Answer}
                onChange={handleChange('Answer')}
                type='text'
                label='FAQ Answer'
                placeholder='These workout plans are specifically designed for beginners who are just starting their fitness journey. They are suitable for individuals who have never been to the gym before or those who are new to exercise.'
                helperText='Please provide the FAQ answer in this space.'
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: '0rem' }}>
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
