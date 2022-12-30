import React from 'react'
import Header from 'layout/LandingPageLayout/Header'
import Footer from 'layout/LandingPageLayout/Footer'

const LandingPageLayout = ({ children }) => {
  return (
    <div>
      <title>The Trade King</title>
     <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LandingPageLayout
