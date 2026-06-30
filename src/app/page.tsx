import { HomeHero } from '@/components/sections/home/HomeHero/HomeHero';
import { FeaturedWorks } from '@/components/sections/home/FeaturedWorks/FeaturedWorks';
import { HomeContactCTA } from '@/components/sections/home/HomeContactCTA/HomeContactCTA';

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeaturedWorks />
      <HomeContactCTA />
    </>
  );
}
