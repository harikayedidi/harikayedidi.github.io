import './App.css'
import { AnimatePresence, motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

function App() {
  const [mode, setMode] = useState('console')
  const [activeMenu, setActiveMenu] = useState('About')
  const [expandedCard, setExpandedCard] = useState(null)
  const [selectedRoadIndex, setSelectedRoadIndex] = useState(0)
  const roadBoardRef = useRef(null)
  const roadStopRefs = useRef([])
  const [roadCarTop, setRoadCarTop] = useState(0)

  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
  }

  const consoleStats = [
    { label: 'Profile', value: 'Harika Yedidi' },
    { label: 'Role', value: 'Senior UX Engineer' },
    { label: 'XP', value: '10+ Years' },
    { label: 'Current Focus', value: 'Xbox Design System' },
  ]

  const menuCards = [
    {
      title: 'About',
      text: 'Who I am and how I approach product and systems work.',
    },
    {
      title: 'Skills',
      text: 'Core technical capabilities and system design strengths.',
    },
    {
      title: 'Experience',
      text: 'Professional timeline across Microsoft, Viome, and LI-COR.',
    },
    {
      title: 'Highlighted Work',
      text: 'Case-study style snapshots of high-impact initiatives.',
    },
  ]

  const menuDetails = {
    About: [
      'UX Engineer with strong frontend engineering foundations and over a decade of product experience.',
      'Focused on translating design intent into scalable, accessible, production-ready interfaces.',
      'Works at the intersection of systems thinking, design quality, and developer experience.',
    ],
    Skills: [
      'Design systems, component architecture, and cross-platform package strategy.',
      'React, TypeScript, React Native, Next.js, and modern frontend workflows.',
      'Motion systems, accessibility, CI/CD automation, and AI-supported team tooling.',
    ],
    Experience: [
      'Microsoft: Lead Xbox Design System work across web, mobile, Windows, and console to strengthen consistency and adoption at scale.',
      'Viome: Built reusable app architecture, improved delivery automation, and partnered closely with product and engineering teams.',
      'LI-COR: Delivered full-stack experiences spanning data visualization, API integrations, and CMS-driven product platforms.',
    ],
    'Highlighted Work': [
      'Xbox Design System scale and adoption strategy.',
      'Motion system foundations with accessibility and performance guardrails.',
      'AI-assisted internal support workflows using MCP infrastructure.',
    ],
  }

  const experience = [
    {
      role: 'Senior UX Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      duration: '2022 - Present',
      highlights: [
        'Drive development of the Xbox Design System across web, mobile, Windows, and console platforms.',
        'Own and evolve cross-platform component packages for web and mobile, improving consistency, scalability, and developer experience across partner teams.',
        'Partner with design and engineering to translate design intent into production-ready systems and reusable UI architecture.',
        'Improved consistency and accelerated adoption across partner teams through reusable component architecture and tooling.',
        'Define cross-team engineering processes and best practices that strengthen design-to-development alignment and enable scalable design system adoption.',
        'Built demo applications, MCP server infrastructure, and AI-powered agent workflows to improve developer workflows, streamline design system support, and accelerate component adoption.',
        'Established CI/CD pipelines and automated release workflows using Azure DevOps.',
        'Contribute to motion system development through reusable animation patterns and framework evaluation.',
      ],
    },
    {
      role: 'Senior Front End Engineer',
      company: 'Viome Inc',
      location: 'Bellevue, WA',
      duration: 'Oct 2020 - Jan 2022',
      highlights: [
        'Developed reusable front-end components for web and native applications using React and React Native.',
        'Spearheaded deployments using CI/CD pipelines and improved release reliability through automation.',
        'Collaborated with product and backend teams to ship customer-facing tools and internationalized web experiences.',
      ],
    },
    {
      role: 'Full Stack Web Developer',
      company: 'LI-COR Inc.',
      location: 'Lincoln, NE',
      duration: 'Aug 2018 - Jul 2020',
      highlights: [
        'Delivered customer-centric React and Svelte components across SaaS and firmware ecosystems.',
        'Designed and built software sales e-commerce UI using JavaScript, Python, and Django.',
        'Built internal and external API integrations and launched a custom biotech blog platform.',
      ],
    },
    {
      role: 'Front-End Web Developer',
      company: 'LI-COR Inc.',
      location: 'Lincoln, NE',
      duration: 'Oct 2015 - Jul 2018',
      highlights: [
        'Built complex product configuration and publication search web applications.',
        'Ensured cross-browser compatibility, SEO, performance, and accessibility standards.',
        'Created internal CMS and tooling with PHP, Symfony, Twig, and WordPress.',
      ],
    },
  ]

  const roadExperience = [...experience].reverse()

  useLayoutEffect(() => {
    const updateRoadCarPosition = () => {
      const board = roadBoardRef.current
      const stop = roadStopRefs.current[selectedRoadIndex]

      if (!board || !stop) {
        return
      }

      const boardRect = board.getBoundingClientRect()
      const stopRect = stop.getBoundingClientRect()
      const top = stopRect.top - boardRect.top + 6

      setRoadCarTop(top)
    }

    updateRoadCarPosition()

    window.addEventListener('resize', updateRoadCarPosition)
    return () => window.removeEventListener('resize', updateRoadCarPosition)
  }, [selectedRoadIndex, mode])

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
      title: 'Viome Products Experience',
      org: 'Viome',
      link: 'https://beta.viome.com/products',
      summary: 'Modernized product presentation and conversion pathways as part of a React migration effort.',
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
    <div className={`page mode-${mode}`}>
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mode-toggle" role="tablist" aria-label="View mode">
          <button
            type="button"
            className={mode === 'console' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('console')}
          >
            Explorer View
          </button>
          <button
            type="button"
            className={mode === 'resume' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('resume')}
          >
            Resume Mode
          </button>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
          Harika Yedidi
        </motion.h1>
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          {mode === 'console'
            ? 'Explore my software engineering journey across design systems, frontend architecture, and measurable product impact.'
            : 'Resume view with structured experience, technical strengths, and key work highlights.'}
        </motion.p>
        <div className="hud">
          {consoleStats.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="hud-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
            >
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </motion.article>
          ))}
        </div>
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

      {mode === 'console' ? (
        <>
          <motion.section
            className="panel panel-console"
            id="menu"
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>Main Menu</h2>
            <div className="menu-grid">
              {menuCards.map((card, index) => (
                <motion.button
                  type="button"
                  className={activeMenu === card.title ? 'menu-card is-active' : 'menu-card'}
                  key={card.title}
                  onClick={() => setActiveMenu(card.title)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.34, delay: Math.min(index * 0.06, 0.24) }}
                  whileHover={{ y: -5 }}
                >
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.article
                key={activeMenu}
                className="menu-expand-panel"
                initial={{ opacity: 0, height: 0, y: 8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <h3>{activeMenu}</h3>
                <ul>
                  {menuDetails[activeMenu].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </motion.section>

          <motion.section
            className="panel"
            id="campaign"
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>Career Roadmap</h2>
            <div className="road-board" ref={roadBoardRef}>
              <svg className="road-path" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 210 110 C 130 110, 130 290, 210 290 C 290 290, 290 430, 210 430 C 130 430, 130 610, 210 610 C 290 610, 290 750, 210 750"
                />
              </svg>
              <motion.div
                className="road-car"
                animate={{ top: roadCarTop }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                style={{}}
              >
                <span className="road-car-icon">🚗</span>
              </motion.div>
              <div className="road-column">
                {roadExperience.map((item, index) => (
                  <motion.article
                    className={selectedRoadIndex === index ? 'timeline-card road-stop is-open' : 'timeline-card road-stop'}
                    key={`road-${item.company}-${item.role}`}
                    ref={(element) => {
                      roadStopRefs.current[index] = element
                    }}
                    onClick={() => setSelectedRoadIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelectedRoadIndex(index)
                      }
                    }}
                    tabIndex={0}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.2) }}
                    whileHover={{ y: -4, scale: 1.005 }}
                  >
                    <p className="road-label">Mile Marker {String(index + 1).padStart(2, '0')}</p>
                    <h3>{item.role}</h3>
                    <p className="meta">{item.company} - {item.location}</p>
                    <p className="duration">{item.duration}</p>
                    <AnimatePresence initial={false} mode="wait">
                      {selectedRoadIndex === index ? (
                        <motion.ul
                          key="expanded"
                          className="snapshot-points"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          {item.highlights.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </motion.ul>
                      ) : (
                        <motion.p
                          key="collapsed"
                          className="snapshot-preview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          Next stop: {item.highlights[0]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span className="sr-only" aria-live="polite">
                      {selectedRoadIndex === index ? 'Parked here' : 'Click to park the car here'}
                    </span>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        </>
      ) : (
        <>
          <motion.section
            className="panel"
            id="summary"
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>About</h2>
            <p>I’m a UX Engineer with a strong foundation in frontend engineering, specializing in building scalable design systems, reusable component architectures, and high-quality user experiences.</p>
            <p>At Microsoft, I contribute to the Xbox Design System, where I’ve built flexible React components using patterns like compound components to enable composability and consistency across platforms.</p>
            <p>Beyond implementation, I focus on system thinking and scale, improving design-to-code alignment and enabling teams to adopt and extend design system foundations effectively.</p>
          </motion.section>

          <motion.section
            className="panel"
            id="skills"
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>Core Skills</h2>
            <div className="resume-skills">
              {skillBadges.map((skill, index) => (
                <motion.span
                  className="resume-skill"
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.24) }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            <div className="resume-skill-groups">
              {skillGroups.map((group, index) => (
                <motion.article
                  className="resume-skill-group"
                  key={group.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
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
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>Experience</h2>
            <div className="resume-exp-list">
              {experience.map((item, index) => (
                <motion.article
                  className="resume-exp-item"
                  key={item.company + item.role}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.32, delay: Math.min(index * 0.05, 0.22) }}
                >
                  <h3>{item.role}</h3>
                  <p className="meta">{item.company} - {item.location}</p>
                  <p className="duration">{item.duration}</p>
                  <ul>
                    {item.highlights.map((point) => (
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
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>Selected Projects</h2>
            <div className="resume-projects">
              {projects.map((project, index) => (
                <motion.article
                  className="resume-project"
                  key={project.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.32, delay: Math.min(index * 0.05, 0.22) }}
                >
                  <h3>{project.title}</h3>
                  <p className="meta">{project.org}</p>
                  <p>{project.summary}</p>
                  <a className="resume-project-link" href={project.link} target="_blank" rel="noreferrer">
                    View project
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="panel"
            id="case-studies"
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2>Case Study Summaries</h2>
            <div className="resume-case-list">
              {caseStudies.map((study, index) => (
                <motion.article
                  className="resume-case-item"
                  key={study.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.32, delay: Math.min(index * 0.05, 0.2) }}
                >
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </>
      )}

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        Toggle between Explorer View and Resume Mode at the top.
      </motion.footer>
    </div>
  )
}

export default App
