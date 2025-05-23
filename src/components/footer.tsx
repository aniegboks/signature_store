import React from 'react';
import Link from 'next/link';
import Container from './ui/container';
import Image from 'next/image';
import { RevealAnimation } from '@/utils/reveal_animation';
import { contactNav, nav, dataNav } from '@/utils';


const Footer = async () => {
  return (
    <footer className="py-8">
      <div>
        <Container>
          <hr className="text-neutral-300" />
          <RevealAnimation>
            <div>
              <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 pt-24 pb-8 px-4">
                {/* Left section */}
                <div>
                  <Link href="/" className="text-2xl font-heading font-bold text-orange-500">
                    {`Signature`}
                  </Link>
                  <div className="mt-2">
                    <p className='font-heading text-sm text-neutral-700'>
                      Signature is your go-to destination for premium Apparels. offering an unparalleled selection, <br />
                      exclusive drops, and expert guidance to elevate your sneaker game.
                    </p>
                  </div>
                </div>

                {/* Right section */}
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
                  <div>
                    {contactNav.map(({ name, label }, index) => (
                      <span key={index}
                        className='flex lg:justify-end md:justify-start sm:justify-start text-sm font-heading'>
                        <Link
                          href={label}
                          className="block mb-4 text-sm"
                        >
                          {name}
                        </Link>
                      </span>
                    ))}
                  </div>
                  <div>

                    {nav.map(({ name, label }, index) => (
                      <span key={index} className='flex lg:justify-end md:justify-start sm:justify-start text-sm font-heading'>
                        <Link
                          href={label}
                          className="block mb-4 text-sm"
                        >
                          {name}
                        </Link>
                      </span>
                    ))}
                  </div>
                  <div>
                    {dataNav.map(({ name, label }, index) => (
                      <span key={index}
                        className='flex lg:justify-end md:justify-start sm:justify-start text-sm font-heading'>
                        <Link
                          href={label}
                          className="block mb-4 text-sm"
                        >
                          {name}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="text-neutral-300" />

              {/* Footer bottom section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="font-heading italic text-sm">
                  © {new Date().getFullYear()}
                  <span className="mx-2 text-sm">Signature Inc. All rights reserved</span>
                </div>
                <div className="flex sm:justify-end gap-4">
                  <Link href="https://www.x.com/">
                    <Image
                      src="/assets/icons/x.svg"
                      alt='x'
                      height={16}
                      width={16}
                      className='object-cover'
                    />
                  </Link>
                  <Link href="https://www.instagram.com/">
                    <Image
                      src="/assets/icons/instagram.svg"
                      alt='instagram'
                      height={16}
                      width={16}
                      className='object-cover'
                    />
                  </Link>
                  <Link href="https://www.linkedin.com/">
                    <Image
                      src="/assets/icons/linkedin.svg"
                      alt='linkedin'
                      height={16}
                      width={16}
                      className='object-cover'
                    />
                  </Link>
                  <Link href="https://www.threads.com/">
                    <Image
                      src="/assets/icons/threads.svg"
                      alt='threads'
                      height={16}
                      width={16}
                      className='object-cover'
                    />
                  </Link>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </Container>
      </div>

      <div className="">
      </div>
    </footer>
  );
};

export default Footer;