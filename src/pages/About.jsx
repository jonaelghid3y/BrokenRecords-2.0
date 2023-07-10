import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AiFillLinkedin,AiFillGithub } from 'react-icons/ai';
import { BsFillBriefcaseFill} from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition:{ duration: 5}
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {duration: 3, staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const [containerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div id="aboutdiv">
      <div id="parallax">
        <h1 id="aboutusH1">ABOUT</h1>
        <div className="mouse"></div>
      </div>
      <div id="parallaxtextdiv">
        <motion.p id="parallaxP" initial='hidden'  animate={inView ? 'visible' : 'hidden'} variants={containerVariants} ref={containerRef} >
          Vi är Daniel och Jonael, och det har varit riktigt spännande att jobba med den här sidan. Det hela började som ett skolprojekt, men vi insåg snabbt att vi kunde göra något ännu mer fantastiskt om vi fick lite extra tid på oss. Så under sommaren 2023 har vi lagt ner massor av energi på att förbättra och fortsätta utveckla sidan.
          <br />
          <br />
          Det har verkligen varit en otrolig resa för oss båda. Vi har lärt oss så mycket längs vägen och haft en riktigt rolig tid med detta samarbete. Vi hoppas verkligen att ni har gillat vad ni har sett hittills!
        </motion.p>
        <motion.h4 initial='hidden'  animate={inView ? 'visible' : 'hidden'} variants={containerVariants} >DNK x Frontendjoni</motion.h4>
        <motion.div id="contactwrapper" initial='hidden'  animate={inView ? 'visible' : 'hidden'} variants={containerVariants}>
          <motion.div className='contactdiv'>
            <h5>DNK:</h5>
            <Link>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                variants={iconVariants}
              >
                <AiFillLinkedin className='contacticons' />
              </motion.div>
            </Link>
            <Link>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                variants={iconVariants}
              >
                <AiFillGithub className='contacticons' />
              </motion.div>
            </Link>
            <Link>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                variants={iconVariants}
              >
                <BsFillBriefcaseFill className='contacticons' />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div className='contactdiv'>
            <h5>Frontendjoni:</h5>
            <Link>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                variants={iconVariants}
              >
                <AiFillLinkedin className='contacticons' />
              </motion.div>
            </Link>
            <Link>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                variants={iconVariants}
              >
                <AiFillGithub className='contacticons' />
              </motion.div>
            </Link>
            <Link>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                variants={iconVariants}
              >
                <BsFillBriefcaseFill className='contacticons' />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div id="parallax2"></div>
    </div>
  );
}