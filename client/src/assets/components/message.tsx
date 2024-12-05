export function Message({img, label, className}:Message){

    return(
        <div className={`${className} ${"flex justify-center p-3 border border-green-500 bg-green-200 rounded-md text-green-500 text-sm cursor-default"}`}>
            <div className={className_i}>
                <img src={img} alt="" />
            </div>
            <div className={className_l}>
                <p>{label}</p>
            </div>
        </div>
    )

}
type Message = {
    img: string, 
    label: string,
    className: any;
}

export default Message