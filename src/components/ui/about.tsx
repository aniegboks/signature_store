import { RevealAnimation } from '@/utils/reveal_animation'
import Container from './container'
import React from 'react'

const About = () => {
    return (
        <div className='mt-24'>
            <RevealAnimation>
                <Container>
                    <div className='pt-24'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className='text-2xl md:text-4xl font-heading leading-tight tracking-tight mb-4 font-bold'>Superiority</h3>
                                <p className='text-sm max-w-full text-neutral-700 font-heading' style={{ maxWidth: '800px' }}
                                >
                                    In a world saturated with fashion choices, Signature rises above the rest as a symbol of refined style,
                                    premium craftsmanship, and a commitment to delivering an exceptional wearing experience.
                                    From the quality of our materials to the distinctiveness of our brand identity,
                                    there are compelling reasons why Signature is the preferred choice for those who value both elegance and authenticity in their wardrobe.


                                </p>
                            </div>
                            <div className='text-start md:text-left flex justify-end'>
                                <p className="text-sm max-w-full text-neutral-700 font-heading"
                                    style={{ maxWidth: '800px' }}>
                                    One of the key reasons to choose Signature is its premium quality.
                                    Crafted with the finest fabrics and meticulous attention to detail,
                                    Signature delivers a refined and elevated wearing experience that leaves a lasting impression.
                                    Unlike mass-produced clothing that often compromises on quality for scale,
                                    Signature is designed with sophistication at its core. Every piece reflects careful craftsmanship and material selection,
                                    ensuring that each wear feels purposeful and distinctive.
                                    This unwavering commitment to quality makes Signature not just apparel,
                                    but a statement of excellence in a crowded fashion landscape.
                                </p>
                            </div>
                        </div>

                    </div>
                </Container>
            </RevealAnimation>
        </div>
    )
}

export default About