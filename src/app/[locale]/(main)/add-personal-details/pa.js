"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Step 1 — Save Cart
      const cartRes = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_id: "abc123",
          package: { id: 6, packageType: "4 Member Family Puja", packagePrice: 1251, quantity: 1 },
          add_ons: [
            { id: 3, title: "Black Sesame Seeds Arpan", price: 501, quantity: 1 },
            { id: 4, title: "Anna Seva", price: 351, quantity: 2 },
          ],
          grand_total: 2454,
          userDetails: {
            whatsapp: "09594052479",
            name: "Mukesh Sharma",
            address: "Thane west",
            postalCode: "400604",
            city: "Thane",
            state: "Maharashtra",
            members: ["Rohit", "Ranjan", "Rakesh"],
          },
        }),
      });

      const cartData = await cartRes.json();
      if (!cartData.success) throw new Error("Cart creation failed");

      // Step 2 — Create Razorpay Order
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartData.grand_total,
          currency: "INR",
          receipt: `cart_${cartData.cart_id}`,
          cart_id: cartData.cart_id,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error("Order creation failed");

      // Step 3 — Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Ghar Mandir",
        order_id: orderData.order.id,
        handler: async (response) => {
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              cart_id: cartData.cart_id,
            }),
          });
          alert("✅ Payment Successful!");
        },
        theme: { color: "#D32F2F" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <button
        disabled={loading}
        onClick={handleCheckout}
        className="bg-red-600 text-white px-6 py-3 rounded-lg w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}




 const handleSubmit = async (e) => {
  e.preventDefault();

  // Step 1: Validate form
  const { isValid, errors: validationErrors } = validateFields([form], [
    "whatsapp",
    "name",
    "address",
    "postalCode",
    "city",
    "state",
  ]);

  const fieldErrorObj = validationErrors[0];
  setErrors(fieldErrorObj);

  if (!isValid) return;

  try {

    // Step 2: Prepare payload for cart
    const userDetails = { ...form, members };
    const payload = {
      ...allCarts,
      store_id: storeId,
      userDetails,
    };


    // Step 3: Save Cart Data
    const cartRes = await fetchWithWait({
      dispatch,
      action: addNewCartAction(payload),
    });

    if (cartRes.status !== 200) {
      alert(cartRes.message || "Failed to save cart.");
      return;
    }

    // Step 4: Create Razorpay Order
    const orderPayload = {
      amount: cartRes.grand_total,
      currency: "INR",
      receipt: `cart_${cartRes.cart_id}`,
      cart_id: cartRes.cart_id,
    };

    const orderRes = await fetchWithWait({
      dispatch,
      action: requestPaymentOrderAction(orderPayload),
    });

    if (orderRes.status !== 200 || !orderRes.order) {
      alert(orderRes.message || "Failed to create payment order.");
      return;
    }

    // Step 5: Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderRes.order.amount,
      currency: "INR",
      name: allCarts?.['package']?.packageType,
      description: "Checkout Payment",
      order_id: orderRes.order.id,
      handler: async (response) => {
        try {
          const verifyPayload = {
            ...response,
            cart_id: cartRes.cart_id,
          };

          const verifyRes = await fetchWithWait({
            dispatch,
            action: paymentVerifyAction(verifyPayload),
          });

          if (verifyRes.status === 200) {
            alert("✅ Payment Successful!");
            // Optionally: redirect to success page
            // router.push(`/payment-success/${cartRes.cart_id}`);
          } else {
            alert(verifyRes.message || "Payment verification failed.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Error verifying payment.");
        }
      },
      theme: { color: "#D32F2F" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", (response) => {
      alert("❌ Payment Failed. Please try again.");
      console.error("Payment Failed:", response.error);
    });

  } catch (err) {
    console.error("Checkout Error:", err);
    alert("Something went wrong during checkout.");
  } finally {
    console.log("finally")
  }
};
