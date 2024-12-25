export function InputBox({ label, placeholder,onChange,type }:{label:string,placeholder:string,onChange:(e:any)=>void,type?:string}) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input  onChange={onChange}
                    type={type}
                placeholder={placeholder} 
                className="w-full px-2 py-1 border rounded border-slate-400 focus:border-blue-500 outline-none hover:border-blue-500"
            />
        </div>
    );
}