import React from 'react';
import Container from './ui/container';
import Image from 'next/image';
import { ALL_FAQ_QUERYResult } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import { ChevronDown } from 'lucide-react';

type FaqProps = {
    allFaq: ALL_FAQ_QUERYResult;
};

const Faq = ({ allFaq }: FaqProps) => {
    return (
        <div className="mt-48 mb-24">
            <Container>
                <div className="grid gap-6">
                    {allFaq.map((faqData) => {
                        const img = faqData.image?.asset ? imageUrl(faqData.image).url() : null;

                        return (
                            <div
                                key={faqData._id}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 w-full md:h-[500px]"
                            >
                                {img && (
                                    <div className="relative w-full h-[300px] md:h-full rounded-md overflow-hidden">
                                        <Image
                                            src={img}
                                            alt={faqData.image?.alt || 'FAQ image'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col justify-between h-[300px] md:h-full">
                                    <div>
                                        <h2 className="mb-8 font-bold tracking-tight text-xl md:text-4xl">
                                            Frequently asked
                                        </h2>
                                        {faqData.items?.map((item, i) => (
                                            <div key={item._key} className="mb-4">
                                                <div className="flex items-center justify-between">
                                                    <div className='flex items-center'>
                                                        <span className="h-10 w-10 font-bold rounded-full bg-neutral-600 flex items-center justify-center mr-4 text-white">
                                                            {i + 1}
                                                        </span>
                                                        <h3 className="text-xl font-semibold mb-1">{item.question}</h3>
                                                    </div>
                                                    <ChevronDown className='text-neutral-700' size={18}/>
                                                </div>
                                                <p className="text-gray-700 mt-4">{item.answer}</p>
                                                <hr className="my-4 border-neutral-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

export default Faq;


