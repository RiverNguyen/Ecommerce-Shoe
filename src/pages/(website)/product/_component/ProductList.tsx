import ProductQuery from "@/common/hooks/ProductQuery";
import ChangeMoney from "@/common/hooks/changeMoney";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { IProduct } from "@/common/types/product";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

type ProductListProps = {
    featured?: boolean;
    data?: IProduct[];
};

const ProductList = ({ featured, data }: ProductListProps) => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const queryClient = useQueryClient();
    const { data: products, isLoading } = ProductQuery();
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
        onError: () => {
            toast({
                title: "Bạn cần đăng nhập hoặc đăng ký để mua hàng!",
                variant: "destructive",
            });
        },
    });
    const filterProduct = featured
        ? products?.filter((product: IProduct) => product.featured == featured)
        : data
        ? data
        : products;

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="section-body">
                <div className="product-list">
                    {filterProduct?.map((product: IProduct, index: number) => {
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
                                        Xem sản phẩm
                                    </Link>
                                    <button
                                        className="product-action__addtocart"
                                        onClick={() =>
                                            mutate({
                                                productId:
                                                    product._id as number,
                                                quantity: 1,
                                            })
                                        }
                                    >
                                        Thêm vào giỏ hàng
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
            </div>
        </>
    );
};

export default ProductList;
