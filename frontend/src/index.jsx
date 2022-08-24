/* Modules */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Pages */
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ModifyProfil from './pages/ModifyProfil'
import CreatePost from './pages/CreatePost'
import ModifyPost from './pages/ModifyPost'

/* Components */
import Header from './components/Header'
import Error from './components/Error'
import AuthGuard from './_helpers/AuthGuard'

/* Style */
import './styles/index.css'
import './styles/components/Header.css'
import './styles/pages/Form.css'
import './styles/pages/Home.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        } />
        <Route path="/modifyprofil" element={
          <AuthGuard>
            <ModifyProfil />
          </AuthGuard>
        } />
        <Route path="/createPost" element={
          <AuthGuard>
            <CreatePost />
          </AuthGuard>
        } />
        <Route path="/modifyPost/:id" element={
          <AuthGuard>
            <ModifyPost />
          </AuthGuard>
        } />

        <Route path="*" element= {<Error />} />
      </Routes>
  </BrowserRouter>
)