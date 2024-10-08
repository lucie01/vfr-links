'use client';  // This directive makes the file a Client Component

import Image from 'next/image';
import Twitter from './icons/Twitter';
import GitHub from './icons/GitHub';
import Instagram from './icons/Instagram';
import YouTube from './icons/YouTube';
import TikTok from './icons/TikTok';
import LinkCard from './components/LinkCard';
import { Data } from './interfaces/Data';
import { Link } from './interfaces/Link';
import { Social } from './interfaces/Social';
import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';

export default function HomePage() {
  const [data, setData] = useState<Data | null>(null); // State for fetched data
  const [error, setError] = useState<string | null>(null); // State for errors

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      const apiUrl = 'https://vfrota-995250867468.europe-west1.run.app/items/' + process.env.NEXT_PUBLIC_PROJECT_ID;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: Data = await response.json(); // Type the response as `Data`
        setData(result);
      } catch (error: unknown) {
        console.error('Error fetching data:', error);
        // Type narrowing to handle error safely
        if (error instanceof Error) {
          setError('Failed to fetch data: ' + error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
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
      {data.links.map((link: Link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex items-center gap-4 mt-8 text-white">
        {data.socials.map((social: Social) => (
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
      <Footer />
    </div>
  );
}
