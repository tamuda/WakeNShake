import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative bg-black md:pt-10">
      <div className="mx-auto max-w-7xl justify-center lg:min-h-screen">
        <div className="flex lg:hidden">
          <div className="h-full w-full">
            <Image
              className="h-full bg-gray-50 object-cover"
              src="/images/vibration.gif"
              fill
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
              alt=""
            />
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className=" z-10 px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight sm:mt-10 sm:mt-10 sm:text-6xl lg:mt-24">
                <span className="bg-gradient-to-br from-blue-400 to-blue-800 bg-clip-text text-transparent">
                  A gentle buzz to wake you and a gentle shake to stop it
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-white">
                Get up and get going with Wake n Shake - the alarm clock that
                won't disturb your roommates. Put it in your pillow, and it will
                vibrate to wake you.
              </p>

              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#waitlist"
                  className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Join Waitlist
                </a>

                <a
                  href="#features"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-0 lg:col-span-5 lg:col-start-8 lg:-mr-8 lg:block xl:absolute xl:inset-0 xl:left-1/3 xl:mr-0">
            <Image
              className="hidden h-full bg-gray-50 object-cover lg:inset-0 lg:block lg:aspect-auto lg:w-full"
              src="/images/vibration.gif"
              fill
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
