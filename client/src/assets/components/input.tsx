export function Input({className_i, className_f, type, onChange, value, placeholder, onclick}: Input){
    return(
        <div className="flex items-center w-full border-2 border-gray-200 px-4 py-1 rounded-md bg-slate-50 my-3">
            <div className="icon-start">
                <i className={className_i}></i>
            </div>
            <div className="input w-full">
                <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full outline-none p-3 bg-slate-50" />
            </div>
            <div className="icon-end">
                <i className={className_f} onClick={onclick}></i>
            </div>
        </div>
    )
}

type Input = {
    className_i : any;
    className_f : any;
    value : any;
    type : any;
    placeholder : any;
    onChange : any;
    onclick: any;
}

export default Input