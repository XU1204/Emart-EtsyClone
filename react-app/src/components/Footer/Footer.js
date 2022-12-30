import github from '../../assets/github.png'
import linkedin from '../../assets/linkedin.png'
import './footer.css'

const Footer = () => {
    return (
        <div className="developer-info">Developer:  Lijuan Xu
                    <a href='https://github.com/XU1204'>
                        <img className='github-icon' src={github} alt='github'></img>
                    </a>
                    <a href='https://www.linkedin.com/in/lijuan-xu-96151b146/'>
                        <img className='linkedin-icon' src={linkedin} alt='linkedin'></img>
                    </a>
        </div>
    )
}

export default Footer;
