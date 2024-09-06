import Image from 'next/image';
import data from '../data.json'
import { redirect } from 'next/navigation';
import Twitter from './icons/Twitter';
import GitHub from './icons/GitHub';
import Instagram from './icons/Instagram';
import YouTube from './icons/YouTube';
import TikTok from './icons/TikTok';
import LinkCard from './components/LinkCard';
import { JSX } from 'react';

export default async function HomePage() {

  if (!data) {
    // not working yet https://github.com/vercel/next.js/issues/44232
    redirect('https://linktr.ee/selenagomez');
  }

  return (
    <div className="flex items-center flex-col mx-auto w-full justify-center mt-16 px-8">
      <Image
        priority
        className="rounded-full"
        alt={data.name}
        src={data.avatar}
        width={96}
        height={96}
      />
      <h1 className="font-bold mt-4 mb-8 text-xl text-white">{data.name}</h1>
      {data.links.map((link: JSX.IntrinsicAttributes & { href: string; title: string; image?: string; }) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex items-center gap-4 mt-8 text-white">
        {data.socials.map((social: { title: string; href: string; }) => (
          <a
            aria-label={`${social.title} link`}
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.href.includes('twitter') ? (
              <Twitter />
            ) : social.href.includes('github') ? (
              <GitHub />
            ) : social.href.includes('youtube') ? (
              <YouTube />
            ) : social.href.includes('instagram') ? (
              <Instagram />
            ) : social.href.includes('tiktok') ? (
              <TikTok />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
