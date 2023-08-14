/*
  * component\DataVisualization\index.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useState, useEffect } from 'react';

// MUI
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card, CardHeader, CardContent,
  TablePagination,
  ButtonGroup,
  Button,
  IconButton,
  Tooltip,
  styled
} from '@mui/material';

// MUI Icons
import {
  TableChart,
  FormatListBulleted,
  GridView
} from '@mui/icons-material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import TuneIcon from '@mui/icons-material/Tune';

// Components
import { RowDialog } from '../RowDialog';
import { MasonryView } from './Masonry';
import { TableView } from './Table';
import { ListView } from './List';

import { Modal } from '../Modal/';

const CXPaper = styled(Paper)(({ theme }) => ({
  //background: '#f5f5f5', // Light gray background
  height: '100vh', // 100% of the viewport height
  width: '100%', // 100% width
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}));

const CXCard = styled(Card)(({ theme }) => ({
  width: '95%', 
  minHeight: '80vh',
  overflow: 'scroll'
}));

const viewComponents = {
  masonry: MasonryView,
  table: TableView,
  list: ListView,
};

export const DataVisualization = ({ columns, data }) => {
  const [ view, setView ] = useState('table');

  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ open, setOpen ] = useState(false);

  const CurrentView = viewComponents[view];

  // handlers
  const handleRowClick = (rowData) => {
    console.log(rowData);
    setSelectedRow(rowData);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <CXPaper>
      <Box sx={{ width: '95%', display: 'flex', justifyContent: 'flex-end', mt: 12 }}>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button 
            variant={ view === 'list' ? 'contained' : 'outlined' }
            onClick={ () => setView('list') }
          >
            <FormatListBulleted />
          </Button>
          <Button 
            variant={ view === 'table' ? 'contained' : 'outlined' }
            onClick={ () => setView('table') }
          >
            <TableChart />
          </Button>
          <Button 
            variant={ view === 'masonry' ? 'contained' : 'outlined' }
            onClick={ () => setView('masonry') }
          >
            <GridView />
          </Button>
          
        </ButtonGroup>
      </Box>

      <CXCard sx={{ mt: 2 }}>
        <CardHeader
          action={
            <>
              <Tooltip title="Filter options">
                <IconButton aria-label="filter">
                  <TuneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add new">
                <IconButton onClick={ () => setOpen(true) } aria-label="settings">
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          title="Instructors"
          subheader="September 14, 2016"
        />
        
        <CardContent>
          <CurrentView 
            columns={ columns } 
            data={ data } 
            handleRowClick={ handleRowClick } 
          />

          { /* <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page - 1} // Substracting 1 since the API uses 1-based indexing for pages.
            onChangePage={(event, newPage) => onPageChange(newPage + 1)}
            onChangeRowsPerPage={(event) => onPageChange(1, parseInt(event.target.value, 10))}
          /> */ }
        </CardContent>
      </CXCard>

      <RowDialog
        open={ dialogOpen }
        onClose={ handleDialogClose }
        rowData={ selectedRow }
      />

      <Modal
        open={ open }
        setOpen={ setOpen }
      />
    </CXPaper>
  )
}

