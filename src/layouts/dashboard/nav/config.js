// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    dropdown: false,
    access: ['government', 'director', 'VC'],
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    dropdown: false,
    access: ['director', 'VC'],
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  //   dropdown:false
  // },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: icon('ic_category'),
    // dropdown: true, // Add dropdown property
    // dropdownItems: [
    //   { path: '/dashboard/category/student', title: 'Student' },
    //   { path: '/dashboard/category/staff', title: 'Staff' },
    //   { path: '/subpage3', title: 'Subpage 3' },
    // ],
    dropdownItems: [
      { path: '/dashboard/category/student', title: 'Student', icon: icon('ic_lock') },
      { path: '/dashboard/category/staff', title: 'Staff', icon: icon('ic_lock') },
    ],
    access: ['director', 'VC'],
  },
  {
    title: 'reporting',
    path: '/dashboard/reporting',
    icon: icon('ic_report'),
    dropdown: false,
    access: ['government', 'director', 'VC'],
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: icon('ic_settings'),
    dropdown: false,
    access: ['director', 'VC'],
  },
  {
    title: 'logout',
    path: '/logout',
    icon: icon('ic_logout'),
    dropdown: false,
    access: ['government', 'director', 'VC'],
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];
const isLive = false;

export const urls = isLive ? process.env.REACT_APP_LIVE_SERVER : process.env.REACT_APP_LOCAL_SERVER;

export default navConfig;
