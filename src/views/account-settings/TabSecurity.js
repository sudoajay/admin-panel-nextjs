// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'

const TabSecurity = ({ getUserInfo }) => {
  // ** States
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')
  const [open, setOpen] = useState(false)
  const [openSave, setOpenSave] = useState(false)

  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false,
    newPasswordSaved: false
  })

  const [newUserInfo, setNewUserInfo] = useState(getUserInfo)

  useEffect(() => {
    if (getUserInfo != undefined) setNewUserInfo(getUserInfo)
  }, [getUserInfo])

  useEffect(() => {
    if (values.newPasswordSaved) postJsonDataAccount(newUserInfo)
  }, [newUserInfo.PassWord])

  // Handle Current Password
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShow = prop => {
    setValues({ ...values, [prop]: !values[prop] })
  }

  const handleMouseDown = event => {
    event.preventDefault()
  }
  const handleClick = () => {
    setOpen(true)
  }

  const handleOnSubmit = () => {
    if (values.currentPassword.length == 0 || values.currentPassword != getUserInfo.PassWord) {
      setSnackbarType('error')
      setMessage('The Entered Current Password Is Incorrect.')
      handleClick()
    } else if (values.newPassword.length == 0) {
      setSnackbarType('error')
      setMessage('Kindly Enter The New Password.')
      handleClick()
    } else if (values.confirmNewPassword.length == 0) {
      setSnackbarType('error')
      setMessage('Kindly Enter The Confirm New Password.')
      handleClick()
    } else if (values.newPassword != values.confirmNewPassword) {
      setSnackbarType('error')
      setMessage('Mismatch: The New Password And The Confirmation Differ.')
      handleClick()
    } else {
      setValues({ ...values, newPasswordSaved: true })

      setOpenSave(true)
    }
  }

  const handleSaveAccountPassword = () => {
    setOpenSave(false)
    setNewUserInfo({ ...newUserInfo, PassWord: values.confirmNewPassword })
  }

  async function postJsonDataAccount(value) {
    try {
      const response = await fetch('http://localhost:3002/api/admin/update/user', {
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
        body: JSON.stringify(value)
      })

      const result = await response.json()
      console.log('Success:', result)

      if (result) {
        setSnackbarType('success')
        setMessage('Your Information Has Been Successfully Saved.')
        handleClick()
        window.location.reload()
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
    <form enctype='multipart/form-data' onSubmit={e => e.preventDefault()}>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />
      <DialogComponent
        openSave={openSave}
        setOpenSave={setOpenSave}
        message={'Are you sure you want to change your password?'}
        handleYes={handleSaveAccountPassword}
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={() => handleClickShow('showCurrentPassword')}
                          onMouseDown={handleMouseDown}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={handleMouseDown}
                          aria-label='toggle password visibility'
                          onClick={() => handleClickShow('showNewPassword')}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDown}
                          onClick={() => handleClickShow('showConfirmNewPassword')}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ marginTop: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant='h6'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Avatar
              variant='rounded'
              sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
            >
              <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in.
            </Typography>
            <Tooltip title='Coming Soon' arrow>
              <Button>Learn more</Button>
            </Tooltip>
          </Box>
        </Box>

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
                onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
                sx={{ marginRight: 3.5 }}
                variant='outlined'
                color='secondary'
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </form>
  )
}

export default TabSecurity
