import React from 'react'
import { ALL_TESTIMONIALS_QUERYResult } from '../../sanity.types'
import Container from './ui/container'
import { imageUrl } from '@/lib/imageUrl'
import Image from 'next/image'
import TestimonialCard from './ui/testimonial_card'

type TestimonialsProps = {
  testimonials: ALL_TESTIMONIALS_QUERYResult
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <div className="my-48">
      <Container>
        <div className="relative">
          <div className="flex flex-col justify-center mb-8">
            <h2 className="text-2xl mt-6 text-center font-bold md:text-3xl">
              Testimonials
            </h2>
          </div>

          <div className="group overflow-x-hidden mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-slide group-hover:[animation-play-state:paused] gap-4">
              {[...testimonials, ...testimonials].map((testimonial, index) => {
                const img = testimonial.image?.asset
                  ? imageUrl(testimonial.image).url()
                  : null

                const socialIcon = testimonial.socialImage?.asset
                  ? imageUrl(testimonial.socialImage).url()
                  : null

                return (
                  <TestimonialCard
                    key={index}
                    title="Collaboration"
                    className="flex-shrink-0 w-[320px] md:w-[400px] p-6 md:p-8"
                    description={testimonial.testimonial || ''}
                    testimonial={testimonial.testimonial}
                  >
                    <div className="flex items-center gap-12">
                      <div className="relative">
                        {socialIcon && (
                          <span className="flex items-center justify-center bg-white size-14 rounded-full absolute left-20 top-16">
                            <Image
                              src={socialIcon}
                              alt="Social Icon"
                              height={48}
                              width={48}
                              className="w-8 h-8"
                            />
                          </span>
                        )}
                        {img && (
                          <Image
                            src={img}
                            alt={testimonial.image?.alt || 'testimonial image'}
                            height={800}
                            width={800}
                            className="size-24 ml-4 mt-4 rounded-full object-cover border-4 border-white"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium">{testimonial.name}</h3>
                        <p className="text-sm text-gray-700">{testimonial.socialHandle}</p>
                      </div>
                    </div>
                  </TestimonialCard>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Testimonials
