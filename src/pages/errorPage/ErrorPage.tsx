import { useRouteError } from "react-router-dom";
import './errorPage.css';
import Button from 'react-bootstrap/Button';

function ErrorPage() {

  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="container">
      <div>
        <h1>Oops! 🙈</h1>
        <p>Sorry, an unexpected error has occurred</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button variant="outline-primary" href="./squares">Go to the GAME Page</Button>
      </div>
    </div>
  );
}

export default ErrorPage;