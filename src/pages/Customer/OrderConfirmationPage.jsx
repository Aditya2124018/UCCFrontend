import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti'; // Install using `npm install canvas-confetti`

const OrderConfirmationPage = () => {
  useEffect(() => {
    // Trigger confetti effect on page load
    confetti({
      particleCount: 500,
      spread: 80,
      origin: { y: 0.6 },
    });
  },[])

  return (
    <div className="min-h-screen lg:min-h-screen flex flex-col items-center justify-center bg-green-500 px-4">
      {/* White Checkmark Icon with Scale Animation */}
      <div className="bg-white rounded-full p-4 mb-6 flex items-center justify-center tick-animation">
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-2">
        Order Placed Successfully
      </h1>
      <p className="text-base sm:text-lg text-white text-center mb-8">
        Thank You For Using Our Services.
      </p>

      {/* Go To Home Button */}
      <Link
        to="/custhome"
        className="btn btn-outline btn-white w-full max-w-xs sm:max-w-md"
      >
        Go To Home
      </Link>
      <Link
        to="/myorders"
        className="btn btn-outline btn-white w-full max-w-xs sm:max-w-md mt-3"
      >
        Go To My Orders
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
