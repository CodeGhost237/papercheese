export function Btnmedia({img, label, value, type, alt}: BtnmediaProps){

    return(
        <button className="flex items-center justify-center p-3 py-4 rounded-md w-full cursor-pointer bg-gray-100 hover:bg-blue-50 transition-all" type={type} value={value} > 
            <div className={"mr-2"}>
                <img src={img} alt={alt} width={20}/>
            </div>
            <div className={"ml-2"}>
                {label}
            </div>
        </button>
    )
}
type BtnmediaProps = {
    img: string;
    label: string;
    value?: any;      
    type: any;
    alt: string;
};

export default Btnmedia