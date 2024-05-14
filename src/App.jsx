import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaPlay, FaPause } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

import clsx from 'clsx';
import './App.css';

export default function App() {
  const [hovered, setHovered] = useState(false);
  const [silence, setSilence] = useState(false);
  const [timerUI, setTimerUI] = useState(false);
  const [starting, setStarting] = useState(true);

  return (
    <div className='w-full h-svh flex justify-center items-center pt-2'>
      <motion.div className='flex w-full flex-col jusitfy-center items-center'>
        <motion.div className='min-h-[100px]'>
          <motion.div
            layout
            transition={{ type: 'spring', duration: 0.5 }}
            style={{ borderRadius: '50px' }}
            className={clsx(
              'h-9 bg-black flex p-1 min-w-[100px]',
              hovered ? 'min-w-[158px]' : null,
              silence ? 'min-w-[179px]' : null,
              timerUI ? 'min-w-[290px] min-h-[70px]' : null
            )}
          >
          { timerUI ? (
            <motion.div className="flex px-3 w-full items-center justify-between">
              <motion.div className="flex gap-2">
                {/* add play button and close*/}
                <motion.button
                  onClick={() => setStarting(!starting)}
                  initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)"}}
                  exit={{ opacity: 0, scale: 0.3, filter: "blur(10px)", transition: { duration: 0.3 } }}
                  className="min-w-[30px] p-3 rounded-full flex items-center justify-center bg-yellow-900"
                >
                  <AnimatePresence mode="wait">
                    {starting ? (
                        <motion.div
                          layout
                          key="play-btn"
                          layoutId="playing"
                          onClick={() => setStarting(true)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.1 }}
                        >
                          <FaPlay className="play-btn"/>
                        </motion.div>
                    ) : (
                        <motion.div
                          layout
                          key="pause-btn"
                          layoutId="pausing"
                          onClick={() => setStarting(false)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.1 }}
                        >
                          <FaPause className="play-btn"/>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <motion.button
                  onClick={() => setTimerUI(false)}
                  initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)"}}
                  exit={{ opacity: 0, scale: 0.3, filter: "blur(10px)", transition: { duration: 0.3 } }}
                  className="min-w-[30px] p-2 rounded-full flex items-center justify-center bg-slate-700"
                >
                  <IoClose className="close-btn"/>
                </motion.button>
              </motion.div>
              <motion.div className="timer">
                10:00
              </motion.div>
            </motion.div>
          ) :(
            <AnimatePresence>
              {hovered ? (
                <motion.div
                  className={'ring-display'}
                  layout
                  layoutId="ringer-display"
                  key='ringer'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    key="ringer-background"
                    layout
                    initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)"}}
                    exit={{ opacity: 0, scale: 0.3, filter: "blur(10px)", transition: { duration: 0.3 } }}
                    onClick={() => setSilence(prev => !prev)}
                    transition={{ duration: 0.2}}
                    className={clsx("ringer-background p-1 flex justify-center", silence ? "ringer-background:silenced px-3" : null)}
                  >
                    <FaBell
                      key="ringer-icon"
                      style={{ fontSize: "0.8rem" }}
                      className={clsx('ring-notification', !silence ? 'ring-notification:animate' : null)}
                    />
                  </motion.div>
                      {
                        silence ? (
                          <motion.p
                            layout
                            key="silent-ringer"
                            layoutId="silent-ringer"
                            initial={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)"}}
                            exit={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
                            transition={{ duration: 0.2 }}
                            className={"ring-content:silence"}
                          >
                            Silent
                          </motion.p> 
                        ) : (
                          <motion.p
                            layout
                            key="ringer-ring"
                            layoutId="ringer-ring"
                            initial={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)"}}
                            exit={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
                            transition={{ duration: 0.2 }}
                            className={"ring-content"}
                          >
                            Ring
                          </motion.p> 
                        )
                      }              
                </motion.div>
              ) : null }
            </AnimatePresence>
            ) 
          }
          </motion.div>
        </motion.div>
        <div className="buttons-container">
          <button 
            onClick={() => {
              setTimerUI(false)
              setHovered(false)
              setSilence(false)
              }
            }
            className="px-4 py-2 border-2 hover:bg-slate-300 rounded-full border-solid border-slate-500"
            >Idle
          </button>
          <button 
            onClick={() => {
              setHovered(true)
              setTimerUI(false)
              setSilence(false)
            }}
            className="px-4 py-2 border-2 hover:bg-slate-300 rounded-full border-solid border-slate-500"
            >Ring
          </button>
          <button 
            onClick={() => {
              setHovered(true)
              setSilence(true)
              setTimerUI(false)
            }}
            className="px-4 py-2 border-2 hover:bg-slate-300 rounded-full border-solid border-slate-500"
            >Silence
          </button>

          <button
            onClick={() => setTimerUI(true)}
            className="px-4 py-2 border-2 rounded-full hover:bg-slate-300 border-solid border-slate-500"
            >Timer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
