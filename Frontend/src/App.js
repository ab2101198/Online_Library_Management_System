import React, { Suspense } from 'react'
import {BrowserRouter as Router} from 
"react-router-dom"
import { Container } from "@mui/material"
import { NotificationContainer } from
 "react-notifications"
import { AppLayout } from "./components/layout/app-layout"
import { UserProvider } from "./context/user-context"
// import { isAuthenticated } from '../auth-token/auth-token';
// import { useState, useEffect } from "react"
// import { Authent } from './components/verif/Verif'


export const App = () => (

  <UserProvider>
  <Suspense fallback={null}>
    <Container className='page-container'>
      <Router>
        <AppLayout/>
        <NotificationContainer/>
      </Router>
    </Container>
  </Suspense>
  </UserProvider>
)

export default App;

