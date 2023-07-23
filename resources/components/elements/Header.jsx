import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-blue-500 animate-pulse">
      <h2 className="text-xl font-bold text-white">
        <Link to={"/"}>Base</Link>
      </h2>
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link
            to={"/new"}
            className="px-4 py-2 font-semibold rounded bg-yellow-500"
          >
            New Post
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

