const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

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
            <label htmlFor={id} className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">{labelText}</label>
            <input 
                id={id}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                onChange={onChange}
                className={inputStyle+customClass}
            />
        </div>
    )
};

