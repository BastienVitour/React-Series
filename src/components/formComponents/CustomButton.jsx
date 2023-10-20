import './customButton.scss'

export default function CustomButton({ textContent, functionToLaunch }) {

    return(

        <button className="custom-button" onClick={functionToLaunch}>{textContent}</button>
        
    )

}