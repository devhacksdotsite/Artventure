/*
  * component\DataVisualization\Table\index.js
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
  TableBody
} from '@mui/material';

export const TableView = ({ columns, data, handleRowClick }) => {

  return (
    <TableContainer>
      <Table style={{ overflowX: 'auto' }}>
        <TableHead>
          <TableRow>
            { columns && columns.map((column) => (
              <TableCell key={ column.id }>{ column.label }</TableCell>
            )) }
          </TableRow>
        </TableHead>

        <TableBody>
          { data && data.map((item) => (
            <TableRow 
              key={ item.id } 
              onClick={ () => handleRowClick(item)}
              style={{ cursor: 'pointer' }}
            >
              { columns.map((column) => (
                <TableCell key={ column.id }>{ item[column.id] }</TableCell>
              )) }
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );

}
