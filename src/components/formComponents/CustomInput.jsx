import './customInput.scss'

export default function CustomInput({ placeholder, type, functionToLaunch }) {

    return(

        <input className='custom-input' placeholder={placeholder} type={type} onChange={(e) => functionToLaunch(e.target.value)} />

    )

}