import { useState } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { Container, Icon } from '@mui/material'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import CloudUpload from 'mdi-material-ui/CloudUpload'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import DeleteForever from 'mdi-material-ui/DeleteForever'
import IconButton from '@mui/material/IconButton'

import CardContent from '@mui/material/CardContent'

export default function FileNameTypography({ fileName, fileSize, onDelete, index }) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Typography variant='subtitle1' color='inherit' sx={{ color: '#2b2b2b' }} noWrap>
            {fileName}
          </Typography>
          <Typography variant='subtitle1' ml='2rem' sx={{ color: '#2b2b2b' }} color='inherit' noWrap>
            {fileSize}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <IconButton color='primary' size='small' onClick={() => onDelete(index)}>
            <DeleteForever sx={{ color: '#2b2b2b', fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}
