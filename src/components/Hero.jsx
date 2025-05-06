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
              <h1 className="text-6xl font-bold tracking-tight sm:mt-10 sm:text-7xl">
                <span className="bg-gradient-to-br from-blue-400 to-blue-800 bg-clip-text text-transparent">
                  WakeNShake:
                </span>
              </h1>
              <h2 className="text-3xl font-bold tracking-tight mt-4 sm:text-5xl">
                <span className="bg-gradient-to-br from-blue-400 to-blue-800 bg-clip-text text-transparent">
                  A gentle buzz to wake you and a gentle shake to stop it
                </span>
              </h2>

              <p className="mt-6 text-xl leading-8 text-white">
                Get up and get going with Wake n Shake - the alarm clock that
                will ensure you won't snooze your alarm again. Simply set up the alarm on the app and it will
                vibrate to wake you.
              </p>

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