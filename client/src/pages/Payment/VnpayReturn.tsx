// components/VnpayReturn.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const VnpayReturn: React.FC = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [transactionInfo, setTransactionInfo] = useState<any>(null);

    const OrderCreation = async () => {
        try {
            window.localStorage.removeItem("order");
            window.localStorage.removeItem("persist:cart");
            Swal.fire({
                title: "Order successfully",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#f87171",
                position: "top-right",
            }).then(() => {
                window.location.href = "/#/cart";
            });
        } catch (e) {
            toast("Error when place order");
        }
    };

    useEffect(() => {
        // Lấy dữ liệu query params từ URL khi VNPay redirect
        const searchParams = new URLSearchParams(location.search);

        const vnp_Amount = searchParams.get("vnp_Amount");
        const vnp_BankCode = searchParams.get("vnp_BankCode");
        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        const vnp_TxnRef = searchParams.get("vnp_TxnRef");
        const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");

        setTransactionInfo({
            amount: vnp_Amount,
            bankCode: vnp_BankCode,
            transactionRef: vnp_TxnRef,
            transactionNo: vnp_TransactionNo,
        });

        // Kiểm tra trạng thái thanh toán
        if (vnp_ResponseCode === "00") {
            setPaymentStatus("success");
            OrderCreation();
        } else {
            setPaymentStatus("failed");
            setTimeout(() => {
                window.location.href = "/#/cart";
            }, 3000);
        }
    }, [location.search]);

    return (
        <div className="flex flex-col items-center pt-[130px]">
            <div className="flex w-full gap-5 max-md:flex-col sm:flex-row mt-[30px] justify-center items-start max-sm:px-0 sm:px-[100px]">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Kết quả Thanh Toán VNPay
                    </h2>
                    {paymentStatus === "success" ? (
                        <div className="text-center">
                            <h3 className="text-xl text-green-600 font-semibold mb-4">
                                Thanh toán thành công!
                            </h3>
                            <p className="mb-2">
                                <span className="font-bold">Mã giao dịch:</span>{" "}
                                {transactionInfo?.transactionNo}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">
                                    Mã tham chiếu:
                                </span>{" "}
                                {transactionInfo?.transactionRef}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Số tiền:</span>{" "}
                                {transactionInfo?.amount / 100 / 24000} USD
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Ngân hàng:</span>{" "}
                                {transactionInfo?.bankCode}
                            </p>
                        </div>
                    ) : paymentStatus === "failed" ? (
                        <div className="text-center">
                            <h3 className="text-xl text-red-600 font-semibold mb-4">
                                Thanh toán thất bại
                            </h3>
                            <p className="mb-2">
                                Vui lòng thử lại hoặc liên hệ hỗ trợ.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-500">
                                Đang xử lý kết quả thanh toán...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VnpayReturn;
