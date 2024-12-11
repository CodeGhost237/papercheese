export function Searchbar({className_i, className_f, type, onChange, value, placeholder, onclick, onFocus, onBlur, className}: Searchbar){
    return(
        <div className={`${className} ${" border-2 border-gray-200 px-4 py-1 rounded-md bg-slate-50 my-3"}`}>
            <div className="icon-start">
                <i className={className_i}></i>
            </div>
            <div className="input w-full">
                <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} className="w-full outline-none mx-3 bg-slate-50" required = {true} />
            </div>
            <div className="icon-end">
                <i className={className_f} onClick={onclick}></i>
            </div>
            
        </div>
    )
}

type Searchbar = {
    className_i : any;
    className_f : any;
    value : any;
    type : any;
    onFocus : any;
    onBlur: any;
    placeholder : any;
    onChange : any;
    onclick: any;
    className : String;
    required : any;
}

export default Searchbar