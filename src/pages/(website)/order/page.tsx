/* eslint-disable @typescript-eslint/no-explicit-any */
import useCart from "@/common/hooks/useCart";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { IProduct } from "@/common/types/product";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Banner from "../home/_component/Banner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ChangeMoney from "@/common/hooks/changeMoney";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const form = useForm();
    const navigate = useNavigate();
    const { data, calculateTotal, total } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
            orderNumber: string;
        }) => {
            const { data } = await axios.post(
                "https://test-be-phi.vercel.app/api/v1/orders",
                order
            );
            return data;
        },
        onSuccess: () => {
            toast({
                title: "Đặt hàng thành công !",
                description: "Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi !",
                variant: "success",
            });
            navigate("/thanks");
        },
    });

    const onSubmit = (formData: any) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
            orderNumber: generateOrderNumber(),
        });
    };

    function generateOrderNumber() {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0");
        return `${timestamp}-${random}`;
    }
    return (
        <>
            <Banner />
            <div className="checkout">
                <div className="container">
                    <h2 className="checkout-title">Billing details</h2>
                    <div className="checkout-around">
                        {/* <form className="checkout-form">
                            <div className="checkout-form__name">
                                <div className="checkout-form__firstname">
                                    <label
                                        htmlFor=""
                                        className="checkout-form__label"
                                    >
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="checkout-form__input"
                                        placeholder="First Name..."
                                    />
                                </div>
                                <div className="checkout-form__lastname">
                                    <label
                                        htmlFor=""
                                        className="checkout-form__label"
                                    >
                                        Last Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="checkout-form__input"
                                        placeholder="Last Name..."
                                    />
                                </div>
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Company Name (Optional):
                                </label>
                                <input
                                    type="text"
                                    className="checkout-form__input"
                                    placeholder="Company Name (Optional)..."
                                />
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Country / Region:
                                </label>
                                <select
                                    className="checkout-form__input"
                                    title="Select an option"
                                >
                                    <option value={0}>Hà Nội</option>
                                    <option value={1}>TP. Hồ Chí Minh</option>
                                </select>
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Street address:
                                </label>
                                <input
                                    type="text"
                                    className="checkout-form__input"
                                    placeholder="Street address..."
                                />
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Town / City:
                                </label>
                                <input
                                    type="text"
                                    className="checkout-form__input"
                                    placeholder="Town / City..."
                                />
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Province:
                                </label>
                                <select
                                    className="checkout-form__input"
                                    title="Select an option"
                                >
                                    <option value={0}>Hoài Đức</option>
                                    <option value={1}>Long Biên</option>
                                </select>
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    ZIP code:
                                </label>
                                <input
                                    type="text"
                                    className="checkout-form__input"
                                    placeholder="ZIP code..."
                                />
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Phone:
                                </label>
                                <input
                                    type="text"
                                    className="checkout-form__input"
                                    placeholder="Phone..."
                                />
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                >
                                    Email address:
                                </label>
                                <input
                                    type="email"
                                    className="checkout-form__input"
                                    placeholder="Email address..."
                                />
                            </div>
                            <div className="checkout-form__item">
                                <label
                                    htmlFor=""
                                    className="checkout-form__label"
                                />
                                <textarea
                                    cols={30}
                                    className="checkout-form__input"
                                    rows={10}
                                    placeholder="Additional information..."
                                    defaultValue={""}
                                />
                            </div>
                        </form> */}
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="customerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="customerName">
                                                Họ tên người nhận:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập họ và tên..."
                                                    {...field}
                                                    id="customerName"
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name="customerPhone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="customerPhone">
                                                Số điện thoại :
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập số điện thoại..."
                                                    {...field}
                                                    id="customerPhone"
                                                ></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>

                                <Button>Đặt mua hàng</Button>
                            </form>
                        </Form>
                        <div className="checkout-detail">
                            <div className="checkout-detail__header">
                                {/* <ul>
                                    <li>Product</li>
                                    <li>Asgaard sofa x 1</li>
                                    <li>Subtotal</li>
                                    <li>Total</li>
                                </ul>
                                <ul>
                                    <li>Subtotal</li>
                                    <li>25.000.000đ</li>
                                    <li>25.000.000đ</li>
                                    <li className="total-price">25.000.000đ</li>
                                </ul> */}
                                {data?.products?.map((item: IProduct) => {
                                    return (
                                        <>
                                            <ul>
                                                <li>
                                                    {item.name} x{" "}
                                                    {item.quantity}
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <ChangeMoney
                                                        money={
                                                            item.price *
                                                            item.quantity
                                                        }
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    );
                                })}
                                <ul>
                                    <li>TOTAL: </li>
                                </ul>
                                <ul>
                                    <li className="total-price">{total()}</li>
                                </ul>
                            </div>
                            <hr />
                            <div className="checkout-detail__body">
                                <input
                                    type="radio"
                                    className="checkout-detail__radio"
                                    name="checkout"
                                />
                                <label htmlFor="">Direct Bank Transfer</label>
                                <p>
                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order will not be
                                    shipped until the funds have cleared in our
                                    account.
                                </p>
                                <input
                                    type="radio"
                                    className="checkout-detail__radio"
                                    name="checkout"
                                />
                                <label htmlFor="">Direct Bank Transfer</label>
                                <br />
                                <input
                                    type="radio"
                                    className="checkout-detail__radio"
                                    name="checkout"
                                />
                                <label htmlFor="">Cash On Delivery</label>
                                <p>
                                    Your personal data will be used to support
                                    your experience throughout this website, to
                                    manage access to your account, and for other
                                    purposes described in our
                                    <b> privacy policy.</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPage;
