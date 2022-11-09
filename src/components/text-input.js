import '../styles/_globals.scss';

export default function TextInput({fullWidth, width, suffix, onChange}){
    return (
        <div style={{width}} className={`text-input${fullWidth ? ' fullWidth' : ''}`}>
            <input onChange={onChange} placeholder="How can we make you laugh today?" type="text"/>
            {suffix}
        </div>
    )
}