/*
  * component\DataVisualization\Table\index.js
  * Name: TableView
  * Author: Jesse Salinas
  * Date: 08/12/2023
*/

// MUI
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link as MUILink
} from '@mui/material';

// make utility for helper functions
const formatPhoneNumber = (phoneNumber) => {

  // Assuming the phone number is in a standard 10-digit format
  const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove non-numeric characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phoneNumber; // Return the original number if it doesn't match the expected format
};

export const TableView = ({ columns, data, handleRowClick }) => {

  const renderTableCellContent = (columnId, value) => {

    switch (columnId) {
      case 'phone':
        return <MUILink href={`tel:${ value }`}>{ formatPhoneNumber(value) }</MUILink>;
      case 'email':
        return <MUILink href={`mailto:${ value }`}>{ value }</MUILink>;
      default:
        return value;
    }

  };

  return (
    <TableContainer>
      <Table style={{ overflowX: 'auto' }}>
        <TableHead>
          <TableRow>
            { columns && columns.map((column, index) => (
              <TableCell key={ index }>{ column.label }</TableCell>
            )) }
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={ index }
                onClick={() => handleRowClick(item)}
                style={{ cursor: 'pointer' }}
              >
                {columns && columns.map((column, colIndex) => (
                  <TableCell key={ colIndex }>
                    { renderTableCellContent(column.id, item[column.id]) }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={ columns.length } style={{ textAlign: 'center' }}>
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody> 
      </Table>
    </TableContainer>
  );

}
