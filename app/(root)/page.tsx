import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'

const Home = () => {
  const loggedIn = {firstName: 'Omm', lastName: 'Mishra', email: 'supsad79@gmail.com'}
  return (
    <section className = "home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type = "greeting"
          title = "Welcome"
          user = {loggedIn?.firstName || "Guest"} 
          subtext = "Access and manage your accounts and transactions efficiently."/>

          <TotalBalanceBox 
          accounts = {[]}
          totalBanks = {1}
          totalCurrentBalance = {1250.85}/>
        </header>
      </div>
      <RightSideBar 
      user = {loggedIn}
      transactions = {[]}
      banks = {[{currentBalance: 92541.33}, {currentBalance: 10555.32}]} />
    </section>
  )
}

export default Home