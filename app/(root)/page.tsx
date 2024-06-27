import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'
import { getLoggedInUser } from '@/lib/actions/users.actions'

const Home = async () => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className = "home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type = "greeting"
          title = "Welcome"
          user = {loggedIn?.name || "Guest"} 
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