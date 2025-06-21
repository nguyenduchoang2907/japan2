import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import orderApi from "@/api/orderApi";

const OrdersReturn = () => {
  console.log("[DEBUG] 🧾 OrdersReturn component loaded");

  const [params] = useSearchParams();
  const responseCode = params.get("vnp_ResponseCode");
  const txnRef = params.get("vnp_TxnRef"); // dạng: 87-1750527154133

  useEffect(() => {
    console.log("[DEBUG] 📦 useEffect triggered");
    console.log("[DEBUG] responseCode:", responseCode);
    console.log("[DEBUG] txnRef:", txnRef);

    if (responseCode === "00" && txnRef) {
      const orderId = parseInt(txnRef.split("-")[0]);
      console.log("[DEBUG] Extracted orderId:", orderId);

      if (!isNaN(orderId)) {
        console.log("[DEBUG] Sending API call to update is_paid = true...");
        orderApi
          .update(orderId, { is_paid: true })
          .then(() => {
            console.log("✅ Order marked as paid from FE");
          })
          .catch((err) => {
            console.error("❌ Failed to update order:", err);
          });
      } else {
        console.warn("⚠️ orderId is NaN, check txnRef format");
      }
    } else {
      console.warn("⚠️ responseCode !== '00' or txnRef missing");
    }
  }, [responseCode, txnRef]);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f0f2f5, #d6e4ff)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div className="text-center">
          {responseCode === "00" ? (
            <h1 className="text-green-600 text-2xl">Thanh toán thành công ✅</h1>
          ) : (
            <h1 className="text-red-600 text-2xl">Thanh toán thất bại ❌</h1>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrdersReturn;
