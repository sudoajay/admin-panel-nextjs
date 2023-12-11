import * as React from 'react'
import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from 'mdi-material-ui/DeleteForever'
import Pencil from 'mdi-material-ui/Pencil'
import Button from '@mui/material/Button'
import FilterVariant from 'mdi-material-ui/FilterVariant'
import DownloadOutline from 'mdi-material-ui/DownloadOutline'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MenuIcon from 'mdi-material-ui/Menu'
import { visuallyHidden } from '@mui/utils'

import SnackbarComponent from 'src/layouts/components/SnackbarComponent'
import DialogComponent from 'src/layouts/components/DialogComponent'
import EditFormDialogBox from 'src/views/form-layouts/EditFormDialogBox'

// function createData(id, name, calories, fat, carbs, protein) {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein
//   }
// }

// const rows = [
//   createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0)
// ]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

// const headCells = [
//   {
//     id: 'ID',
//     numeric: false,
//     disablePadding: false,
//     label: 'ID'
//   },
//   {
//     id: 'FullName',
//     numeric: false,
//     disablePadding: false,
//     label: 'FullName'
//   },
//   {
//     id: 'Age',
//     numeric: false,
//     disablePadding: false,
//     label: 'Age'
//   },
//   {
//     id: 'Email',
//     numeric: false,
//     disablePadding: false,
//     label: 'Email'
//   },
//   {
//     id: 'PhoneNumber',
//     numeric: false,
//     disablePadding: false,
//     label: 'PhoneNumber'
//   },
//   {
//     id: 'Information',
//     numeric: false,
//     disablePadding: false,
//     label: 'Information'
//   },
//   {
//     id: 'Created',
//     numeric: false,
//     disablePadding: false,
//     label: 'Created'
//   },
//   {
//     id: 'Product',
//     numeric: false,
//     disablePadding: false,
//     label: 'Product'
//   },
//   {
//     id: 'Amount',
//     numeric: false,
//     disablePadding: false,
//     label: 'Amount'
//   },
//   {
//     id: 'PromoCode',
//     numeric: false,
//     disablePadding: false,
//     label: 'PromoCode'
//   },
//   {
//     id: 'ReferralCode',
//     numeric: false,
//     disablePadding: false,
//     label: 'ReferralCode'
//   }
// ]

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell key='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        <TableCell padding='none'>
          <DeleteIcon sx={{ color: 'error.dark', marginTop: 2 }} />
        </TableCell>

        <TableCell padding='normal'>
          <Pencil sx={{ color: 'primary.dark', marginTop: 2 }} />
        </TableCell>

        {columns.map(headCell => (
          <TableCell
            key={headCell}
            align={false ? 'right' : 'left'}
            padding={false ? 'none' : 'normal'}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : 'asc'}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

function EnhancedTableToolbar(props) {
  const { numSelected, heading, rows, columns, selected, restart, handleAddItem } = props
  const pages = ['Export All Data', 'Export All Heading', 'Export Selected Rows']
  const settings = ['Add Item', 'Restart Sorting']
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOnClickUserMenu = item => {
    setAnchorElUser(null)
    if (item == 1) restart()
    else {
      handleAddItem()
    }
  }

  const handleCloseNavMenu = (value = 0) => {
    setAnchorElNav(null)
    if (value == 1) {
      downloadBlob(convertJSONToCSV(rows), 'export.csv', 'text/csv;charset=utf-8;')
    } else if (value == 2) {
      downloadBlob('"' + columns.join('","') + '"', 'export.csv', 'text/csv;charset=utf-8;')
    } else if (value == 3) {
      let selectedArr = []
      rows.forEach(function (item, index) {
        if (selected.indexOf(item.ID) > -1) selectedArr.push(item)
      })
      downloadBlob(convertJSONToCSV(selectedArr), 'export.csv', 'text/csv;charset=utf-8;')
    }
  }

  function convertJSONToCSV(json) {
    const items = json
    const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    return csv
  }

  function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType })
    var url = URL.createObjectURL(blob)

    // Create a link to download it
    var pom = document.createElement('a')
    pom.href = url
    pom.setAttribute('download', filename)
    pom.click()
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'
          sx={{ marginLeft: 2 }}
        >
          {numSelected > 0 ? (
            <MenuIcon />
          ) : (
            <Typography variant='h6' id='tableTitle' component='div'>
              {heading}
            </Typography>
          )}
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {pages.map((page, index) => (
            <MenuItem
              key={page}
              onClick={() => {
                handleCloseNavMenu(index + 1)
              }}
            >
              <Typography textAlign='center'>{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {numSelected == 0 ? (
          <Typography sx={{ flex: '1 1 100%', marginLeft: 5 }} variant='h6' id='tableTitle' component='div'>
            {heading}
          </Typography>
        ) : (
          pages.map((page, index) => (
            <Button
              startIcon={<DownloadOutline />}
              key={page}
              onClick={() => {
                handleCloseNavMenu(index + 1)
              }}
              sx={{ my: 2, px: 5, color: 'primary.light', display: 'flex', textTransform: 'unset' }}
            >
              {page}
            </Button>
          ))
        )}
      </Box>

      <Box sx={{ flexGrow: 0, marginRight: 5 }}>
        <Tooltip title='Sort Restart'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <FilterVariant sx={{ color: 'common.white' }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem key={setting} onClick={() => handleOnClickUserMenu(index)}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired
}

function EnhancedTableBottom(props) {
  const { rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%', marginLeft: 5.5 }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%', marginLeft: 5.5 }} color='inherit' variant='subtitle1' component='div'>
          {' '}
          {numSelected} selected
        </Typography>
      )}

      <TablePagination
        sx={{
          flex: '1 1 100%'
        }}
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Back To Normal'>
          <IconButton>
            <Retart /> 
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  )
}

export default function EnhancedTable({
  heading,
  rows,
  columns,
  deleteData,
  selectedID,
  setSelectedID,
  restart,
  updateData
}) {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('ID')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [editData, setEditData] = React.useState({})

  const [openDelete, setOpenDelete] = useState(false)
  const [openSave, setOpenSave] = useState(false)
  const [openEditBox, setOpenEditBox] = useState(false)

  const [open, setOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('error')
  const [showMessage, setMessage] = useState('')

  React.useEffect(() => {
    handleRequestSort(null, 'ID')
    // handleRequestSort(null, 'ID')
  }, [rows])

  const handleAddItem = () => {
    setSelectedID(parseInt(rows[rows.length - 1]['ID']) + 1)

    setOpenEditBox(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.ID)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleOnClickIcon = (id, isDelete) => {
    setSelectedID(id)
    if (!isDelete) {
      // setOpenSave(true)
      setOpenEditBox(true)
    } else {
      setOpenDelete(true)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  )

  const handleSave = () => {
    if (typeof editData !== 'undefined') {
      Object.keys(editData).every(function (key, index) {
        if (editData.hasOwnProperty(key)) {
          if (editData[key] == '' && !(key == 'ID' || key == 'Created')) {
            setSnackbarType('error')
            setMessage('Please Provide The ' + key)
            setOpen(true)
            return false
          }
        }
        if (index == Object.keys(editData).length - 1) {
          setOpenEditBox(false)
          setOpenSave(true)
        } else return true
      })
    }
  }

  const handleSaveAppInformation = () => {
    updateData(editData)
    setOpenSave(false)
  }

  const handleOpenDelete = () => {
    setOpenDelete(false)
    deleteData()
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SnackbarComponent open={open} setOpen={setOpen} snackbarType={snackbarType} showMessage={showMessage} />

      <DialogComponent
        openSave={openDelete}
        setOpenSave={setOpenDelete}
        message={'Are you sure you want to delete this data from the table?'}
        handleYes={handleOpenDelete}
        Button1={'Cancel'}
        Button2={'Agree'}
      />
      <DialogComponent
        openSave={openSave}
        setOpenSave={setOpenSave}
        message={'Are you sure you want to edit this item? '}
        handleYes={handleSaveAppInformation}
      />
      <EditFormDialogBox
        open={openEditBox}
        setOpen={setOpenEditBox}
        selectedID={selectedID}
        rows={rows}
        columns={columns}
        handleSave={handleSave}
        data={editData}
        setData={setEditData}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          heading={heading}
          rows={rows}
          columns={columns}
          selected={selected}
          restart={restart}
          handleAddItem={handleAddItem}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.ID)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.ID}
                    selected={isItemSelected}
                  >
                    <TableCell key='checkbox'>
                      <Checkbox
                        color='primary'
                        onClick={event => handleClick(event, row.ID)}
                        checked={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell padding='none'>
                      <DeleteIcon
                        onClick={() => handleOnClickIcon(row.ID, true)}
                        sx={{ cursor: 'pointer', color: 'error.dark', marginTop: 2 }}
                      />
                    </TableCell>
                    <TableCell padding='normal'>
                      <Pencil
                        onClick={() => handleOnClickIcon(row.ID, false)}
                        sx={{ cursor: 'pointer', color: 'primary.dark', marginTop: 2 }}
                      />
                    </TableCell>

                    {Object.keys(row).map(value => {
                      return <TableCell align='left'>{row[value]}</TableCell>
                    })}

                    {/* <TableCell align='left' component='th' id={labelId} scope='row' padding='normal'>
                      {row.ID}
                    </TableCell>
                    <TableCell align='left'>{row.FullName}</TableCell>
                    <TableCell align='left'>{row.Age}</TableCell>
                    <TableCell align='left'>{row.Email}</TableCell>
                    <TableCell align='left'>{row.PhoneNumber}</TableCell>
                    <TableCell align='left'>{row.Information}</TableCell>
                    <TableCell align='left'>{row.Created}</TableCell>
                    <TableCell align='left'>{row.Product}</TableCell>
                    <TableCell align='left'>{row.Amount}</TableCell>
                    <TableCell align='left'>{row.PromoCode}</TableCell>
                    <TableCell align='left'>{row.Referralcode}</TableCell> */}
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <EnhancedTableBottom
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          numSelected={selected.length}
        />
      </Paper>
    </Box>
  )
}
