import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Expandable } from '@/components/Expandable'
import avatarImage3 from '@/images/avatars/avatar-3.png'
import avatarImage4 from '@/images/avatars/avatar-4.png'
import avatarImage5 from '@/images/avatars/avatar-5.png'
import avatarImage6 from '@/images/avatars/avatar-6.png'
import avatarImage7 from '@/images/avatars/avatar-7.png'
import avatarImage8 from '@/images/avatars/avatar-8.png'
import avatarImage9 from '@/images/avatars/avatar-9.png'
import avatarImage10 from '@/images/avatars/avatar-10.png'
import avatarImage11 from '@/images/avatars/avatar-11.png'

const testimonials = [
  [
    {
      content:
        "I struggle with getting up in the morning and don't want to disturb my partner. I'd love to have an alarm clock that vibrates just my pillow, so I can wake up peacefully and start my day off right.",
      author: {
        name: 'Emily T.',
        role: 'Morning Person',
      },
    },
    {
      content:
        "As a college student living in a dorm, I often have to wake up at different times than my roommate. It's frustrating to have to use an alarm that wakes us both up. A vibrating alarm clock for just me would be a lifesaver!",
      author: {
        name: 'Ryan L.',
        role: 'College Freshman',
      },
    },
    {
      content:
        "I've tried using phone alarms, but they're not effective for me. I need something that will physically wake me up. A vibrating alarm clock seems like a great solution.",
      author: {
        name: 'Sarah K.',
        role: 'Heavy Sleeper',
      },
    },
  ],
  [
    {
      content:
        'I love the idea of a vibrating alarm clock because I have trouble waking up to sound alone. I also think it would be a great option for people who are hard of hearing.',
      author: {
        name: 'John M.',
        role: 'Night Shift Worker',
      },
    },
    {
      content:
        "As a working professional, I don't want to wake up my partner with a loud alarm. A vibrating alarm clock would be a perfect solution for me.",
      author: {
        name: 'Emily T.',
        role: 'Working Professional',
      },
    },
    {
      content:
        "As a college student living in a dorm, I often have to wake up at different times than my roommate. It's frustrating to have to use an alarm that wakes us both up. A vibrating alarm clock for just me would be a lifesaver!",
      author: {
        name: 'Ryan L.',
        role: 'College Student',
      },
    },
  ],
  [
    {
      content:
        "I've tried using phone alarms, but they're not effective for me. I need something that will physically wake me up. A vibrating alarm clock seems like a great solution.",
      author: {
        name: 'Sarah K.',
        role: 'Working Professional',
      },
    },
    {
      content:
        'As a retiree, I have trouble waking up early but need to for my daily routine. A vibrating alarm clock would be a perfect way to wake up without disturbing my partner.',
      author: {
        name: 'John M.',
        role: 'Retiree',
      },
    },
    {
      content:
        'As someone who has trouble sleeping, I think a vibrating alarm clock could help me wake up feeling more refreshed and ready to tackle the day.',
      author: {
        name: 'Rachel P.',
        role: 'Working Professional',
      },
    },
  ],
  [
    {
      content:
        "I've never been a morning person, but I have to get up early for work. A vibrating alarm clock that wakes me up gently would be a game changer.",
      author: {
        name: 'Mark S.',
        role: 'Working Professional',
      },
    },
  ],
  [
    {
      content:
        'As a stay-at-home parent, I need to wake up early to take care of my kids. A vibrating alarm clock could help me get up and start my day without waking up my family.',
      author: {
        name: 'Amanda H.',
        role: 'Stay-at-Home Parent',
      },
    },
  ],
  [
    {
      content:
        "I'm deaf and have been looking for an alarm clock that will wake me up without relying on sound. A vibrating alarm clock is exactly what I need!",
      author: {
        name: 'Michael G.',
        role: 'Student',
      },
    },
  ],
]

function Testimonial({ author, children }) {
  return (
    <figure className="rounded-4xl p-8 shadow-md ring-1 ring-slate-900/5">
      <blockquote>
        <p className="text-lg tracking-tight text-slate-900 before:content-['“'] after:content-['”']">
          {children}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center">
        <div className="overflow-hidden rounded-full bg-slate-50">
          <Image
            className="h-12 w-12 object-cover"
            src={author.image}
            alt=""
            width={48}
            height={48}
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium leading-6 tracking-tight text-slate-900">
            {author.name}
          </div>
          <div className="mt-1 text-sm text-slate-600">{author.role}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="py-8 sm:py-10 lg:py-16">
      <Container className="text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">
          Some words from our potential customers...
        </h2>
        <p className="mt-4 text-lg tracking-tight text-slate-600">
          We interviewed a diverse group of Students to hear their concerns
          regarding waking up and thoughts about a vibrating alarm device.
        </p>
      </Container>
      <Expandable>
        {({ isExpanded }) => (
          <>
            <ul
              role="list"
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8"
            >
              {testimonials
                .map((column) => column[0])
                .map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex} className="lg:hidden">
                    <Testimonial author={testimonial.author}>
                      {testimonial.content}
                    </Testimonial>
                  </li>
                ))}
              {testimonials.map((column, columnIndex) => (
                <li
                  key={columnIndex}
                  className={isExpanded ? undefined : 'hidden lg:list-item'}
                >
                  <ul role="list">
                    {column
                      .slice(0, isExpanded ? undefined : 2)
                      .map((testimonial, testimonialIndex) => (
                        <li
                          key={testimonialIndex}
                          className={clsx(
                            testimonialIndex === 0 && 'hidden lg:list-item',
                            testimonialIndex === 1 && 'lg:mt-8',
                            testimonialIndex > 1 && 'mt-8'
                          )}
                        >
                          <Testimonial author={testimonial.author}>
                            {testimonial.content}
                          </Testimonial>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
            <Expandable.Button>Read more testimonials</Expandable.Button>
          </>
        )}
      </Expandable>
    </section>
  )
}
