import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';












import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   */
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();
  
  const selectedPath = () => {
    switch(location.pathname) {
        case "/panel/addlink":
            return 0;
        case "/panel/managelink":
            return 1;
        case "/panel/linkviews":
            return 2;
    }
  }

  
  const [selectedIndex, setSelectedIndex] = React.useState(selectedPath());
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navPath = (index) => {
    switch(index) {
        case 0:
            return navigate("/panel/addlink");
        case 1:
            return navigate("/panel/managelink");
        case 2:
            return navigate("/panel/linkviews");
        default:
            return navigate("/panel/addlink");
    }
  }

  const navIco = (index) => {
    switch(index) {
        case 0:
            return <AddIcon/>;
        case 1:
            return <SettingsIcon/>;
        case 2:
            return <VisibilityIcon/>;
        default:
            return <AddIcon/>;
    }
  }








  const StyledList = styled(List)({
    // selected and (selected + hover) states
    '&& .Mui-selected, && .Mui-selected:hover': {
      backgroundColor: '#3F98C1',
      '&, & .MuiListItemIcon-root': {
        color: 'black',
      },
    },
    // hover states
    '& .MuiListItemButton-root:hover': {
      backgroundColor: '#E4E4E4',
      '&, & .MuiListItemIcon-root': {
        color: '#222',
      },
    },
  });

  const drawer = (
    <div>
    <StyledList>
      <List>
        {['Add Link', 'Manage Link', 'Link Views'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {navPath(index); handleListItemClick(index);}} selected={selectedIndex === index}>
                <ListItemText primary={text}/>
                <ListItemIcon>
                    {navIco(index)}
                </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </StyledList>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundImage:
                'url("https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
  
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'left',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Link Manager (https://github.com/strejcik/LinkManager)
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}