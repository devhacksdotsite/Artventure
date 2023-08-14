/*
  * component\DataVisualization\List\index.js
  * Author: Jesse Salinas
  * Date: 08/12/2023
*/

import {
  Grid,
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar, 
  Typography,
  Button
} from '@mui/material';

export const ListView = ({ columns, data }) => {
  const cols = ['id', 'fullname'];
  const listColumns = columns.filter((item) => {
    return !cols.includes(item.id); // Check if item.id is not included in the cols array
  });

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {data && data.map((item) => (
        <div key={item.id}>
          <ListItem alignItems="flex-start">
            <Grid container spacing={2} sx={{ width: '100%' }}>

              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar 
                    alt={item.fullname} 
                    src="/static/images/avatar/1.jpg" 
                    sx={{ width: 64, height: 64 }}
                  />
                </ListItemAvatar>

                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                  <Typography component="h1" variant="body1">
                    {item.fullname}
                  </Typography>
                  <Typography component="h3" variant="body2">
                    ID #: {item.id}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={ 12 } md={ 8 }>
                <Box sx={{ display: 'flex', }}>
                  { listColumns.map((column) => (
                    <ListItemText
                      key={ column.id }
                      primary={ column.label }
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            { item[column.id] }
                          </Typography>
                        </>
                      }
                    />
                  )) }
                </Box>
              </Grid>

              <Grid item xs={ 12 } md={ 4 }>
                <Button size="medium" variant="contained" color="success" sx={{ m: 1 }}>Edit</Button>
                <Button size="medium" variant="outlined" color="error" sx={{ m: 1 }}>Delete</Button>
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>

  );
}
