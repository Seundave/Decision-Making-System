import PropTypes from 'prop-types';
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
  // const [openDropdown, setOpenDropdown] = useState(false);

  // const handleDropdownToggle = () => {
  //   setOpenDropdown(!openDropdown);
  // };

  // const handleDropdownClose = () => {
  //   setOpenDropdown(false);
  // };
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} 
          />
          
          // {data.map((item) => (
          //   <NavItem key={item.title} item={item}/>
          //   <React.Fragment key={item.path}>
          //     <NavItem key={item.title} item={item} 
          //   />
          //   <ListItem button onClick={item.dropdownItems ? handleDropdownToggle : null}>
          //       <ListItemText primary={item.title} />
          //       <NavItem key={item.title} item={item}/>
          //     </ListItem>
          //   {openDropdown && item.dropdownItems && (
          //     <List>
          //       {item.dropdownItems.map((dropdownItem) => (
          //         <MenuItem
          //           key={dropdownItem.path}
          //           onClick={handleDropdownClose}
          //           selected={false}
          //         >
          //           {dropdownItem.title}
          //         </MenuItem>
          //       ))}
          //     </List>
          //   )}
          //   </React.Fragment>

      //     <List>
      //   {data.map((item) => (
      //     <React.Fragment key={item.path}>
      //       <ListItem button onClick={item.dropdownItems ? handleDropdownToggle : null}>
      //         <ListItemText primary={item.title} />
      //       </ListItem>
      //       {openDropdown && item.dropdownItems && (
      //         <List>
      //           {item.dropdownItems.map((dropdownItem) => (
      //             <MenuItem
      //               key={dropdownItem.path}
      //               onClick={handleDropdownClose}
      //               selected={false}
      //             >
      //               {dropdownItem.title}
      //             </MenuItem>
      //           ))}
      //         </List>
      //       )}
      //     </React.Fragment>
      //   ))}
      // </List>


          
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, dropdown} = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
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

      {dropdown && dropdown}

      {info && info}
    </StyledNavItem>
  );
}
