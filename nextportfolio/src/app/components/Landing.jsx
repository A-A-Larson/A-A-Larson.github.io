import BodyImg from '../img/BlueshirtV5HSave.webp';
import HandsLight from '../img/HandsUWlbg.webp';
import HandsDark from '../img/HandsUWdbg.webp';
import LHand from '../img/LHand.webp';
import RHand from '../img/RHand.webp';
import Image from 'next/image';
import CallToAction from './CallToAction';
// import Carousel from '../components/Carousel';

export default function Landing() {
    return (
        <>
          <div 
            className='
              parallax
              bg-lightAccent
              text-lightHdrClr 
              dark:text-darkHdrClr'
          >

            {/* <Carousel/> */}
            
            <Image
              className='bodyLayer'                
              width={1900}
              height={942}
              src={BodyImg}   
              priority={true}  
              alt='Man with hands overlapping the top of the webpage as if he is holding onto it'
            />    
            <Image       
              className='handsbg block dark:hidden'        
              src={HandsLight}
              priority={true} 
              alt='Floating hands'
              width={6880}
              height={1440}                    
            />    
            <Image  
              className='handsbg hidden dark:block'             
              src={HandsDark}
              alt='Floating hands'
              width={6880}
              height={1440}                     
            />    

            <div className="handsLayers">                
              <Image       
                className='hand LHand'        
                src={LHand}
                alt='Floating hand'
                width={575}
                height={1440}                     
              />      
              <Image       
                className='hand RHand'        
                src={RHand}
                alt='Floating hand'
                width={592}
                height={1440}                      
              />    
            </div>
              
          </div>
          
          <header 
            className='
              headerLayer
              bg-lightBG
              dark:bg-darkBG
              text-lightHdrClr 
              dark:text-darkHdrClr                 
              '
          >       

            <h1 className='headerH1'> 

              <div className='headerIntro'>                 
                Hi, I&apos;m 
              </div>  

              <div className='headerName'>
                Andrew Larson
              </div>

              <CallToAction />

            </h1>   
          </header>
        </>
    )
}