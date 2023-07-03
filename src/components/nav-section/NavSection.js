import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';


// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  // const handleDropdownToggle = () => {
  //   setOpenDropdown(!openDropdown);
  // };

  // const handleDropdownClose = () => {
  //   setOpenDropdown(false);
  // };
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          if (item.title === 'category') {
            return (
              <>
               <NavItem key={item.title} item={item} clicked={()=> setOpenDropdown(!openDropdown)}/>
                { openDropdown && item.dropdownItems.map( el => <NavItem key={el.title} item={el} />)}
  
              </>);
          } 
            
            
            return <NavItem key={item.title} item={item} />;
          

      
        })
        }
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, clicked}) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={title !== "category" && path}

      onClick={clicked}
      
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
