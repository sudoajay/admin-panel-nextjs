import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import CardContent from '@mui/material/CardContent'
import ContentSave from 'mdi-material-ui/ContentSave'

export default function FormDialog({ open, setOpen }) {
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 3 }}></Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type='text'
                  label='App Title'
                  placeholder='Regime Fit'
                  helperText='Type your brand name '
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type='text'
                  label='App Description'
                  placeholder='Get Workout Plans!'
                  helperText='Enter the app description for your SEO metadata.'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  fullWidth
                  type='text'
                  label='App Keywords'
                  placeholder='Workout Plan, Transform your life, strength,wellness,self-improvement'
                  helperText='Enter the app Keywords for your SEO metadata.'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type='text'
                  label='Main Title'
                  placeholder='Get Workout Plans!'
                  helperText="Enter the brand title you'd like to display on your app's  main homepage"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  type='text'
                  label='Main Description'
                  placeholder="Unleash your body's power. Transform your life through strength, wellness, and self-improvement. 💪"
                  helperText="Enter the brand description you'd like to display on your app's main homepage"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
