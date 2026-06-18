import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register plugins once for the whole app.
gsap.registerPlugin(useGSAP, ScrollTrigger)

export { gsap, ScrollTrigger, useGSAP }
