import './App.css'
import { motion } from 'motion/react'

function App() {
  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
  }

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  }

  const skillBadges = [
    'Design Systems',
    'React',
    'TypeScript',
    'Accessibility',
    'Motion Systems',
    'AI Tooling',
    'CI/CD Automation',
    'JavaScript',
    'React Native',
    'Next.js',
    'Node.js',
    'Python',
    'PHP',
    'Svelte',
    'Django',
    'Symfony',
    'Cypress',
    'Figma',
    'Google Analytics',
  ]

  const skillGroups = [
    {
      title: 'Frontend + Frameworks',
      items: 'React, React Native, TypeScript, JavaScript, Next.js, Svelte, HTML, CSS, SASS, Bootstrap, Bulma',
    },
    {
      title: 'Backend + Data',
      items: 'Node.js, Python, PHP, Django, Symfony, MySQL, CouchDB',
    },
    {
      title: 'Design + UX',
      items: 'Design systems, component APIs, accessibility, motion systems, Figma, Optimizely, Hotjar, Google Analytics, Google Tag Manager, Marketo',
    },
    {
      title: 'Tooling + Delivery',
      items: 'Azure DevOps, CircleCI, Git, Jira, CI/CD automation, release workflows, Storybook-driven validation',
    },
    {
      title: 'Integrations + CMS',
      items: 'Contentful, ModX, WordPress, Zotero, Box, Salesforce, Wistia, Google Translate',
    },
  ]

  const highlights = [
    {
      role: 'Senior UX Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      duration: '2022 - Present',
      points: [
        'Drive development of the Xbox Design System across web, mobile, Windows, and console platforms.',
        'Own and evolve cross-platform component packages for web and mobile, improving consistency, scalability, and developer experience across partner teams.',
        'Partner with design and engineering to translate design intent into production-ready systems and reusable UI architecture.',
        'Improve consistency and accelerate adoption across partner teams through reusable component architecture and tooling.',
        'Define cross-team engineering processes and best practices that strengthen design-to-development alignment and enable scalable design system adoption.',
        'Build demo applications, MCP server infrastructure, and AI-powered agent workflows to improve developer workflows, streamline design system support, and accelerate component adoption.',
        'Establish CI/CD pipelines and automated release workflows using Azure DevOps.',
        'Contribute to motion system development through reusable animation patterns and framework evaluation.',
      ],
    },
    {
      role: 'Senior Front End Engineer',
      company: 'Viome Inc',
      location: 'Bellevue, WA',
      duration: 'Oct 2020 - Jan 2022',
      points: [
        'Developed reusable front-end components for web and native applications using React and React Native.',
        'Spearheaded deployments using CI/CD pipelines and automated the process wherever possible.',
        'Worked closely with product in identifying customer journeys, setting up analytics tools, and iteratively improving experiences.',
        'Paired with backend engineers to build tools and APIs that support various internal and external applications.',
        'Collaborated with marketing on web page builds during the transition from older technology to React and Next.js.',
        'Supported a cross-functional team for internationalization of both the website and web application.',
      ],
    },
    {
      role: 'Full Stack Web Developer',
      company: 'LI-COR Inc.',
      location: 'Lincoln, NE',
      duration: 'Aug 2018 - Jul 2020',
      points: [
        'Iteratively delivered user-centric web application components using React and Svelte to improve customer retention and satisfaction.',
        'Developed and tested top-requested features across firmware and SaaS applications.',
        'Designed and built UI for a software sales e-commerce platform using JavaScript, Python, and Django.',
        'Collaborated with UX to gather customer feedback and deliver wireframes and UI guidance across engineering and marketing.',
        'Used Highcharts and D3.js to create clear, actionable data visualizations.',
        'Built internal APIs and integrated external APIs including Box and Salesforce for biotechnology dashboards.',
        'Created and launched a self-hosted biotechnology blog platform with custom tagging/editor workflows.',
        'Implemented and maintained Google Analytics, Marketo personalization, and Google Tag Manager.',
      ],
    },
    {
      role: 'Front-End Web Developer',
      company: 'LI-COR Inc.',
      location: 'Lincoln, NE',
      duration: 'Oct 2015 - Jul 2018',
      points: [
        'Engineered a web app for visually configuring quotes for complex product systems.',
        'Built a publications search app that ingested Zotero data weekly into a local database using PHP, CouchDB, and JavaScript.',
        'Ensured cross-browser compatibility, SEO, performance, and accessibility across the website.',
        'Built and launched an in-house CMS with PHP, Symfony, and Twig across environmental and biotechnology product lines.',
        'Developed internal tools including a project request system for marketing teams.',
        'Created an automated news update system with WordPress and a custom plugin.',
      ],
    },
  ]

  const projects = [
    {
      title: 'Dynamic Web Pages',
      org: 'LI-COR Biotechnology',
      link: 'https://www.licor.com/bio/reagents/',
      summary: 'Built scalable page generation patterns for large product catalogs with reusable content structures.',
    },
    {
      title: 'Publications Database',
      org: 'LI-COR Biotechnology',
      link: 'https://www.licor.com/bio/publications/',
      summary: 'Delivered an accessible publication discovery experience optimized for fast filtering and search.',
    },
    {
      title: 'Biotechnology Blog Platform',
      org: 'LI-COR Biotechnology',
      link: 'https://www.licor.com/bio/blog/',
      summary: 'Launched a content platform with tagging and editorial workflows for scalable team publishing.',
    },
    {
      title: 'Custom Dashboard',
      org: 'LI-COR Biotechnology',
      link: 'https://www.licor.com/bio/dashboard/',
      summary: 'Created data-forward dashboard interfaces to help customers explore complex domain information.',
    },
    {
      title: 'Viome Products Experience',
      org: 'Viome',
      link: 'https://beta.viome.com/products',
      summary: 'Modernized product presentation and conversion pathways as part of a React migration effort.',
    },
    {
      title: 'PainTile',
      org: 'Personal Project',
      link: 'https://master.dgnxrqolxqpar.amplifyapp.com/',
      summary: 'Built a visual-first portfolio to showcase artwork with a clean, responsive presentation system.',
    },
  ]

  const caseStudies = [
    {
      title: 'Xbox Design System Scale',
      summary:
        'Led component package evolution across platforms, improving consistency and reducing implementation drift across partner teams.',
    },
    {
      title: 'Motion System Foundations',
      summary:
        'Defined reusable motion patterns and framework guidance to balance delight, accessibility, and performance at scale.',
    },
    {
      title: 'AI-Assisted Design System Workflows',
      summary:
        'Introduced MCP-backed tooling and agent-assisted support flows to speed up adoption, troubleshooting, and internal developer onboarding.',
    },
  ]

  return (
    <div className="page">
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
          Harika Yedidi
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
          UX Engineer shaping scalable design systems and AI-ready product experiences.
        </motion.h1>
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          I translate design intent into accessible, production-ready interfaces with reusable
          component architecture, motion systems, and automation that helps teams ship faster.
        </motion.p>
        <motion.div className="cta-row" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45 }}>
          <motion.a
            className="btn btn-primary"
            href="https://www.linkedin.com/in/harikayedidi/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            className="btn"
            href="https://github.com/harikayedidi"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            GitHub
          </motion.a>
        </motion.div>
      </motion.header>

      <motion.section
        className="panel"
        id="about"
        variants={revealUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2>About</h2>
        <p>
          I am a UX Engineer with a strong foundation in frontend engineering, specializing in
          scalable design systems, reusable component architecture, and high-quality user
          experience delivery.
        </p>
      </motion.section>

      <motion.section
        className="panel"
        id="skills"
        variants={revealUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2>Core Skills</h2>
        <motion.div className="badge-grid" variants={fadeIn} initial="initial" whileInView="whileInView" viewport={{ once: true }} transition={{ duration: 0.4 }}>
          {skillBadges.map((skill, index) => (
            <motion.span
              className="badge"
              key={skill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: Math.min(index * 0.02, 0.25) }}
              whileHover={{ y: -2 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <motion.article
              className="skill-group"
              key={group.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.34, delay: Math.min(index * 0.05, 0.2) }}
              whileHover={{ y: -3 }}
            >
              <h3>{group.title}</h3>
              <p>{group.items}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="panel"
        id="experience"
        variants={revealUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2>Experience Timeline</h2>
        <div className="cards">
          {highlights.map((item, index) => (
            <motion.article
              className="card"
              key={item.company + item.role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: Math.min(index * 0.06, 0.24) }}
              whileHover={{ y: -4 }}
            >
              <h3>{item.role}</h3>
              <p className="meta">{item.company} - {item.location}</p>
              <p className="duration">{item.duration}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="panel"
        id="projects"
        variants={revealUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2>Selected Work</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.24) }}
              whileHover={{ y: -4 }}
            >
              <h3>{project.title}</h3>
              <p className="meta">{project.org}</p>
              <p>{project.summary}</p>
              <motion.a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 3 }}
              >
                View project
              </motion.a>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="panel"
        id="case-studies"
        variants={revealUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2>Case Study Summaries</h2>
        <div className="case-list">
          {caseStudies.map((study, index) => (
            <motion.article
              className="case-item"
              key={study.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.2) }}
              whileHover={{ y: -4 }}
            >
              <h3>{study.title}</h3>
              <p>{study.summary}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        Modern portfolio rebuild in progress.
      </motion.footer>
    </div>
  )
}

export default App
