import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import React, { useContext } from 'react';
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { AuthContext } from 'src/routes';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { currentUser } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();
  const roles = {
    superrole: 'Superrole',
    principal: 'Principal',
    director: 'Director',
    deans: 'Deans',
    hod: 'HOD',
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    console.log({ user });
    // console.log(user, user.role, roles[user.role.toLowerCase()], 'kkokooeoooe');
    // setUser(user);
  }, []);

  // const handleDropdownToggle = () => {
  //   setOpenDropdown(!openDropdown);
  // };

  // const handleDropdownClose = () => {
  //   setOpenDropdown(false);
  // };

  // const roles = {
  //   superrole: 'superrole',
  //   principal: 'principal',
  //   director: 'director',
  //   deans: 'deans',
  //   hod: 'hod',
  // };

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          if (item.title === 'category') {
            return (
              <>
                <NavItem
                  sx={{ '&.css-v475nq-MuiButtonBase-root-MuiListItemButton-root.active': { backgroundColor: 'none' } }}
                  key={item.title}
                  item={item}
                  clicked={() => setOpenDropdown(!openDropdown)}
                />
                {openDropdown && item.dropdownItems.map((el) => <NavItem key={el.title} item={el} />)}
              </>
            );
          } else if (
            item.title === 'user' &&
            roles[user.role?.toLowerCase()] !== 'Deans' &&
            roles[user.role?.toLowerCase()] !== 'HOD'
          ) {
            return <NavItem key={item.title} item={item} />;
          } else if (item.title !== 'user') return <NavItem key={item.title} item={item} />;

          //   <>
          //  {item.title ==='user' && roles.superrole !== 'deans' ?null : <NavItem key={item.title} item={item} />}
          //   </>;
        })}
        {/* // if (item.title === 'category'){' '} */}
        {
          //   return (
          //     <>
          //      <NavItem key={item.title} item={item} clicked={()=> setOpenDropdown(!openDropdown)}/>
          //       { openDropdown && item.dropdownItems.map( el => <NavItem key={el.title} item={el} />)}
          //     </>);
          // }
          //           // return <NavItem key={item.title} item={item} />;
          //           <>
          //      <NavItem key={item.title} item={item} />
          // {item.title === 'user' && users.role === 'government' && item.title !== 'category' && (
          //   <NavItem key={item.title} item={item} />
          // )}
        }
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, clicked }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={title !== 'category' && path}
      onClick={clicked}
      sx={
        title !== 'category' && {
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
        }
      }
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
