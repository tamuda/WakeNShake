import Link from 'next/link'

import { CheckIcon } from '@/components/CheckIcon'
import { Container } from '@/components/Container'

export function Introduction() {
return (
<section
   id="introduction"
   aria-label="Introduction"
   className="pb-16 pt-20 sm:pb-20 md:pt-36 lg:py-32"
 >
<Container className="text-lg tracking-tight text-slate-700">
<p className="font-display text-4xl font-bold tracking-tight text-slate-900">
WakeNShake - The Alarm Clock That Won't Disturb Your Roommate
</p>
<p className="mt-4">
Say goodbye to traditional alarm clocks that wake up everyone in the room. With WakeNShake, you can set an alarm and insert it into your pillow. When it's time to wake up, it vibrates your pillow and gently wakes you up without disturbing your roommate.
</p>
<p className="mt-4">
With WakeNShake, you can finally wake up on time and start your day with ease.
</p>
<ul role="list" className="mt-8 space-y-3">
{[
'Customizable alarm settings',
'Easy to use mobile app',
'Effective vibration technology',
'Shake to stop alarm feature',
'Comfortable pillow design',
].map((feature) => (
<li key={feature} className="flex">
<CheckIcon className="h-8 w-8 flex-none fill-blue-500" />
<span className="ml-4">{feature}</span>
</li>
))}
</ul>
<p className="mt-8">
Try WakeNShake today and wake up to a better morning!
</p>
<p className="mt-10">
<Link
         href="#features"
         className="text-base font-medium text-blue-600 hover:text-blue-800"
       >
See all the features of WakeNShake{' '}
<span aria-hidden="true">→</span>
</Link>
</p>
</Container>
</section>
)
}



