// ** React Imports
import { useState, useEffect } from 'react'
import * as React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import FormAddItems from 'src/views/form-layouts/FormAddItems'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'
import TabNewUser from 'src/views/account-settings/TabNewUser'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')
  const [getCountItem, setCountItem] = useState(1)
  const [getUserInfo, setUserInfo] = useState([{}])
  const [open, setOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('error')
  const [showMessage, setMessage] = useState('')

  const handleClick = () => {
    setOpen(true)
  }

  const increment = () => {
    setCountItem(getCountItem + 1)
  }
  const decrement = () => {
    setCountItem(getCountItem - 1)
  }

  useEffect(() => {
    fetchGetAllUserInfo()
  }, [])

  async function fetchGetAllUserInfo() {
    try {
      const response = await fetch('http://localhost:3002/api/admin/get/all/user', {
        method: 'GET' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      console.log(result)
      if (result.Info) {
        setSnackbarType('error')
        setMessage(result.Info)
        handleClick()
      } else {
        setUserInfo(result)
        setCountItem(result.length - 1)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <DatePickerWrapper>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountOutline />
                  <TabName>Account</TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockOpenOutline />
                  <TabName>Security</TabName>
                </Box>
              }
            />
            {/* <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          /> */}
          </TabList>

          <TabPanel sx={{ p: 0 }} value='account'>
            <TabAccount getUserInfo={getUserInfo[0]} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='security'>
            <TabSecurity getUserInfo={getUserInfo[0]} />
          </TabPanel>
          {/* <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel> */}
        </TabContext>
      </Card>

      {Array(getCountItem)
        .fill()
        .map(function (v, i) {
          return (
            <Grid
              item
              xs={12}
              sx={{
                marginTop: '2em'
              }}
            >
              <TabNewUser number={i + 1} decrement={decrement} getUserInfo={getUserInfo[i + 1]} />
            </Grid>
          )
        })}

      {getCountItem <= 10 ? (
        <Grid
          item
          xs={12}
          sx={{
            marginTop: '2em'
          }}
        >
          <FormAddItems increment={increment} text={'Add New User'} />
        </Grid>
      ) : (
        ''
      )}
    </DatePickerWrapper>
  )
}

export default AccountSettings
