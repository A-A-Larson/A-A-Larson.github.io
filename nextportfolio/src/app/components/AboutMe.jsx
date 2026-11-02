import Image from 'next/image';
import About from '../img/aboutbust3.webp';
import Timeline from './Timeline';
import timeline from '../data/timeline';

export default function AboutMe() {

    return (
        <div
            className='aboutLayout
                      text-lightHdrClr
                      dark:text-darkHdrClr'>

            <h2 className='aboutH2'>About Me</h2>

            <div className='aboutTimeline'>
              <Timeline entries={timeline} />
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
