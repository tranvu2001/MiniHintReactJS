
const SpecsInput = ({field}) => {
    return (        
        <>
            {field.map((item, index) => (
                <div key={index} className="form-field flex flex-col mb-4">
                <label 
                    htmlFor={item.labelFor}
                    className="form-label mb-2"
                >
                    {item.label}
                </label>
                <input 
                    id={item.labelFor}
                    className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                    type='text'
                    placeholder={item.label}
                />
                </div>
            ))}
        </>
    )
}

export default SpecsInput