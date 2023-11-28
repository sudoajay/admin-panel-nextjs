import { useState, useEffect } from 'react'

import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
function SlideTransition(props) {
  return <Slide {...props} direction='down' />
}
const SnackbarComponent = ({ open, setOpen, snackbarType, showMessage }) => {
  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'right'
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
        {showMessage}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
