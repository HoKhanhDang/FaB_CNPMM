require("dotenv").config();

export const vnp_TmnCode = process.env.TMNCODE; // Mã website của bạn tại VNPay
export const vnp_HashSecret = process.env.HASH; // Chuỗi bí mật được VNPay cấp
export const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL của VNPay
export const vnp_ReturnUrl = `${process.env.CLIENT_URL}/vnpay_return`; // URL nhận kết quả thanh toán
export const vnp_Api = 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction'; // API của VNPay
