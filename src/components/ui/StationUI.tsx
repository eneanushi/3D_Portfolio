import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { getStationContent } from '../../content/arena';
import { WorkExperience } from '../../types/station.types';
import {
  MailIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
  GlobeIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  CloseIcon,
} from './icons';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Section heading, shared by every zone ─────────────────────────────────── */

const ZoneHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div style={{ marginBottom: '28px' }}>
    <motion.span
      className="zone-eyebrow"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{ display: 'block', marginBottom: '10px' }}
    >
      {eyebrow}
    </motion.span>
    <motion.h2
      className="zone-title"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.04, ease: EASE }}
      style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: 0 }}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{
          margin: '12px 0 0',
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255, 255, 255, 0.5)',
          maxWidth: '46ch',
        }}
      >
        {description}
      </motion.p>
    )}
  </div>
);

/* ── Work experience ───────────────────────────────────────────────────────── */

const ExperienceItem = ({
  job,
  index,
  isOpen,
  onToggle,
}: {
  job: WorkExperience;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    className="exp-item"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.08 + index * 0.05, ease: EASE }}
  >
    <button
      className="exp-head"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`exp-body-${job.id}`}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="exp-role">{job.role}</span>
          {job.current && <span className="badge-current">Current</span>}
        </div>
        <div className="exp-company">{job.company}</div>
        <div className="exp-meta">
          {job.period}
          <span style={{ opacity: 0.4, padding: '0 8px' }}>·</span>
          {job.location}
        </div>
      </div>
      <span className={`exp-chevron${isOpen ? ' exp-chevron--open' : ''}`}>
        <ChevronDownIcon />
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`exp-body-${job.id}`}
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ padding: '0 4px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {job.points.map((point, i) => (
                <p key={i} className="exp-point" style={{ margin: 0 }}>
                  {point}
                </p>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '16px',
              }}
            >
              {job.technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ── Contact tile ──────────────────────────────────────────────────────────── */

const ContactTile = ({
  href,
  icon,
  label,
  value,
  delay,
  external = true,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
  external?: boolean;
}) => (
  <motion.a
    className="contact-tile"
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: EASE }}
  >
    <span className="contact-tile__icon">{icon}</span>
    <span style={{ minWidth: 0 }}>
      <span className="contact-tile__label" style={{ display: 'block' }}>
        {label}
      </span>
      <span className="contact-tile__value" style={{ display: 'block' }}>
        {value}
      </span>
    </span>
  </motion.a>
);

/* ── Panel ─────────────────────────────────────────────────────────────────── */

