// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormFAQDetail from 'src/views/form-layouts/FormFAQDetail'
import FormAddItems from 'src/views/form-layouts/FormAddItems'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
export default function FormLayouts() {
  const [getCountItem, setCountItem] = useState(0)
  const [getFAQDetail, setFAQDetail] = useState([{}])

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
    fetchGetAllFAQDetail()
  }, [])

  async function fetchGetAllFAQDetail() {
    try {
      const response = await fetch('http://localhost:3002/api/get/all/faq/', {
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
        setFAQDetail(result)
        setCountItem(result.length)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <DatePickerWrapper>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />

      <Grid container spacing={6}>
        {Array(getCountItem)
          .fill()
          .map(function (v, i) {
            return (
              <Grid item xs={12}>
                <FormFAQDetail number={i + 1} decrement={decrement} getFAQDetail={getFAQDetail[i]} />
              </Grid>
            )
          })}
        <Grid
          item
          xs={12}
          sx={{
            marginTop: '2em'
          }}
        >
          <FormAddItems increment={increment} text={'Add New FAQ'} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
