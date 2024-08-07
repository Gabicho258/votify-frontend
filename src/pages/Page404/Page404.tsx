import { Link } from "react-router-dom";
import "./_Page404.scss";

export const Page404 = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>:(</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/login">home page</Link>
      </div>
    </div>
  );
};