export const StationUI = () => {
  const showStationUI = useGameStore((state) => state.showStationUI);
  const nearestStation = useGameStore((state) => state.nearestStation);
  const closeStationUI = useGameStore((state) => state.closeStationUI);
  const workExperience = usePortfolioStore((state) => state.workExperience);
  const projects = usePortfolioStore((state) => state.projects);
  const contactInfo = usePortfolioStore((state) => state.contactInfo);
  const { isMobile } = useMobileDetection();

  // The current role is expanded on open; the rest are one click away
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (showStationUI && nearestStation === 'work') {
      setExpandedId(workExperience[0]?.id ?? null);
    }
  }, [showStationUI, nearestStation, workExperience]);

  const handleClose = useCallback(() => closeStationUI(), [closeStationUI]);

  const renderWork = () => (
    <>
      <ZoneHeading eyebrow="Professional Journey" title="Experience" />
      <div>
        {workExperience.map((job, index) => (
          <ExperienceItem
            key={job.id}
            job={job}
            index={index}
            isOpen={expandedId === job.id}
            onToggle={() => setExpandedId(expandedId === job.id ? null : job.id)}
          />
        ))}
      </div>
    </>
  );

  const renderProjects = () => (
    <>
      <ZoneHeading
        eyebrow={projects.eyebrow}
        title={projects.title}
        description={projects.description}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14, ease: EASE }}
      >
        <a
          className="cta-primary"
          href={projects.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'block',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              {projects.ctaLabel}
            </span>
            <span
              style={{
                display: 'block',
                marginTop: '4px',
                fontSize: '12px',
                letterSpacing: '0.04em',
                color: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              {projects.displayUrl}
            </span>
          </span>
          <span
            className="cta-primary__arrow"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '50%',
              border: '1px solid rgba(201, 169, 98, 0.32)',
              color: 'var(--color-accent)',
            }}
          >
            <ArrowUpRightIcon size={20} />
          </span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '20px',
        }}
      >
        {projects.highlights.map((highlight) => (
          <span key={highlight} className="tag">
            {highlight}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          margin: '24px 0 0',
          fontSize: '12px',
          lineHeight: 1.7,
          color: 'rgba(255, 255, 255, 0.32)',
        }}
      >
        Opens the live portfolio in a new tab — the arena stays exactly where you left it.
      </motion.p>
    </>
  );

  const renderContact = () => (
    <>
      <ZoneHeading
        eyebrow="Get In Touch"
        title="Contact"
        description="Open to new work, collaborations and the occasional interesting problem."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ContactTile
          href={`mailto:${contactInfo.email}`}
          icon={<MailIcon />}
          label="Email"
          value={contactInfo.email}
          delay={0.1}
          external={false}
        />
        <ContactTile
          href={contactInfo.linkedin}
          icon={<LinkedInIcon />}
          label="LinkedIn"
          value="Connect with me"
          delay={0.15}
        />
        {contactInfo.github && (
          <ContactTile
            href={contactInfo.github}
            icon={<GitHubIcon />}
            label="GitHub"
            value="View my code"
            delay={0.2}
          />
        )}
        {contactInfo.instagram && (
          <ContactTile
            href={contactInfo.instagram}
            icon={<InstagramIcon />}
            label="Instagram"
            value="@vision9.dev"
            delay={0.25}
          />
        )}
        {contactInfo.website && (
          <ContactTile
            href={contactInfo.website}
            icon={<GlobeIcon />}
            label="Website"
            value="eneanushi.com"
            delay={0.3}
          />
        )}
      </div>
    </>
  );

  const renderContent = () => {
    switch (nearestStation) {
      case 'work':
        return renderWork();
      case 'projects':
        return renderProjects();
      case 'contact':
        return renderContact();
      default:
        return null;
    }
  };

  const zone = nearestStation ? getStationContent(nearestStation) : null;

  return (
    <AnimatePresence>
      {/* Light scrim: the arena stays visible behind the panel so the 3D
          scene and the UI read as one composition. */}
      {showStationUI && nearestStation && (
          <motion.div
            key="zone-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 190,
              background: isMobile
                ? 'rgba(0, 0, 0, 0.45)'
                : 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}
          />
      )}

      {showStationUI && nearestStation && (
          <motion.aside
            key={`zone-panel-${nearestStation}`}
            className="zone-panel"
            initial={isMobile ? { y: '100%' } : { x: 48, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { x: 48, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            style={
              isMobile
                ? {
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    maxHeight: '78vh',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px 20px 0 0',
                  }
                : {
                    position: 'fixed',
                    top: '88px',
                    right: '28px',
                    bottom: '28px',
                    width: 'min(480px, 42vw)',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-xl)',
                  }
            }
          >
            {/* Panel header */}
            <header
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: isMobile ? '16px 20px 12px' : '18px 22px 14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                  }}
                />
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  Zone {zone?.index} — {zone?.name}
                </span>
              </div>
              <button className="icon-button" onClick={handleClose} aria-label="Close panel">
                <CloseIcon />
              </button>
            </header>

            {/* Panel body */}
            <div
              className="zone-panel__body"
              style={{
                flex: 1,
                padding: isMobile ? '22px 20px 24px' : '28px 26px 28px',
              }}
            >
              {renderContent()}
            </div>

            {/* Panel footer */}
            <footer
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.28)',
                flexShrink: 0,
              }}
            >
              {isMobile ? (
                'Tap outside to close'
              ) : (
                <>
                  <span className="key-badge">ESC</span>
                  <span>or</span>
                  <span className="key-badge">E</span>
                  <span>to close · walk away to dismiss</span>
                </>
              )}
            </footer>
          </motion.aside>
      )}
    </AnimatePresence>
  );
};
