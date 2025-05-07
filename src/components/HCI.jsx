import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

export default function HCI() {
  return (
    <section
      id="hci"
      aria-labelledby="hci-title"
      className="scroll-mt-14 pb-16 pt-20 sm:scroll-mt-32 sm:pb-20 md:pt-36 lg:py-32"
    >
      <Container size="lg" className="text-lg tracking-tight text-slate-700">
        <SectionHeading number="1" id="hci-title">
            Project Description
        </SectionHeading>
        <p className="mt-6 text-lg text-slate-700">
            Our project, <strong>WakeNShake</strong>, addresses the common challenge of users repeatedly snoozing or ignoring alarms, leading to oversleeping and disrupted routines.
            Traditional alarms often fail to keep users awake after the initial ring, especially for heavy sleepers.
            We designed an alarm app that enforces both physical movement and mental engagement to ensure users wake up and stay awake.
            Through a user-centered design process, we conducted interviews with college students, identified key pain points, and iteratively developed and tested solutions. With this data we were able to produce a fully functional prototype.
        </p>
       </Container>


      {/* Prototypes */}
      <Container size="lg" className="mt-24">
        <SectionHeading number="2" id="prototypes-title">
          Prototypes
        </SectionHeading>

        <h3 className="mt-8 text-xl font-semibold text-slate-800">Low-Fidelity Prototypes</h3>
        <div className="mt-6 grid grid-cols-1 gap-6">
            {/* First row with images 1 and 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Image
                key="lofi-prototype-1"
                src="/images/lofi-prototype-1.png"
                alt="Low-Fidelity Screen 1"
                width={425}
                height={575}
                className="rounded-xl border shadow-md object-contain"
                />
                <Image
                key="lofi-prototype-2"
                src="/images/lofi-prototype-2.png"
                alt="Low-Fidelity Screen 2"
                width={495}
                height={575}
                className="rounded-xl border shadow-md object-contain"
                />
            </div>
            
            {/* Second row with just image 3 */}
            <div className="mx-auto">
                <Image
                key="lofi-prototype-3"
                src="/images/lofi-prototype-3.png"
                alt="Low-Fidelity Screen 3"
                width={575}
                height={725}
                className="rounded-xl border shadow-md object-contain"
                />
            </div>
            
            {/* Third row with images 4 and 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Image
                key="lofi-prototype-4"
                src="/images/lofi-prototype-4.png"
                alt="Low-Fidelity Screen 4"
                width={425}
                height={575}
                className="rounded-xl border shadow-md object-contain"
                />
                <Image
                key="lofi-prototype-5"
                src="/images/lofi-prototype-5.png"
                alt="Low-Fidelity Screen 5"
                width={425}
                height={575}
                className="rounded-xl border shadow-md object-contain"
                />
            </div>
        </div>

        <h3 className="mt-16 text-xl font-semibold text-slate-800">Working Prototype Use Cases</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-.25">
          {['case-1', 'case-2', 'case-3'].map((img) => (
            <Image
              key={img}
              src={`/images/${img}.png`}
              alt={`Working Prototype ${img}`}
              width={235}
              height={335}
              className="rounded-xl border shadow-md object-contain"
            />
          ))}
        </div>
      </Container>

      {/* Demo Video */}
      <Container size="lg" className="mt-24">
        <SectionHeading number="3" id="demo-video-title">
          Demo Video
        </SectionHeading>
        <div className="mt-6 aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/HtkZPGZLzF0"
            title="Demo Video of WakeNShake"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </Container>

      {/* Evaluation Results */}
      <Container size="lg" className="mt-24">
        <SectionHeading number="4" id="evaluation-title">
          Evaluation Highlights
        </SectionHeading>

        <p className="mt-6 max-w-3xl text-slate-600 text-lg">
          After usability testing with 10 diverse college students, we evaluated WakeNShake based on effectiveness, efficiency, and satisfaction. The following insights reflect both quantitative data and user feedback.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {['results-3', 'results-8', 'results-9', 'results-11', 'results-10', 'results-6'].map((img) => (
            <Image
              key={img}
              src={`/images/${img}.png`}
              alt={`Survey Result ${img}`}
              width={800}
              height={700}
              className="rounded-xl border shadow-md object-contain"
            />
          ))}
        </div>

        <ul className="mt-10 space-y-4 text-lg text-slate-700 list-disc pl-5">
          <li>
            All participants successfully set alarms and navigated both the shake and puzzle dismiss methods without prior instructions, scoring the app 4.8/5 on ease of use.
          </li>
          <li>
            The shake-to-dismiss feature proved most effective, receiving a 4.6/5 average rating in helping users stay awake and avoid snoozing.
          </li>
          <li>
            80% of users favored the shake method over the puzzle challenge, citing its physical interaction as more stimulating during wake-up.
          </li>
          <li>
            The average likelihood of incorporating WakeNShake into daily routines was 4.1/5, and recommend-to-a-friend scored 3.7/5.
          </li>
          <li>
            Users praised the layered wake-up approach (shake + mental task), as well as the ability to personalize alarms.
          </li>
          <li>
            Suggestions for future improvements included more personalization (e.g., alarm tones, motivational quotes), smoother animations, and analytics for user habits.
          </li>
        </ul>
      </Container>
    </section>
  )
}
