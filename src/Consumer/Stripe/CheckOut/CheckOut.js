import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const CheckOut = ({ onCheckout }) => {
  const handleClick = async () => {
    // Fetch your server to create a Stripe Checkout session
    // const response = await fetch("/your-server-endpoint-for-checkout-session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     // Include any necessary data for your server to create the session
    //     item: 1, // Example: Item quantity
    //   }),
    // });

    // const session = await response.json();
    const session ="cs_test_a1F9DeC2DSY2wjy1cAIE8pCnEKxZG1lBCBw2pc4WFUj2fnFlXqVgZOqyVo";

    // Load Stripe.js to initialize Stripe elements and Checkout
    const stripe = await loadStripe(
      "pk_test_51OD8HmGxHUVXeFbJnnYeN7G3nxVacZ82ez9F6CKo6HbJjUWBMVM1vYLh4zOtjLlG5k452eTLcwqyKgbeqtkzLycs00tJue2iJx"
    );
    
    const result = await stripe.redirectToCheckout({
      sessionId: session,
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      onCheckout && onCheckout();
    }
  };

  return <button onClick={handleClick}>Checkout</button>;
};

export default CheckOut;
