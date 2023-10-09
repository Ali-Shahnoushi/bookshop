import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'
import AdminDashboard from '../../pages/adminPanel'

export default function AdminLayout() {
  const authContext = useContext(AuthContext)
  if (authContext.userData.role !== 'admin') {
    return <Navigate to="/dashboard" />
  }
  return <AdminDashboard />
}
