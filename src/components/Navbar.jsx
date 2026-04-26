import { NavLink } from 'react-router-dom'

const Navbar = ({ pages }) => {
  return (
    <header className="topbar">
      <div className="brand">MernDoc</div>
      <nav>
        <ul className="route-links">
          {pages.map((page) => (
            <li key={page.path}>
              <NavLink
                to={page.path}
                className={({ isActive }) => (isActive ? 'route-link active' : 'route-link')}
              >
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
