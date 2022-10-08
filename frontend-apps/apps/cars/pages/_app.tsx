import '../styles/main.css'
import 'react-datepicker/dist/react-datepicker.css'

import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Layout from '@components/Layout/Layout'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
