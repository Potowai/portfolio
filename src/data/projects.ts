/*
 *  Copyright (c) Your Name <fiolleaua@gmail>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

export interface Project {
  name: string; // The name of the project
  image: string; // URL to the project's image
  technologies: string; // Technologies used in the project
  summary: string; // A brief summary of the project
  description: string; // A detailed description of the project
  repository: string; // Link to the project's repository (GitHub)
  deployment: string; // Link to the project's live deployment
  video: string; // Optional link to a video demonstration
  visible: boolean; // Whether the project is visible or not
}

export const projectList: Project[] = [
  // Add your own projects here! Here are some example templates:
  
  {
    name: 'Your Amazing Project',
    image: '../../images/your-project.png',
    technologies: 'React, TypeScript, Three.js, GSAP',
    summary: 'A brief description of what your project does and why it is awesome.',
    description: 'A more detailed description of your project, its features, and the challenges you solved.',
    repository: 'https://github.com/yourusername/your-project',
    deployment: 'https://your-project.vercel.app/',
    video: '', // Optional: link to demo video
    visible: true,
  },

  {
    name: 'Another Cool Project',
    image: '../../images/another-project.png',
    technologies: 'Next.js, Tailwind CSS, Node.js',
    summary: 'Another project that showcases your skills and creativity.',
    description: 'Detailed explanation of this project purpose and implementation.',
    repository: 'https://github.com/yourusername/another-project',
    deployment: 'https://another-project.netlify.app/',
    video: '',
    visible: true,
  },

  // You can add more projects by copying the template below:
  // {
  //   name: 'Project Name',
  //   image: '../../images/project-image.png',
  //   technologies: 'Tech Stack Used',
  //   summary: 'Brief project description',
  //   description: 'Detailed project description',
  //   repository: 'https://github.com/yourusername/project-repo',
  //   deployment: 'https://your-project-url.com',
  //   video: '', // Optional
  //   visible: true, // Set to false to hide the project
  // },
];

export default projectList;

// EMPTY PROJECT TEMPLATE - Copy this to add new projects:

// {
//   name: "",
//   image: "../../images/",
//   technologies: "",
//   summary: "",
//   description: "",
//   repository: "",
//   deployment: "",
//   video: "",
//   visible: true,
// },