import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';


function Titlebar({user}) {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{textDecoration: 'none', color:'white'}}>NC News</Link>
            
          </Typography>
              <IconButton sx={{ p: 0 }}>
                <img className="user-avatar" alt="Remy Sharp" src={user.avatar_url} />
              </IconButton>
              <h2>{user.username}</h2>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default Titlebar;
