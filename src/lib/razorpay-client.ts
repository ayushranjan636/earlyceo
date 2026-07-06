declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface StartPaymentParams {
  amount: number;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  onSuccess: () => void;
  onDismiss?: () => void;
}

export async function startRazorpayPayment({
  amount,
  leadId,
  name,
  email,
  phone,
  description,
  onSuccess,
  onDismiss,
}: StartPaymentParams) {
  const keyRes = await fetch("/api/razorpay/key");
  const keyData = await keyRes.json();
  const key = keyData.keyId as string;

  if (!key) {
    throw new Error("Payment is not configured yet");
  }

  const orderRes = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, leadId, name, email, phone }),
  });

  if (!orderRes.ok) {
    throw new Error("Could not create payment order");
  }

  const order = await orderRes.json();
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    throw new Error("Could not load payment gateway");
  }

  const rzp = new window.Razorpay({
    key,
    amount: order.amount,
    currency: order.currency,
    name: "EarlyCEO",
    description,
    order_id: order.orderId,
    prefill: { name, email, contact: phone },
    theme: { color: "#000000" },
    handler: async (response) => {
      try {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, leadId }),
        });

        if (!verifyRes.ok) {
          throw new Error("Payment verification failed");
        }

        onSuccess();
      } catch {
        await fetch("/api/leads/cancel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId }),
        });
        throw new Error("Payment verification failed. Please try again.");
      }
    },
    modal: {
      ondismiss: onDismiss,
    },
  });

  rzp.open();
}
