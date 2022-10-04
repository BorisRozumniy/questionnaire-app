import { Link } from "react-router-dom";
import { frontendUrls } from "../urls/frontendUrls";

export const Header = () => {
  return (
    <>
      <h1>Header</h1>
      <nav>
        <ul>
          <li>
            <Link to={frontendUrls.home}>home</Link>
          </li>
          <li>
            <Link to={frontendUrls.questionnaires}>questionnaires</Link>
          </li>
          <li>
            <Link to={frontendUrls.respondents}>respondents</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
