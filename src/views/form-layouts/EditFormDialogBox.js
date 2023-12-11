import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'

export default function FormDialog({ open, setOpen, data, setData, selectedID, rows, columns, handleSave }) {
  const [getSubHeading, setSubHeading] = React.useState(
    'Here, you can edit your table item and then hit the save button.'
  )

  React.useEffect(() => {
    // handleRequestSort(null, 'ID')
    if (typeof rows.filter(item => item.ID === selectedID)[0] === 'undefined') {
      const newObject = {}
      for (const key of columns) {
        newObject[key] = ''
      }
      newObject['ID'] = selectedID
      newObject['Created'] = 'Now Time'

      setData(newObject)
      setSubHeading('Here, you can add new item and then hit the save button.')
    } else {
      setData(rows.filter(item => item.ID === selectedID)[0])
      setSubHeading('Here, you can edit your table item and then hit the save button.')
    }
  }, [rows, selectedID, columns])

  const handleChange = prop => event => {
    setData({ ...data, [prop]: event.target.value })
  }
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Box</DialogTitle>
        <DialogContent>
          <DialogContentText> {getSubHeading}</DialogContentText>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 3 }}></Grid>
              {Array(typeof data !== 'undefined' ? Object.keys(data).length : columns.length)
                .fill()
                .map(function (v, i) {
                  return (
                    <Grid item xs={12}>
                      {columns[i] == 'ID' || columns[i] == 'Created' ? (
                        <TextField
                          disabled
                          fullWidth
                          value={typeof data !== 'undefined' ? data[columns[i]] : ''}
                          type='text'
                          label={columns[i]}
                          placeholder={'Enter' + columns[i]}
                        />
                      ) : (
                        <TextField
                          required
                          fullWidth
                          value={typeof data !== 'undefined' ? data[columns[i]] : ''}
                          onChange={handleChange(columns[i])}
                          type={columns[i] == 'Age' || columns[i] == 'Amount' ? 'number' : 'text'}
                          label={columns[i]}
                          placeholder={'Enter' + columns[i]}
                        />
                      )}
                    </Grid>
                  )
                })}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
