import { EditorialHero } from '@/components/sections/home/EditorialHero/EditorialHero';
import { HomeManifesto } from '@/components/sections/home/HomeManifesto/HomeManifesto';
import { HomeCapabilities } from '@/components/sections/home/HomeCapabilities/HomeCapabilities';
import { HomeSelectedWork } from '@/components/sections/home/HomeSelectedWork/HomeSelectedWork';
import { HomeContact } from '@/components/sections/home/HomeContact/HomeContact';

export default function Home() {
  return (
    <>
      <EditorialHero />
      <HomeManifesto />
      <HomeCapabilities />
      <HomeSelectedWork />
      <HomeContact />
    </>
  );
}
