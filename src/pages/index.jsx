import Head from 'next/head'

// import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
// import { Team } from '@/components/Team'
// import { Waitlist } from '@/components/Waitlist'
// import { Introduction } from '@/components/Introduction'
// import { NavBar } from '@/components/NavBar'
// import { Pricing } from '@/components/Pricing'
// import { Resources } from '@/components/Resources'
// import { Features } from '@/components/Features'
// import { Testimonials } from '@/components/Testimonials'
import HCI from '@/components/HCI'

export default function Home() {
  return (
    <>
      <Head>
        <title>WakeNShake - Wake up without snoozing your alarm</title>
        <meta
          name="description"
          content="CSC 211 HCI Website."
        />
      </Head>
      <Hero />
      {/* <Hero /> */}
      {/* <Introduction /> */}
      {/* <NavBar /> */}
      {/* <Features /> */}
      {/* <div className="flex justify-center bg-gradient-to-br from-blue-500 to-blue-800 p-40 text-4xl">
        <h2 className="font-display text-5xl font-extrabold tracking-tight text-white sm:w-3/4 sm:text-6xl md:w-2/3 lg:w-auto">
          Built for people with big dreams
        </h2>
      </div> */}
      <HCI />
      {/* <Pricing /> */}
      {/* <Waitlist /> */}
      {/* <Testimonials /> */}
      {/* <Team /> */}
      {/* <Footer /> */}
    </>
  )
}
