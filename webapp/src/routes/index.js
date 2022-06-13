import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Departments = lazy(() => import('../pages/Departments'))
const AddDepartment = lazy(() => import('../pages/Departments/Add'))
const EditDepartment = lazy(() => import('../pages/Departments/Edit'))
const Teams = lazy(() => import('../pages/Teams'))
const AddTeam = lazy(() => import('../pages/Teams/Add'))
const EditTeam = lazy(() => import('../pages/Teams/Edit'))
const Providers = lazy(() => import('../pages/Providers'))
const AddProvider = lazy(() => import('../pages/Providers/Add'))
const EditProvider = lazy(() => import('../pages/Providers/Edit'))
const Hardware = lazy(() => import('../pages/Hardware'))
const AddHardware = lazy(() => import('../pages/Hardware/Add'))
const EditHardware = lazy(() => import('../pages/Hardware/Edit'))
const Applications = lazy(() => import('../pages/Applications'))
const AddApplication = lazy(() => import('../pages/Applications/Add'))
const EditApplication = lazy(() => import('../pages/Applications/Edit'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/departments',
    component: Departments,
  },
  {
    path: '/departments/add',
    component: AddDepartment,
  },
  {
    path: '/departments/edit/:id',
    component: EditDepartment,
  },
  {
    path: '/teams',
    component: Teams,
  },
  {
    path: '/teams/add',
    component: AddTeam,
  },
  {
    path: '/teams/edit/:id',
    component: EditTeam,
  },
  {
    path: '/providers',
    component: Providers,
  },
  {
    path: '/providers/add',
    component: AddProvider,
  },
  {
    path: '/providers/edit/:id',
    component: EditProvider,
  },
  {
    path: '/hardware',
    component: Hardware,
  },
  {
    path: '/hardware/add',
    component: AddHardware,
  },
  {
    path: '/hardware/edit/:id',
    component: EditHardware,
  },
  {
    path: '/applications',
    component: Applications,
  },
  {
    path: '/applications/add',
    component: AddApplication,
  },
  {
    path: '/applications/edit/:id',
    component: EditApplication,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
