import "./Select.css";

let Select = ({onChange, options, value}) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map(option => <option key={Math.random()*50} value={option}>{option}</option>)}
        </select>
    )
};

export default Select;