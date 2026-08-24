import { Opening } from '@/components/layout/Opening';
import { SiteNav } from '@/components/layout/SiteNav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Personality } from '@/components/sections/Personality';
import { ControlCenter } from '@/components/sections/ControlCenter';
import { Contact } from '@/components/sections/Contact';

/**
 * Long-scroll narrative, in order (see AGENTS.md section 5):
 * 01 Identity, 02 About, 03 Experience, 04 Skills, 05 Projects,
 * 06 Personality, 07 Contact + Footer.
 */
export default function Home() {
  return (
    <>
      <Opening />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Personality />
        <ControlCenter />
        <Contact />
      </main>
    </>
  );
}
