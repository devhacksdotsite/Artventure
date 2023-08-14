/*
  * component\DataVisualization\Table\index.js
  * Author: Jesse Salinas
  * Date: 08/12/2023
*/

// MUI
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

export const TableView = ({ columns, data, handleRowClick }) => {

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            { columns.map((column) => (
              <TableCell key={ column.id }>{ column.label }</TableCell>
            )) }
          </TableRow>
        </TableHead>

        <TableBody>
          { data.map((item) => (
            <TableRow key={ item.id } onClick={ () => handleRowClick(item)}>
              { columns.map((column) => (
                <TableCell key={ column.id }>{ item[column.id] }</TableCell>
              )) }
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </>
  );

}
