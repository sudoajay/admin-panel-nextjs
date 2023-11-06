// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'

import UploadButtons from './SingleUploadButtons'

import Avatar from '@mui/material/Avatar'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'

export default function FormAddItems({ increment }) {
  return (
    <Card>
      <CardHeader title='' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginBottom: '1.5em',
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    onClick={increment}
                    type='submit'
                    variant='contained'
                    size='large'
                    startIcon={<Plus sx={{ fontSize: '2rem' }} />}
                  >
                    Add Item
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
