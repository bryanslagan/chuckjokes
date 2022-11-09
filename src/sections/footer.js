import '../styles/footer.scss';

export default function Footer(){
    return(
        <div className="footer">
            <img src="/img/footer.png" />
            <div className='footer-text'>
                <h3>GOT JOKES?<br/>GET PAID FOR SUBMITTING!</h3>
                <button>SUBMIT A JOKE <img src="/icons/right-arrow.png" /></button>
            </div>
        </div>
    )
}