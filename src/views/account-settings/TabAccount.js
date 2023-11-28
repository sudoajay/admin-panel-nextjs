// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

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
import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
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

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabAccount = ({ getUserInfo }) => {
  // ** State

  const [mainImage, setMainImage] = useState('')
  const [showMessage, setMessage] = useState('Only PNG, JPG, JPEG, WebP. Supported')
  const [snackbarType, setSnackbarType] = useState('error')
  const [open, setOpen] = useState(false)
  const [openSave, setOpenSave] = useState(false)
  const [imageSaved, setImageSaved] = useState(false)

  // ** State
  const [values, setValues] = useState({
    UserName: '',
    Name: '',
    Role: '',
    Status: '',
    PromoCode: '',
    PercentOff: '',
    Email: '',
    Image: '/images/avatars/1.png',
    Country: '',
    Phone: '',
    Gender: ''
  })

  const handleClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (getUserInfo != undefined) setValues(getUserInfo)
  }, [getUserInfo])

  useEffect(() => {
    if (imageSaved) postJsonDataAccount()
  }, [values.Image])

  const handleReset = () => {
    setValues(getUserInfo)
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangeImage = value => {
    setValues({ ...values, Image: value })
  }
  const handleChangeStatus = value => {
    setValues({ ...values, Status: value == 'active' ? 1 : 0 })
  }

  const handleChangeGender = value => {
    setValues({ ...values, Gender: value == 'male' ? 'M' : value == 'female' ? 'F' : 'O' })
  }

  const onChange = event => {
    const file = event.target.files[0]
    setImageSaved(false)

    var ext = file.name.split('.').pop()
    if (ext !== 'svg' && ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      setSnackbarType('error')
      setMessage('Only PNG, JPG, JPEG and WEBP Supported')
      handleClick()
    } else if (file.size > 1024 * 1024 * 5) {
      setSnackbarType('error')
      setMessage('File size limit: 5 MB')
      handleClick()
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        handleChangeImage(reader.result)
        // setImgSrc(reader.result)
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

  const handleProfileReset = () => {
    setMainImage('')
    handleChangeImage('/images/avatars/1.png')
  }

  const handleOnSubmit = () => {
    if (values.Image.length == 0) {
      setSnackbarType('error')
      setMessage('Please upload Profile Pic')
      handleClick()
    } else if (values.UserName.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The UserName.')
      handleClick()
    } else if (values.Name.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The Name.')
      handleClick()
    } else if (values.PromoCode.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The Promo Code')
      handleClick()
    } else if (values.PercentOff.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The Percent Off in Number.')
      handleClick()
    } else if (values.Email.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The Email.')
      handleClick()
    } else if (values.Country.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The Country.')
      handleClick()
    } else if (values.Phone.length == 0) {
      setSnackbarType('error')
      setMessage('Please Provide The Phone.')
      handleClick()
    } else {
      setOpenSave(true)
    }
  }
  const handleSaveAccountSetting = () => {
    setOpenSave(false)

    if (mainImage.length != '') {
      const formData = new FormData()
      formData.append('file', mainImage)
      formData.append('number', values.ID)

      uploadSingleFile(formData)
    } else {
      postJsonDataAccount()
    }
  }

  async function uploadSingleFile(formData) {
    try {
      const response = await fetch('http://localhost:3002/api/account/upload', {
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
      handleChangeImage('')

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

  async function postJsonDataAccount() {
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
    <CardContent>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />
      <DialogComponent
        openSave={openSave}
        setOpenSave={setOpenSave}
        message={' Are you certain about saving this information? '}
        handleYes={handleSaveAccountSetting}
      />
      <form enctype='multipart/form-data' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={values.Image} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg,image/jpg,image/webp'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={handleProfileReset}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG or Webp. Max size of 5 MB.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Username'
              placeholder='johnDoe'
              defaultValue='johnDoe'
              value={values.UserName}
              onChange={handleChange('UserName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Name'
              placeholder='John Doe'
              defaultValue='John Doe'
              value={values.Name}
              onChange={handleChange('Name')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Role'
              placeholder='Admin'
              defaultValue='Admin'
              InputProps={{
                readOnly: true
              }}
            />
            {/* <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Seller</MenuItem>
              </Select>
            </FormControl> */}
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
              fullWidth
              type='text'
              label='Promo Code'
              placeholder='AJA40'
              defaultValue='AJA40'
              value={values.PromoCode}
              onChange={handleChange('PromoCode')}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type='number'
              label='Percent off'
              placeholder='40'
              defaultValue='40'
              value={values.PercentOff}
              onChange={handleChange('PercentOff')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue='johnDoe@example.com'
              value={values.Email}
              onChange={handleChange('Email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Country'
              placeholder='USA'
              defaultValue='USA'
              value={values.Country}
              onChange={handleChange('Country')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              placeholder='(123) 456-7890'
              value={values.Phone}
              onChange={handleChange('Phone')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                row
                defaultValue='male'
                aria-label='gender'
                name='account-settings-info-radio'
                value={values.Gender == 'M' ? 'male' : values.Gender == 'F' ? 'female' : 'other'}
                onChange={evt => {
                  handleChangeGender(evt.target.value)
                }}
              >
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
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
                  onClick={handleReset}
                  sx={{ marginRight: 3.5 }}
                  variant='outlined'
                  color='secondary'
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
