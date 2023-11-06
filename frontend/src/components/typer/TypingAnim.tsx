import React from 'react'
import { TypeAnimation } from 'react-type-animation';
 const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'chat with your Bot',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Your own cutomized Chat-gpt',
        2000,
        'Built with open AI',
        1500
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '60px', display: 'inline-block' , color:"white", textShadow:"1px 1px 20px #000"}}
      repeat={Infinity}
    />
  )
}
export default TypingAnim