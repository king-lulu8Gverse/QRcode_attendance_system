import { Link } from "react-router-dom";

function Sidebar({ links }) {
  return (
    <aside className="sidebar">
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;