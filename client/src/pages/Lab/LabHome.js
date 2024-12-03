import React from 'react'
import LabNavbar from '../../Components/Lab/LabNavbar/LabNavbar'
import LabHeroSection from '../../Components/Lab/LabHeroSection/LabHeroSection'
import LabService from '../../Components/Lab/LabService/LabService'
import LabAbout from '../../Components/Lab/LabAbout/LabAbout'

function LabHome() {
  return (
    <div>
        <LabNavbar />
        <LabHeroSection />
        <LabService />
        <LabAbout />
    </div>
  )
}

export default LabHome