/**
 * This code was generated by Builder.io.
 */
import React, { useState } from "react";
import { IPaymentCard } from "../../../../types/IPaymentCard";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from "../../../../utils/payments/payment.util";

const ShippingCalculator: React.FC = () => {
    const [payment, setPayment] = useState<string>("");

    const [paymentCard, setPaymentCard] = useState<IPaymentCard>({
        cardNumber: "",
        name: "",
        cvc: "",
        date: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        switch (name) {
            case "cardNumber":
                formattedValue = formatCreditCardNumber(value);
                break;
            case "cvc":
                formattedValue = formatCVC(value);
                break;
            case "date":
                formattedValue = formatExpirationDate(value);
                break;

            default:
                break;
        }

        setPaymentCard({
            ...paymentCard,
            [name]: formattedValue,
        });
    };

    return (
        <section className="flex flex-col w-full h-full gap-5 grow px-20 pt-10 pb-11 mt-1.5 text-lg text-red-600 bg-orange-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="self-stretch text-4xl font-bold">Payment method</h2>
            <form className="flex flex-col items-start">
                <select
                    id="paymentGateway"
                    className="bg-red-500 text-white rounded-md p-5 border-0"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                >
                    <option value="1">Thanh toán khi nhận hàng</option>
                    <option value="2">Thẻ tín dụng/Ghi nợ</option>
                    <option value="3">Momo</option>
                </select>
                {payment === "2" && (
                    <>
                        <div className="flex flex-col gap-5 justify-between px-3.5 py-4 mt-5 max-w-full bg-white rounded-xl border-2 border-red-600 border-solid w-full">
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="Card number"
                                aria-label="Card number"
                                required
                                value={paymentCard.cardNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-5 justify-between px-3.5 py-4 mt-5 max-w-full bg-white rounded-xl border-2 border-red-600 border-solid w-full">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                aria-label="Name"
                                required
                                value={paymentCard.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-5 justify-between px-3.5 py-4 mt-5 max-w-full bg-white rounded-xl border-2 border-red-600 border-solid w-full">
                            <input
                                type="text"
                                id="cvc"
                                name="cvc"
                                placeholder="CVC"
                                aria-label="CVC"
                                required
                                value={paymentCard.cvc}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-5 justify-between px-3.5 py-4 mt-5 max-w-full bg-white rounded-xl border-2 border-red-600 border-solid w-full">
                            <input
                                type="text"
                                id="date"
                                name="date"
                                placeholder="Date"
                                pattern="\d{3,4}"
                                aria-label="Date"
                                required
                                value={paymentCard.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}
            </form>
        </section>
    );
};

export default ShippingCalculator;