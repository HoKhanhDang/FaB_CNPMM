interface ItemDetailProps {
    detail: string;
    imageSrc: string;
}
const ItemDetail: React.FC<ItemDetailProps> = ({ detail, imageSrc }) => {
    return (
        <>
            <div className="flex flex-row w-full h-auto md:px-[100px]">
                <div className="w-1/2 h-[500px] p-[50px]">
                    <img
                        src={imageSrc}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center p-5 gap-5">
                    <span className="text-[15px] font-normal">{detail}</span>
                    <div className="bg-red-500 rounded-xl flex justify-center items-center h-[50px] w-1/2">
                        Order Now
                    </div>
                </div>
            </div>
        </>
    );
};
export default ItemDetail;
