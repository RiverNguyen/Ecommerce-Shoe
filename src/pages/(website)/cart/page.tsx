/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useCart from "@/common/hooks/useCart";
import { TrashIcon } from "@/components/icons";
import { Link } from "react-router-dom";
import Banner from "../home/_component/Banner";
import Services from "../home/_component/Services";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ChangeMoney from "@/common/hooks/changeMoney";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
const CartPage = () => {
    const { data, mutate, isLoading, isError, total } = useCart();
    const [isEmpty, setIsEmpty] = useState(false);

    const increment = (product: any) => {
        mutate({
            action: "INCREMENT",
            productId: product.productId,
        });
    };

    const decrement = (product: any) => {
        console.log(product);
        mutate({
            action: "DECREMENT",
            productId: product.productId,
        });
    };

    useEffect(() => {
        if (data?.products.length === 0) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [data]);

    if (isLoading)
        return (
            <div className="container flex justify-center">
                <Loader />
            </div>
        );

    if (isError || isEmpty)
        return (
            <h2 className="container text-center">
                Bạn chưa thêm sản phẩm nào vào giỏ hàng!
            </h2>
        );

    return (
        <>
            <Banner />
            <div className="cart">
                <div className="container">
                    <div className="cart-around">
                        <table className="cart-table">
                            <thead className="cart-table__header">
                                <tr>
                                    <th />
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="cart-table__body">
                                {data?.products.map(
                                    (product: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        src={product.image}
                                                        alt=""
                                                        className="cart-table__item"
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>
                                                    <ChangeMoney
                                                        money={product.price}
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        className="minus me-3"
                                                        onClick={() =>
                                                            decrement(product)
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    {product.quantity}
                                                    <button
                                                        className="plus ms-3"
                                                        onClick={() =>
                                                            increment(product)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td className="custom-td">
                                                    <ChangeMoney
                                                        money={
                                                            product.price *
                                                            product.quantity
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    {/* <button
                                                        onClick={() =>
                                                            mutate({
                                                                action: "REMOVE",
                                                                productId:
                                                                    product.productId,
                                                            })
                                                        }
                                                    >
                                                        <img
                                                            src={TrashIcon}
                                                            alt=""
                                                        />
                                                    </button> */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <img
                                                                src={TrashIcon}
                                                                alt=""
                                                            />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Bạn có muốn
                                                                    xoá sản phẩm
                                                                    khỏi giỏ
                                                                    hàng ?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Sản phẩm sẽ
                                                                    bị xoá khỏi
                                                                    giỏ hàng
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Huỷ
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() =>
                                                                        mutate({
                                                                            action: "REMOVE",
                                                                            productId:
                                                                                product.productId,
                                                                        })
                                                                    }
                                                                >
                                                                    Đồng ý
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        <div className="cart-total">
                            <div className="cart-total__title">
                                <h2>Cart Totals</h2>
                            </div>
                            <div className="cart-total__body">
                                <div className="cart-total__subtotal">
                                    <span>Subtotal</span>
                                    <span>{total()}</span>
                                </div>
                                <div className="cart-total__subtotal">
                                    <span>Total</span>
                                    <span className="total__money">
                                        {total()}
                                    </span>
                                </div>
                            </div>
                            <Link to={"/order"} className="cart-total__button">
                                Check Out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Services />
        </>
    );
};

export default CartPage;
