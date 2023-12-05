// ** MUI Imports
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormBasicsAppInformation from 'src/views/form-layouts/FormBasicsAppInformation'

import FormTable from 'src/views/form-layouts/FormTable'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import TableBasic from 'src/views/tables/TableBasic'
import SnackbarComponent from 'src/layouts/components/SnackbarComponent'

const ShowData = () => {
  const [open, setOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('error')
  const [showMessage, setMessage] = useState('')

  const [getPaymentFormData, setPaymentFormData] = useState([{}])
  const [getPaymentFormOnlyKey, setPaymentFormOnlyKey] = useState([])

  const [getPaymentData, setPaymentData] = useState([{}])
  const [getPaymentOnlyKey, setPaymentOnlyKey] = useState([])

  const [selectedID, setSelectedID] = useState(-1)

  const handleClick = () => {
    setOpen(true)
  }
  useEffect(() => {
    fetchGetAllPaymentFormData()
    fetchGetAllPaymentData()
  }, [])

  async function fetchGetAllPaymentFormData() {
    try {
      const response = await fetch('http://localhost:3002/api/get/all/paymentform', {
        method: 'GET' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      if (result.Info) {
        setSnackbarType('error')
        setMessage(result.Info)
        handleClick()
      } else {
        setPaymentFormData(result)
        setPaymentFormOnlyKey(Object.keys(result[0]))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function fetchGetAllPaymentData() {
    try {
      const response = await fetch('http://localhost:3002/api/get/all/payment', {
        method: 'GET' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      if (result.Info) {
        setSnackbarType('error')
        setMessage(result.Info)
        handleClick()
      } else {
        setPaymentData(result)
        setPaymentOnlyKey(Object.keys(result[0]))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function deleteDataFromPayment() {
    try {
      const response = await fetch('http://localhost:3002/api/delete/payment/' + selectedID, {
        method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      if (result) {
        setPaymentData([])
        setPaymentData(getPaymentData.filter(item => item.ID !== selectedID))
        // window.location.reload()
      } else {
        setSnackbarType('error')
        setMessage('Unable to delete data; an error occurred.')
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function deleteDataFromPaymentForm() {
    try {
      const response = await fetch('http://localhost:3002/api/delete/paymentform/' + selectedID, {
        method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })

      const result = await response.json()
      if (result) {
        setPaymentFormData([])
        setPaymentFormData(getPaymentFormData.filter(item => item.ID !== selectedID))

        // window.location.reload()
      } else {
        setSnackbarType('error')
        setMessage('Unable to delete data; an error occurred.')
        handleClick()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const restartThePayment = () => {
    setPaymentData([])
    setPaymentData(getPaymentData.filter(item => true))
  }
  const restartThePaymentForm = () => {
    setPaymentFormData([])
    setPaymentFormData(getPaymentFormData.filter(item => true))
  }

  return (
    <DatePickerWrapper>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormTable
            heading={'Payment Data '}
            rows={getPaymentData}
            columns={getPaymentOnlyKey}
            deleteData={deleteDataFromPayment}
            setSelectedID={setSelectedID}
            restart={restartThePayment}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTable
            heading={'Payment Form Data '}
            rows={getPaymentFormData}
            columns={getPaymentFormOnlyKey}
            deleteData={deleteDataFromPaymentForm}
            setSelectedID={setSelectedID}
            restart={restartThePaymentForm}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <FormLayoutsIcons />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormLayoutsSeparator />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsAlignment />
        </Grid> */}
      </Grid>
    </DatePickerWrapper>
  )
}

export default ShowData
