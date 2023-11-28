// ** React Imports
import { useState, forwardRef, useEffect } from 'react'
import * as React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import InputAdornment from '@mui/material/InputAdornment'
import EyeOutline from 'mdi-material-ui/EyeOutline'

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const TabAccount = ({ number, decrement, getUserInfo }) => {
  // ** State

  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')
  const [open, setOpen] = useState(false)

  const [openDelete, setOpenDelete] = useState(false)
  const [openSave, setOpenSave] = useState(false)

  // ** State
  const [values, setValues] = useState({
    UserName: '',
    PassWord: '',
    Role: '',
    Status: '',
    PromoCode: '',
    PercentOff: '',
    Name: '',
    Email: '',
    Image: '/images/avatars/1.png',
    Country: '',
    Phone: '',
    Gender: ''
  })

  const [passValues, setPassValues] = useState({
    showPassword: false
  })

  useEffect(() => {
    if (getUserInfo != undefined) setValues(getUserInfo)
  }, [getUserInfo])

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setPassValues({ ...passValues, showPassword: !passValues.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleOpenDelete = () => {
    setOpenDelete(false)
    decrement()

    if (getUserInfo != undefined) {
      deleteUser()
    }
  }

  const handleChangeStatus = value => {
    setValues({ ...values, Status: value == 'active' ? 1 : 0 })
  }

  const handleChangeRole = value => {
    setValues({ ...values, Role: value == 'admin' ? 'Admin' : 'User' })
  }
  const handleClick = () => {
    setOpen(true)
  }
  const handleOnSubmit = () => {
    if (values.UserName.length == '') {
      setSnackbarType('error')
      setMessage('Please Provide The UserName.')
      handleClick()
    } else if (values.PassWord.length == '') {
      setSnackbarType('error')
      setMessage('Please Provide The PassWord.')
      handleClick()
    } else if (values.PromoCode.length == '') {
      setSnackbarType('error')
      setMessage('Please Provide The PromoCode.')
      handleClick()
    } else if (values.PercentOff.length == '') {
      setSnackbarType('error')
      setMessage('Please Provide The PercentOff.')
      handleClick()
    } else {
      setOpenSave(true)
    }
  }
  const handleSaveItemDetail = () => {
    setOpenSave(false)
    //
    postJsonDataAccount()
  }

  async function postJsonDataAccount() {
    let url =
      getUserInfo != undefined
        ? 'http://localhost:3002/api/admin/update/user'
        : 'http://localhost:3002/api/admin/set/new/user'
    let met = getUserInfo != undefined ? 'PUT' : 'POST'

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
        if (getUserInfo != undefined) {
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

  async function deleteUser() {
    try {
      const response = await fetch('http://localhost:3002/api/admin/delete/user/' + getUserInfo.ID, {
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
      <CardHeader title={' User ' + number} titleTypographyProps={{ variant: 'h6' }} />

      <CardContent>
        <form enctype='multipart/form-data' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='Username'
                placeholder='johnDoe'
                value={values.UserName}
                onChange={handleChange('UserName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  id='auth-login-password'
                  value={values.PassWord}
                  onChange={handleChange('PassWord')}
                  type={passValues.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {passValues.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  label='Role'
                  defaultValue='user'
                  value={values.Role == 'Admin' ? 'admin' : 'user'}
                  onChange={evt => {
                    handleChangeRole(evt.target.value)
                  }}
                >
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label='Status'
                  defaultValue='active'
                  value={values.Status ? 'active' : 'inactive'}
                  onChange={evt => {
                    handleChangeStatus(evt.target.value)
                  }}
                >
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                inputProps={{ style: { textTransform: 'uppercase' } }}
                fullWidth
                type='text'
                value={values.PromoCode}
                onChange={handleChange('PromoCode')}
                label='Promo Code'
                placeholder='AJA40'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type='number'
                value={values.PercentOff}
                onChange={handleChange('PercentOff')}
                label='Percent Off'
                placeholder='40'
              />
            </Grid>
            {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 0,
                  marginTop: '1rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'start'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }} onClick={() => handleOnSubmit()}>
                    Save Changes
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    type='reset'
                    onClick={() => setOpenDelete(true)}
                    sx={{ marginRight: 3.5 }}
                    variant='outlined'
                    color='secondary'
                  >
                    Delete User
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

export default TabAccount
