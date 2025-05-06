import Head from 'next/head'
import HCI from '@/components/HCI'
import { Hero } from '@/components/Hero'

export default function HCIPage() {
  return (
    <>
      <Head>
        <title>HCI Project - WakeNShake</title>
        <meta name="description" content="Human-Computer Interaction project details" />
      </Head>
      <Hero />
      <HCI />
    </>
  )
}
