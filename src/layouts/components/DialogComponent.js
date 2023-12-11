import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'

import * as React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const DialogComponent = ({ openSave, setOpenSave, message, handleYes, Button1 = 'No', Button2 = 'Yes' }) => {
  return (
    <Dialog
      open={openSave}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenSave(false)}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Confirmation !'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenSave(false)}>{Button1}</Button>
        <Button onClick={() => handleYes()}>{Button2}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogComponent
