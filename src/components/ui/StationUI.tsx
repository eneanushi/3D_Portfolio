import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { WorkExperience, Project } from '../../types/station.types';

export const StationUI = () => {
  const showStationUI = useGameStore((state) => state.showStationUI);
  const nearestStation = useGameStore((state) => state.nearestStation);
  const closeStationUI = useGameStore((state) => state.closeStationUI);
  const workExperience = usePortfolioStore((state) => state.workExperience);
  const projects = usePortfolioStore((state) => state.projects);
  const contactInfo = usePortfolioStore((state) => state.contactInfo);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    closeStationUI();
  };

  const renderWorkExperience = () => (
    <div style={{ paddingTop: 'var(--space-lg)' }}>
      {/* Header Section */}
      <div style={{
        marginBottom: 'var(--space-2xl)',
        paddingBottom: 'var(--space-lg)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, var(--color-accent), transparent)',
            marginBottom: 'var(--space-md)',
          }}
        />
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-sm)',
        }}>
          Professional Journey
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Work Experience
        </h2>
      </div>
      
      {/* Timeline */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-lg)',
        position: 'relative',
      }}>
        {/* Vertical timeline line */}
        <div style={{
          position: 'absolute',
          left: '11px',
          top: '24px',
          bottom: '24px',
          width: '1px',
          background: 'linear-gradient(180deg, var(--color-accent) 0%, var(--color-border) 50%, transparent 100%)',
        }} />
        
        {workExperience.map((work: WorkExperience, index: number) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{
              display: 'flex',
              gap: 'var(--space-lg)',
            }}
          >
            {/* Timeline dot */}
            <div style={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-full)',
              background: index === 0 
                ? 'linear-gradient(135deg, var(--color-accent) 0%, rgba(201, 169, 98, 0.6) 100%)'
                : 'var(--color-bg-tertiary)',
              border: `2px solid ${index === 0 ? 'var(--color-accent)' : 'var(--color-border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}>
              {index === 0 && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: '#fff',
                }} />
              )}
            </div>
            
            {/* Content card */}
            <div
              style={{
                flex: 1,
                padding: 'var(--space-lg)',
                background: index === 0 
                  ? 'linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(201, 169, 98, 0.02) 100%)'
                  : 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${index === 0 ? 'rgba(201, 169, 98, 0.2)' : 'var(--color-border)'}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {index === 0 && (
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-md)',
                  right: 'var(--space-md)',
                  padding: '4px 10px',
                  background: 'var(--color-accent-soft)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Current
                </div>
              )}
              
              <h3 style={{
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 var(--space-xs) 0',
                paddingRight: index === 0 ? '80px' : 0,
              }}>
                {work.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'var(--color-accent)',
                margin: '0 0 var(--space-xs) 0',
                fontWeight: 500,
              }}>
                {work.company}
              </p>
              <p style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                margin: '0 0 var(--space-md) 0',
              }}>
                {work.period}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                margin: '0 0 var(--space-lg) 0',
              }}>
                {work.description}
              </p>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '6px',
              }}>
                {work.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      fontWeight: 500,
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--color-text-tertiary)',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div style={{ paddingTop: 'var(--space-lg)' }}>
      {/* Header Section */}
      <div style={{
        marginBottom: 'var(--space-2xl)',
        paddingBottom: 'var(--space-lg)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, var(--color-accent), transparent)',
            marginBottom: 'var(--space-md)',
          }}
        />
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-sm)',
        }}>
          Featured Work
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Projects
        </h2>
      </div>
      
      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-lg)',
      }}>
        {projects.map((project: Project, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{
              padding: 'var(--space-xl)',
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              transition: 'all var(--transition-normal)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle glow on hover */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--color-accent-soft), transparent)',
              opacity: 0.5,
            }} />
            
            {/* Project number */}
            <span style={{
              fontSize: '48px',
              fontWeight: 200,
              color: 'rgba(255, 255, 255, 0.04)',
              position: 'absolute',
              top: 'var(--space-md)',
              right: 'var(--space-lg)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 var(--space-sm) 0',
              position: 'relative',
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              margin: '0 0 var(--space-lg) 0',
            }}>
              {project.description}
            </p>
            
            {/* Tech stack */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: 'var(--space-lg)',
            }}>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '4px 10px',
                    fontSize: '10px',
                    fontWeight: 500,
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(201, 169, 98, 0.2)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                View Project
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div style={{ paddingTop: 'var(--space-lg)' }}>
      {/* Header Section */}
      <div style={{
        marginBottom: 'var(--space-2xl)',
        paddingBottom: 'var(--space-lg)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, var(--color-accent), transparent)',
            marginBottom: 'var(--space-md)',
          }}
        />
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-sm)',
        }}>
          Get In Touch
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Contact
        </h2>
        <p style={{
          fontSize: '15px',
          color: 'var(--color-text-secondary)',
          marginTop: 'var(--space-md)',
          lineHeight: 1.6,
          maxWidth: '400px',
        }}>
          Interested in working together? Feel free to reach out through any of the channels below.
        </p>
      </div>
      
      {/* Contact Grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-md)',
      }}>
        {/* Email */}
        <motion.a
          href={`mailto:${contactInfo.email}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -2, borderColor: 'var(--color-accent)' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            padding: 'var(--space-xl)',
            background: 'linear-gradient(145deg, rgba(201, 169, 98, 0.06) 0%, rgba(201, 169, 98, 0.02) 100%)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(201, 169, 98, 0.15)',
            textDecoration: 'none',
            transition: 'all var(--transition-normal)',
            gridColumn: 'span 2',
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--color-accent-soft)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
          </div>
          <div>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              margin: '0 0 4px 0',
            }}>
              Email
            </p>
            <p style={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}>
              {contactInfo.email}
            </p>
          </div>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href={contactInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ y: -2, borderColor: 'rgba(255, 255, 255, 0.2)' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            padding: 'var(--space-xl)',
            background: 'var(--color-bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            textDecoration: 'none',
            transition: 'all var(--transition-normal)',
            gridColumn: !contactInfo.github ? 'span 2' : 'auto',
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(10, 102, 194, 0.15)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#0A66C2"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              margin: '0 0 4px 0',
            }}>
              LinkedIn
            </p>
            <p style={{
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}>
              Connect with me
            </p>
          </div>
        </motion.a>

        {/* GitHub */}
        {contactInfo.github && (
          <motion.a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -2, borderColor: 'rgba(255, 255, 255, 0.2)' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              padding: 'var(--space-xl)',
              background: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              transition: 'all var(--transition-normal)',
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="rgba(255, 255, 255, 0.9)"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 4px 0',
              }}>
                GitHub
              </p>
              <p style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}>
                View my code
              </p>
            </div>
          </motion.a>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (nearestStation) {
      case 'work':
        return renderWorkExperience();
      case 'projects':
        return renderProjects();
      case 'contact':
        return renderContact();
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {showStationUI && nearestStation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 200,
            padding: 'var(--space-xl)',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              position: 'relative',
              maxWidth: '860px',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: 'var(--space-2xl)',
              paddingTop: 'var(--space-xl)',
              width: '100%',
              background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 'var(--space-lg)',
                right: 'var(--space-lg)',
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
              }}
              aria-label="Close panel"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
            
            {/* Content */}
            {renderContent()}
            
            {/* Footer hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 'var(--space-2xl)',
                paddingTop: 'var(--space-lg)',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
              }}
            >
              Press
              <span className="key-badge">ESC</span>
              or click outside to close
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
