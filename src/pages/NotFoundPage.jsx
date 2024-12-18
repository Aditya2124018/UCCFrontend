import sadworker from "../assets/images/sad-worker.webp"
import {Link} from "react-router-dom"
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-5 bg-white shadow-lg rounded-lg max-w-lg">
        <img
          src={sadworker}
          alt="Sad Worker"
          className="mx-auto w-64 h-auto rounded-lg"
          loading="lazy"
        />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mt-2">
          Oops! It seems like the page you’re looking for doesn’t exist.
        </p>
        <div className="mt-5">
          <Link
            to="/"
            className="btn btn-primary bg-[#0355CC] text-white hover:bg-[#FF8A1D] border-none"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
