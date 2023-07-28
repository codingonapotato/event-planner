const inputStyle = "rounded-md appearance-none border border-gray-300 text-gray-900 text-sm focus:border-blue w-1/2";

export default function Input({
    id,
    type,
    placeholder,
    customClass,
    isRequired=false,
    onChange,
    labelText
}) {
    return (
        <div>
            <label for={id} className="block mb-2 text-sm font-medium text-gray-900">{labelText}</label>
            <input 
                type={type}
                placeholder={placeholder}
                required={isRequired}
                onChange={onChange}
                className={inputStyle+customClass}
            />
        </div>
    )
};

