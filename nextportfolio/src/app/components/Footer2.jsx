'use client';
import Image from 'next/image';
import FooterImgL from '../img/footlayer8.webp';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


export default function Footer() {
    return (
        <footer className='
                  footerSection
                  bg-lightAccent'>   
          <div className='footerParallax'>

                {/* <Image
                              className='footer-bg block dark:hidden'    
                              src={FooterBGL} 
                              alt='Cement pavement with the name Andrew Larson written in chalk'
                            />   
                
                            <Image
                              className='footer-bg hidden dark:block'    
                              src={FooterBGD} 
                              alt='Cement pavement with the name Andrew Larson written in chalk'
                            />  */}
            <div className='footer-content-container 
              text-lightHdrClr '>
              <div className='footer-icon-wrapper'>      
                <a
                  className='footer-icon'
                  href='https://www.linkedin.com/in/andrew-larson-0bb59b218'
                  aria-label='LinkedIn'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedin size={40} />LinkedIn
                </a>
                <a
                  className='footer-icon'
                  href='https://github.com/A-A-Larson'
                  aria-label='GitHub'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaGithub size={40} />GitHub
                </a>
                <a
                  className='footer-icon'
                  href='mailto:drewlars83@gmail.com'
                  aria-label='Email'
                >
                  <IoIosMail size={40} />Email
                </a>                          
              </div>
              <div className='copyright-content'>
                &#169;2024 Andrew Larson
              </div>
            </div>
            <Image
              className='footerImg '     
              src={FooterImgL} 
              alt='Feet sticking out from the bottom of the webpage.'
            />

            {/* <Image
              className='footerImg hidden dark:block'    
              src={FooterImgD}  
              alt='Feet sticking out from the bottom of the webpage.'
            />  */}

          </div>
        </footer>        
    )
}