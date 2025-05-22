import React from 'react';
import Container from './ui/container';
import Button from './ui/button';
import Link from 'next/link';
import { Play } from 'lucide-react';

const Cta = () => {
    return (
        <div className="relative w-full py-16">
            <Container>
                <div className="relative overflow-hidden rounded-lg aspect-video">
                    <video
                        className="w-full h-auto object-cover rounded-lg aspect-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/assets/hero.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Link href="/category/blazers" passHref>
                        <div className="absolute inset-0 bg-black/20 hidden md:flex flex-col justify-end text-white px-6">
                            <div className="flex items-end justify-end mt-10 mr-4">
                                <span className="h-18 w-18 bg-neutral-700 flex items-center justify-center rounded-full border border-orange-400">
                                    <Play size={16} />
                                </span>
                            </div>
                            <div className="ml-4 h-full flex flex-col justify-end">
                                <h1 className="text-3xl md:text-3xl font-bold mb-4">
                                    Signature: Style in Motion
                                </h1>
                                <p className="text-sm md:text-sm max-w-2xl">
                                    Discover fashion that flows with you—timeless cuts,<br /> luxurious feel, effortless confidence.
                                </p>
                                <div>
                                    <Button variant="secondary" className="mt-8 mb-8">
                                        Watch Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Cta;
