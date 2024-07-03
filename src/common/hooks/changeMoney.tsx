const ChangeMoney = ({ money }: { money: number }) => {
    const formattedPrice = money?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return formattedPrice;
};

export default ChangeMoney;
