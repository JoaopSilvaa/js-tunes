import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
            <p>Desenvolvido por João Antônio <br/>
                DEV - FullStack 
            </p>
        <div>
          <a href='https://www.linkedin.com/in/joaoantoniosilvaa/'>
            <FaLinkedin  className='icons'/>
          </a>
          <a href='https://github.com/JoaopSilvaa'>
            <FaGithub  className='icons'/>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
