import Image from 'next/image';
import About from '../img/aboutbust3.webp';

export default function AboutMe() {
    
    return (
        <div
            className='aboutLayout 
                      text-lightHdrClr 
                      dark:text-darkHdrClr'>

            <h2 className='aboutH2'>About Me</h2>

            <div className='about1'>
              <h3 className="aboutH3">What am I doing now?</h3>
              <p className='aboutP1'>
              Now that I&apos;ve recently graduated, I&apos;m working as a 
              Junior Developer on an Angular project. In my spare time I&apos;ve
              been building personal projects using Flutter. 
              </p>
            </div>

            <div className='about2'>
              <h3 className="aboutH3">How did I get here?</h3>
              <p className='aboutP2'>
              In 2007 I started a career as a mechanic with a degree in automotive 
              technology. Since then I&apos;ve been a self starter, working 
              independently in a commision shop with tight deadlines. A mechanical 
              team lead on a production line that used Six Sigma methodology and Lean 
              production with weekly sprints. I&apos;ve achieved the title of Master 
              Automotive Techician and run out of new things to learn. 
              </p>
              <p className='aboutP2'>
              As a lifelong learner, I&apos;m starting a new chapter in my life as I 
              trade in my wrenches for a keyboard.
              </p>
            </div>

            <div className='about3'>
              <h3 className="aboutH3">Where do I want to go from here?</h3>              
              <p className='aboutP3'>
              I&apos;ll continue working on personal projects, building my portfolio and 
              looking for opportunities to gain real world experience. Use the email 
              button in the navigation bar or footer to connect!
              </p>
            </div>

            <Image
              className='aboutImg'
              src={About}  
              width={1079}
              height={1592}
              alt='A profile picture of Andrew Larson'
            />

          </div>  
    )
}