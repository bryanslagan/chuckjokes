import '../styles/_globals.scss';

export default function TextInput({fullWidth, width, suffix, onChange, className}){
    return (
        <div style={{width}} className={`text-input${fullWidth ? ' fullWidth' : ''} ${className ?? ""}`}>
            <input onChange={onChange} placeholder="How can we make you laugh today?" type="text"/>
            {suffix}
        </div>
    )
}