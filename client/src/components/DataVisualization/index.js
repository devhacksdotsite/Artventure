/*
* @\component\DataVisualization\index.js
* Author: Jesse Salinas
* Date: 07/22/2023
*/

import { useState, useEffect, useContext } from 'react';

// Data
import { modalData } from '@/data/admin/modalData';

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
  Badge,
  Tooltip,
  styled
} from '@mui/material';

// MUI Icons
import {
  TableChart,
  GridView,
  SearchOff
} from '@mui/icons-material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import TuneIcon from '@mui/icons-material/Tune';

// CTX
import { GlobalCtx } from '@/context/GlobalState';

// Components
import { MasonryView } from '@/components/DataVisualization/Masonry';
import { TableView } from '@/components/DataVisualization/Table';
import { Modal } from '@/components/Modal/';

// Hooks
import { useModal } from '@/hooks/useModal';

// MUI styled
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
};

export const DataVisualization = ({ children, slug, columns, data, setter, pagination, filter, setFilter, resetFilter, activeFilter }) => {

  // State
  //const [ selectedRow, setSelectedRow ] = useState(null);
  const [ page, setPage ] = useState(2);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  // CTX
  const { view, setView } = useContext(GlobalCtx);

  // Hooks
  const { modal, openModal, closeModal } = useModal();

  // Variables
  const CurrentView = viewComponents[view];
  const ModalData = modalData[slug.name];
  console.log(ModalData);

  // handlers
  const handleChangePage = (event, newPage) => {
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterReset = () => resetFilter();

  const handleRowClick = (rowData) => {

    openModal(
      <ModalData.tag.component 
        rowData={ rowData } 
        elevation={ 0 } 
        backgroundColor="transparent" 
        border="none" 
        handleEdit={() => 
          openModal(
            <ModalData.edit.component 
              data={ rowData } 
              setter={ setter } 
              method='PUT' 
              filter={ filter }
              closeModal={ closeModal } 
            />, 
            ModalData.edit.title, 
            ModalData.edit.subtitle
          )
        }
        handleDelete={() => 
          openModal(
            <ModalData.delete.component 
              data={ rowData } 
              setter={ setter } 
              method='PUT' 
              filter={ filter }
              closeModal={ closeModal } 
            />, 
            ModalData.delete.title, 
            ModalData.delete.subtitle
          )
        }
      />, 
      ModalData.tag.title, 
      ModalData.tag.subtitle
    );
  };

  return (
    <CXPaper>
      <Box sx={{ width: '95%', display: 'flex', justifyContent: 'flex-end', mt: 12 }}>
        { !children && (
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >

            <Tooltip title="Quick View">
              <Button 
                variant={ view === 'table' ? 'contained' : 'outlined' }
                onClick={ () => setView('table') }
              >
                <TableChart />
              </Button>
            </Tooltip>

            <Tooltip title="Detailed View">
              <Button 
                variant={ view === 'masonry' ? 'contained' : 'outlined' }
                onClick={ () => setView('masonry') }
              >
                <GridView />
              </Button>
            </Tooltip>
            
          </ButtonGroup>
        ) }
      </Box>

      <CXCard sx={{ mt: 2 }}>
        <CardHeader
          action={
            <>
              { !!ModalData.filter && (
                <>
                  <Tooltip title="Reset Filter Options">
                    <span>

                        <IconButton 
                          aria-label="reset"
                          disabled={ !activeFilter() }
                          onClick={ handleFilterReset }
                        >
                          <SearchOff />
                        </IconButton>
                    
                    </span>
                  </Tooltip>

                  <Tooltip title="Filter Options">

			        <Badge variant={ !activeFilter() ? null : 'dot'  } color="warning">
                      <IconButton 
                        aria-label="filter"
                        onClick={() =>
                          openModal(
                            <ModalData.filter.component 
                              filter={ filter } 
                              setFilter={ setFilter } 
                              resetFilter={ resetFilter } 
                              closeModal={ closeModal } 
                            />, 
                            ModalData.filter.title, 
                            ModalData.filter.subtitle
                          )
                        }
                      >
                        <TuneIcon />
                      </IconButton>
                    </Badge>
                  </Tooltip>
                </>
              ) }

              { !!ModalData.add && (
                <Tooltip title="Add new">
                  <IconButton
                    aria-label="add"
                    onClick={() =>
                      openModal(
                        <ModalData.add.component 
                          data={ data } 
                          setter={ setter } 
                          filter={ filter }
                          closeModal={ closeModal } 
                        />, 
                        ModalData.add.title, 
                        ModalData.add.subtitle
                      )
                    }
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              ) }
            </>
          }
          title={ capitalizeFirstLetter(slug.name) }
          subheader={ getFormattedDate() }
        />
        
        <CardContent>

          { !!children ? (
            children 
          ) : (
            <CurrentView 
              columns={ columns } 
              data={ data } 
              setter={ setter }
              handleRowClick={ handleRowClick } 
              slug={ slug }
              ModalData={ ModalData }
            />
          ) }

          { !!pagination && (
            <TablePagination
              component="div"
              count={ 100 }
              page={ page }
              onPageChange={ handleChangePage }
              rowsPerPage={ rowsPerPage }
              onRowsPerPageChange={ handleChangeRowsPerPage }
            />
          ) }
        </CardContent>
      </CXCard>

      <Modal
        open={ modal.open }
        setOpen={ closeModal }
        title={ modal.title }
        subtitle={ modal.subtitle }
      >
        { modal.content }
      </Modal>
    </CXPaper>
  )
}

