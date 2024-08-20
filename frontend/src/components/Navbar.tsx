import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img
            alt="Home Page"
            className="h-10 inline"
            src="https://i.pinimg.com/736x/8a/fe/96/8afe96eb478d4cdf6d57e578b70a454e.jpg"
            width={48}
            height={48}
          ></img>
        </NavLink>
        <NavLink
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to="/pokemon-cards"
        >
          Search Pokemon Card
        </NavLink>
      </nav>
    </div>
  )
}
