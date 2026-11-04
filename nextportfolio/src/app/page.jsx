'use client';
import Landing from "./components/Landing";
import NavHeader from './components/NavHeader';
import AboutMe from './components/AboutMe';
import Work from './components/Work';
import ApiDemo from "./components/ApiDemo";
import Footer2 from './components/Footer2';


export default function Home() {    
    
  return (
    <div>
      <main className="mainGrid bg-lightBG text-lightTxtClr dark:bg-darkBG dark:text-darkTxtClr" role="main">           
        <section className='landingSection'>        
          <Landing/>            
        </section>        
        <NavHeader />
        <section className='aboutSection bg-lightBG dark:bg-darkBG' id="Scroll-Location">
          <AboutMe />
        </section>
        <section className='workSection bg-lightBG dark:bg-darkBG' id='what-i-can-do'>
          <Work/>
        </section>
        <section className="APIDemoSection bg-lightBG dark:bg-darkBG">
          <ApiDemo/>
        </section>
      </main>
      <Footer2 /> 
    </div>
  )
};