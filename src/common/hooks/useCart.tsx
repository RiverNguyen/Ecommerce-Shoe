import { useLocalStorage } from "@/common/hooks/useStorage";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { reduce } from "lodash";
import ChangeMoney from "./changeMoney";
type cartProps = {
    action: "INCREMENT" | "DECREMENT" | "REMOVE";
    productId?: string;
};

const useCart = () => {
    const queryClient = useQueryClient();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, ...restQuery } = useQuery({
        queryKey: ["CART", userId],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://test-be-phi.vercel.app/api/v1/carts/${userId}`
            );
            return data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async ({ action, productId }: cartProps) => {
            switch (action) {
                case "INCREMENT": {
                    await axios.put(
                        `https://test-be-phi.vercel.app/api/v1/carts/increase`,
                        {
                            userId,
                            productId,
                        }
                    );
                    toast({
                        title: "Tăng số lượng thành công!",
                        variant: "success",
                    });
                    break;
                }

                case "DECREMENT": {
                    await axios.put(
                        `https://test-be-phi.vercel.app/api/v1/carts/decrease`,
                        {
                            userId,
                            productId,
                        }
                    );
                    toast({
                        title: "Giảm số lượng thành công!",
                        variant: "success",
                    });
                    break;
                }

                case "REMOVE": {
                    await axios.post(
                        `https://test-be-phi.vercel.app/api/v1/carts/remove-cart`,
                        {
                            userId,
                            productId,
                        }
                    );
                    toast({
                        title: "Xoá sản phẩm khỏi giỏ hàng thành công!",
                        description: "Sản phẩm đã được xoá khỏi giỏ hàng",
                        variant: "success",
                    });
                    break;
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["CART", userId],
            });
        },
    });

    const calculateTotal = () => {
        if (!data || !data.products) return 0;
        const totalMoney = reduce(
            data.products,
            (total, product) => {
                return total + product.price * product.quantity;
            },
            0
        );
        return totalMoney;
    };

    const total = () => {
        const totalMoney = calculateTotal();
        return <ChangeMoney money={totalMoney} />;
    };

    return {
        data,
        mutate,
        total,
        calculateTotal,
        ...restQuery,
    };
};

export default useCart;
