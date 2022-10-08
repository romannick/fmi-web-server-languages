import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header/Header'
import styles from './Layout.module.css'

interface Props  {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>
    <Header />
    {children}
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      transition={Slide}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
)

export default Layout
