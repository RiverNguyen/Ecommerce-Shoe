import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ThanksPage = () => {
    return (
        <>
            <div className="text-center font-bold text-4xl">
                Cảm ơn bạn <br /> đã mua hàng của chúng tôi !!! 🎉🎉🎉
            </div>
            <div className="flex items-center justify-center">
                <Link to="/">
                    <Button className="mt-4">Quay lại trang chủ</Button>
                </Link>
            </div>
        </>
    );
};

export default ThanksPage;
