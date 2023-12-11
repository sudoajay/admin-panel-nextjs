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
  async function createPayment(data) {
    try {
      const response = await fetch('http://localhost:3002/api/payment', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (result) {
        let arr = getPaymentData
        setPaymentData([])

        arr.push(data)
        setPaymentData(arr)

        dataDeltedOrEdited(true)

        // window.location.reload()
      } else {
        somethingError()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function updateDataPayment(data) {
    try {
      const response = await fetch('http://localhost:3002/api/update/payment/' + selectedID, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (result) {
        setPaymentData([])
        setPaymentData(getPaymentData.map(item => (item.ID === selectedID ? data : item)))
        dataDeltedOrEdited(true)
        // window.location.reload()
      } else {
        somethingError()
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
        dataDeltedOrEdited(false)
      } else {
        somethingError()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  async function fetchGetAllPaymentFormData() {
    try {
      const response = await fetch('http://localhost:3002/api/get/all/payment/form', {
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

  async function createPaymentForm(data) {
    try {
      const response = await fetch('http://localhost:3002/api/payment/form', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (result) {
        let arr = getPaymentFormData
        setPaymentFormData([])

        arr.push(data)
        setPaymentFormData(arr)

        dataDeltedOrEdited(true)

        // window.location.reload()
      } else {
        somethingError()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function updateDataPaymentForm(data) {
    try {
      const response = await fetch('http://localhost:3002/api/update/payment/form/' + selectedID, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (result) {
        if (data['Created'] == 'Now Time') {
          let arr = getPaymentFormData
          setPaymentFormData([])

          arr.push(data)
          setPaymentFormData(arr)
        } else {
          setPaymentFormData([])
          setPaymentFormData(getPaymentFormData.map(item => (item.ID === selectedID ? data : item)))
        }

        dataDeltedOrEdited(true)

        // window.location.reload()
      } else {
        somethingError()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function deleteDataFromPaymentForm() {
    try {
      const response = await fetch('http://localhost:3002/api/delete/payment/form/' + selectedID, {
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
        dataDeltedOrEdited(false)

        // window.location.reload()
      } else {
        somethingError()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const dataDeltedOrEdited = isEdited => {
    setSnackbarType('success')
    setMessage(isEdited == true ? 'Data edited successfully.' : 'Data deleted successfully.')
    handleClick()
    setSelectedID(-1)
  }

  const somethingError = () => {
    setSnackbarType('error')
    setMessage('Unable to delete data; an error occurred.')
    handleClick()
    setSelectedID(-1)
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
            selectedID={selectedID}
            setSelectedID={setSelectedID}
            restart={restartThePayment}
            createData={createPayment}
            updateData={updateDataPayment}
            deleteData={deleteDataFromPayment}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTable
            heading={'Payment Form Data '}
            rows={getPaymentFormData}
            columns={getPaymentFormOnlyKey}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
            restart={restartThePaymentForm}
            createData={createPaymentForm}
            updateData={updateDataPaymentForm}
            deleteData={deleteDataFromPaymentForm}
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
