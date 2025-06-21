import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

const OrdersReturn = () => {
  const [params] = useSearchParams();
  const responseCode = params.get("vnp_ResponseCode");

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
