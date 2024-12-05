export function Message({label, className, className_i}:Message){

    return(
        <div className={`${className} ${"flex justify-center p-3 border text-sm cursor-default rounded-md"}`}>
            <div className="">
                <i className={className_i}/>
            </div>
            <div className="">
                <p>{label}</p>
            </div>
        </div>
    )

}
type Message = {
    label: string,
    className: any;
    className_i : any
}

export default Message