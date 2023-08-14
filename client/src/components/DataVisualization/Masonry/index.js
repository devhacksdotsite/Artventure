/*
  * component\DataVisualization\Masonry\index.js
  * Author: Jesse Salinas
  * Date: 08/12/2023
*/

// MUI
import { 
  Grid 
} from '@mui/material';

// Components
import { ProfileCard } from './ProfileCard';

export const MasonryView = ({ columns, data }) => {
  return (
    <>
      <Grid container spacing={2}>
        { data && data.map((item) => (
          <Grid item xs={12} md={6} lg={4}>
            <ProfileCard rowData={ item } elevation={3} border="1px solid gray" />
          </Grid>
        )) }
      </Grid>
    </>
  );

}
