import React from 'react'

const NavBar = () => {
  return (
    <div className="quest-tree-container bg-[#0B1020] min-h-screen">
      <div className="nav-bar-container flex justify-between items-center align-middle p-4">
        <h1 className="logo text-3xl text-[#E6E9F2] font-bold">LEVELD</h1>
        <div className="user-info-container align-right pr-4 flex items-center align-middle flex-row">
          <div className="name-container flex flex-col items-end">
          <p className="name pr-4 text-[#E6E9F2] text-xl">Full Name</p>
          <p className="username text-[#9AA3B2] pr-4 text-sm">@username</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#D9D9D9]"></div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
