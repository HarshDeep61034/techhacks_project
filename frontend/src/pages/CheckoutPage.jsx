import axios from "axios";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handlePayment = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:8888/payment-intent`, {
      amount: 200,
    });
    if (response.status === 200) {
      const confirmPayment = await stripe.confirmCardPayment(
        response.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        },
      );
      if (confirmPayment.paymentIntent.status === "succeeded") {
        console.log("payment confirmed");
      }
    }
  };
  return (
    <form onSubmit={handlePayment}>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <button>Confirm Payment</button>
    </form>
  );
};

export default CheckoutPage;
