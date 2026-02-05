export interface Project {
  name: string;
  image: string;
  technologies: string;
  summary: string;
  description: string;
  repository: string;
  deployment: string;
  video: string;
  visible: boolean;
}

export const projectList: Project[] = [
  {
    name: 'Next.js',
    image: '/images/logos/nextjs.svg', // Code visualization
    technologies: 'React Framework, Vercel',
    summary: 'The React Framework for the Web.',
    description: 'Used by some of the world\'s largest companies, Next.js enables you to create high-quality web applications with the power of React components.',
    repository: 'https://github.com/vercel/next.js',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'React',
    image: '/images/logos/react.svg', // Abstract components
    technologies: 'JavaScript, Library, UI',
    summary: 'The library for web and native user interfaces.',
    description: 'React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video.',
    repository: 'https://github.com/facebook/react',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'RainbowKit',
    image: '/images/logos/rainbowkit.png',
    technologies: 'Web3, Wagmi, React',
    summary: 'The best way to connect a wallet.',
    description: 'RainbowKit provides a fast, fun and accessible experience for all users. Easy to customize, built on top of wagmi and viem.',
    repository: 'https://github.com/rainbow-me/rainbowkit',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'Ansible',
    image: '/images/logos/ansible.svg', // Abstract structure
    technologies: 'Python, Automation, IaC',
    summary: 'Radically simple IT automation.',
    description: 'Ansible is an IT automation tool. It can configure systems, deploy software, and orchestrate more advanced IT tasks such as continuous deployments or zero downtime rolling updates.',
    repository: 'https://github.com/ansible/ansible',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'p5.js',
    image: '/images/logos/p5js.svg',
    technologies: 'JavaScript, Creative Coding',
    summary: 'Friendly creative coding for the web.',
    description: 'p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else!',
    repository: 'https://github.com/processing/p5.js',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'Three.js',
    image: '/images/logos/threejs.svg',
    technologies: '3D, WebGL, JavaScript',
    summary: 'JavaScript 3D Library.',
    description: 'The aim of the project is to create an easy to use, lightweight, 3D library with a default WebGL renderer. The library also provides Canvas 2D, SVG and CSS3D renderers.',
    repository: 'https://github.com/mrdoob/three.js',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'Matter.js',
    image: '/images/logos/matterjs.png',
    technologies: 'Physics, 2D, JavaScript',
    summary: '2D rigid body physics engine for the web.',
    description: 'Matter.js is a 2D rigid body physics engine for the web written in JavaScript.',
    repository: 'https://github.com/liabru/matter-js',
    deployment: '',
    video: '',
    visible: true,
  },
  {
    name: 'React Three Fiber',
    image: '/images/logos/r3f.png',
    technologies: 'React, Three.js, Renderer',
    summary: 'React renderer for three.js.',
    description: 'Build your scene declaratively with re-usable, self-contained components that react to state, are interactive out-of-the-box and can tap into React\'s ecosystem.',
    repository: 'https://github.com/pmndrs/react-three-fiber',
    deployment: '',
    video: '',
    visible: true,
  },
];

export default projectList;