import React from 'react'
import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Country Web</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar