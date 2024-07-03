import ChangeMoney from "@/common/hooks/changeMoney";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProduct = ({ id }: { id: string | number }) => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const queryClient = useQueryClient();
    const { data: products, isLoading } = useQuery({
        queryKey: ["RELATED_PRODUCT", id],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://test-be-phi.vercel.app/api/v1/products/${id}/related`
            );
            return data;
        },
    });
    const { mutate } = useMutation({
        mutationFn: async ({
            productId,
            quantity,
        }: {
            productId: string | number;
            quantity: number;
        }) => {
            const { data } = await axios.post(
                `https://test-be-phi.vercel.app/api/v1/carts/add-to-cart`,
                {
                    userId,
                    productId,
                    quantity,
                }
            );
            return data;
        },
        onSuccess: () => {
            toast({
                title: "Thêm vào giỏ hàng thành công!",
                variant: "success",
            });
            queryClient.invalidateQueries({
                queryKey: ["CART", userId],
            });
        },
    });
    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <div className="product-list">
                {products?.map((product: any, index: number) => {
                    const discountPrice =
                        product.price -
                        (product.price * product.discount) / 100;
                    return (
                        <div key={index} className="product-item">
                            <div className="product-image">
                                <img
                                    src={product.image}
                                    alt=""
                                    className="product__thumbnail"
                                />
                                {product?.discount ? (
                                    <span className="product-sale">
                                        {product?.discount}%
                                    </span>
                                ) : null}
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <Link to={""} className="product__link">
                                        {product.name}
                                    </Link>
                                </h3>
                                <a href="" className="product__category">
                                    {product.category.name}
                                </a>
                                <div className="product-price">
                                    {product?.discount ? (
                                        <>
                                            <span className="product-price__new">
                                                <ChangeMoney
                                                    money={discountPrice}
                                                />
                                            </span>
                                            <span className="product-price__old">
                                                <ChangeMoney
                                                    money={product.price}
                                                />
                                            </span>
                                        </>
                                    ) : (
                                        <span className="product-price__new">
                                            <ChangeMoney
                                                money={product.price}
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="product-actions">
                                <Link
                                    to={`/detail/${product._id}`}
                                    className="product-action__quickview"
                                >
                                    Quick View
                                </Link>
                                <button
                                    className="product-action__addtocart"
                                    onClick={() =>
                                        mutate({
                                            productId: product._id as any,
                                            quantity: 1,
                                        })
                                    }
                                >
                                    Add To Cart
                                </button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">
                                        <img
                                            src="/src/assets/icons/icon-share.svg"
                                            alt=""
                                        />
                                        Share
                                    </span>
                                    <span className="product-action__compare">
                                        <img
                                            src="/src/assets/icons/icon-compare.svg"
                                            alt=""
                                        />
                                    </span>
                                    <span className="product-action__like">
                                        <img
                                            src="/src/assets/icons/icon-heart.svg"
                                            alt=""
                                        />
                                        Like
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default RelatedProduct;
