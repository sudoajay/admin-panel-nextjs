// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormItemDetails from 'src/views/form-layouts/FormItemDetails'
import FormAddItems from 'src/views/form-layouts/FormAddItems'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
export default function FormLayouts() {
  const [getCountItem, setCountItem] = useState(1)
  const increment = () => {
    setCountItem(getCountItem + 1)
  }
  const decrement = () => {
    setCountItem(getCountItem - 1)
  }
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        {Array(getCountItem)
          .fill()
          .map(function (v, i) {
            return (
              <Grid item xs={12}>
                <FormItemDetails number={i + 1} decrement={decrement} />
              </Grid>
            )
          })}
        {getCountItem <= 2 ? (
          <Grid
            item
            xs={12}
            sx={{
              marginTop: '2em'
            }}
          >
            <FormAddItems increment={increment} />
          </Grid>
        ) : (
          ''
        )}
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
