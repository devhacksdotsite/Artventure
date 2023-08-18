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
import { MasonryView } from './Masonry';
import { TableView } from './Table';
import { ListView } from './List';
import { Modal } from '../Modal/';
import { ProfileCard } from './Masonry/ProfileCard';

import { AddInstructorForm } from '../Forms/Instructor/AddInstructor';
import { FilterOptionForm } from '../Forms/Instructor/FilterOption';

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

// helper functions
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const convertToSingular = (word) => {
  const irregularPlurals = {
    instructors: "Instructor",
    students: "Student",
    patrons: "Patron",
    // Add more irregular plurals as needed
  };

  if (irregularPlurals[word]) {

    return irregularPlurals[word];
  } else if (word.endsWith("s")) {

    return word.slice(0, -1);
  } else {

    return word;
  }
}

const getFormattedDate = () => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = months[today.getMonth()];
  const day = today.getDate();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}


const viewComponents = {
  masonry: MasonryView,
  table: TableView,
  list: ListView,
};

// move to data folder
const modalContent = {
  instructors: {
    add: AddInstructorForm,
    filter: FilterOptionForm, 
  },
  students: {
    add: 'addComp',
    filter: 'filterComp'
  },
  patrons: {
    add: 'addComp',
    filter: 'filterComp'
  }
}

export const DataVisualization = ({ slug, columns, data }) => {
  const [ view, setView ] = useState('table');
  const CurrentView = viewComponents[view];

  // Dialogs
  const [ selectedRow, setSelectedRow ] = useState(null);
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ filterOpen, setFilterOpen ] = useState(false);
  const [ addOpen, setAddOpen ] = useState(false);

  const ModalContent = modalContent[slug];

  // pagination
  const [ page, setPage ] = useState(2);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  // handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (rowData) => {
    console.log(rowData);
    setSelectedRow(rowData);
    setDialogOpen(true);
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
                <IconButton onClick={ () => setFilterOpen(true) } aria-label="filter">
                  <TuneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add new">
                <IconButton onClick={ () => setAddOpen(true) } aria-label="settings">
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          title={ capitalizeFirstLetter(slug) }
          subheader={ getFormattedDate() }
        />
        
        <CardContent>
          <CurrentView 
            columns={ columns } 
            data={ data } 
            handleRowClick={ handleRowClick } 
          />

          <TablePagination
            component="div"
            count={ 100 }
            page={ page }
            onPageChange={ handleChangePage }
            rowsPerPage={ rowsPerPage }
            onRowsPerPageChange={ handleChangeRowsPerPage }
          />
        </CardContent>
      </CXCard>

      <Modal
        open={ dialogOpen } 
        setOpen={ setDialogOpen }
        title={ convertToSingular(slug) }
        subtitle="Add a new slug here"
      >
        <ProfileCard rowData={ selectedRow } elevation={ 0 } backgroundColor="transparent" border="none" />
      </Modal>

      <Modal
        open={ addOpen }
        setOpen={ setAddOpen }
        title={ convertToSingular(slug) }
        subtitle="Add a new slug here"
      >
        { <ModalContent.add /> }
      </Modal>

      <Modal
        open={ filterOpen }
        setOpen={ setFilterOpen }
        title={ convertToSingular(slug) }
        subtitle="Add a new slug here"
      >

        { <ModalContent.filter /> }
      </Modal>
    </CXPaper>
  )
}

