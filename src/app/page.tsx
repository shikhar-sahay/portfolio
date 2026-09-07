import { Opening } from '@/components/layout/Opening';
import { SiteNav } from '@/components/layout/SiteNav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { TransitionStatements } from '@/components/sections/TransitionStatements';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Projects } from '@/components/sections/Projects';
import { Personality } from '@/components/sections/Personality';
import { ControlCenter } from '@/components/sections/ControlCenter';
import { Contact } from '@/components/sections/Contact';

/**
 * Long-scroll narrative, in order (see AGENTS.md section 5):
 * Identity, About, Experience, Toolkit (Skills plus Certifications),
 * Projects, Pieces of Me, Control Center, Contact + Footer.
 */
export default function Home() {
  return (
    <>
      <Opening />
      <SiteNav />
      <main>
        <Hero />
        <TransitionStatements />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Personality />
        <ControlCenter />
        <Contact />
      </main>
    </>
  );
}
