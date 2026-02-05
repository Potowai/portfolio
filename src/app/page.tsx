import BentoGrid from './components/grid/BentoGrid';
import Tile from './components/grid/Tile';
import HeroScene from './components/three/HeroScene';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiThreedotjs, SiGithub, SiLinkedin, SiAngular, SiSpringboot, SiMysql, SiPostgresql, SiMongodb, SiGit } from 'react-icons/si';
import LogoLoop from './components/react-bits/LogoLoop';

import Aurora from './components/react-bits/Aurora';
import { textsInto } from './data/texts';
import InfiniteMenu from './components/react-bits/InfiniteMenu';
import { projectList } from './data/projects';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#111] text-black dark:text-white font-sans selection:bg-purple-200 dark:selection:bg-purple-900 relative">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Aurora colorStops={["#2b00ff", "#00ccff", "#2b00ff"]} speed={0.5} />
            </div>
            <div className="relative z-10">
                <BentoGrid>
                    {/* HERO TILE (Danny Duck) */}
                    <Tile className="md:col-span-2 md:row-span-2 min-h-[300px]" id="hero-tile">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            {/* 3D Scene */}
                            <div className="w-full h-full">
                                <HeroScene />
                            </div>
                        </div>
                    </Tile>

                    {/* BIO TILE */}
                    <Tile className="md:col-span-1 md:row-span-2 p-8 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold tracking-tighter mb-4">
                            HEY, I'M ALEXIS.
                        </h1>
                        <div className="text-lg leading-relaxed opacity-80" dangerouslySetInnerHTML={{ __html: textsInto[1] }} />
                    </Tile>

                    {/* STACK TILE (LogoLoop) */}
                    <Tile className="md:col-span-1 md:row-span-1 p-0 overflow-hidden flex items-center bg-white dark:bg-black">
                        <LogoLoop
                            logos={[
                                { node: <SiReact className="text-blue-400" />, title: "React" },
                                { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js" },
                                { node: <SiTypescript className="text-blue-600" />, title: "TypeScript" },
                                { node: <SiTailwindcss className="text-cyan-400" />, title: "Tailwind" },
                                { node: <SiThreedotjs className="text-gray-600" />, title: "Three.js" },
                                { node: <SiAngular className="text-red-500" />, title: "Angular" },
                                { node: <SiSpringboot className="text-green-500" />, title: "Spring Boot" },
                                { node: <SiMysql className="text-blue-500" />, title: "MySQL" },
                                { node: <SiPostgresql className="text-blue-500" />, title: "PostgreSQL" },
                                { node: <SiMongodb className="text-green-500" />, title: "MongoDB" },
                                { node: <SiGit className="text-red-500" />, title: "Git" },
                            ]}
                            speed={50}
                            logoHeight={40}
                            gap={30}
                            direction="left"
                        />
                    </Tile>

                    {/* SOCIAL TILE (Glassmorphism) */}
                    <Tile className="md:col-span-1 md:row-span-1 p-0 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 text-gray-900 dark:text-gray-100 group relative overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-sm">
                        <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Connect</h2>
                                <div className="flex items-center gap-2 mt-2 opacity-80">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <p className="text-sm font-medium">Open for work</p>
                                </div>
                            </div>
                            <div className="flex gap-6 text-3xl">
                                <a href="https://github.com/Potowai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><SiGithub /></a>
                                <a href="https://www.linkedin.com/in/alexis-fiolleau/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><SiLinkedin /></a>
                            </div>
                        </div>
                    </Tile>



                    {/* PROJECTS TILE */}
                    <Tile className="md:col-span-4 md:row-span-1 p-0 border-none bg-transparent shadow-none">
                        <div className="p-8 h-full bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-[24px]">
                            <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Work</h2>

                            <div className='flex items-center justify-center'   >

                                <div className="h-auto w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden relative">
                                    <InfiniteMenu
                                        items={projectList.map(project => ({
                                            image: project.image,
                                            link: project.repository || project.deployment || '#',
                                            title: project.name,
                                            description: project.description
                                        }))}
                                    />
                                </div>

                            </div>
                        </div>
                    </Tile>
                </BentoGrid>
            </div>
        </main >
    );
}
