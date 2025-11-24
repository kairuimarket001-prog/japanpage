import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Particles loaded:', container);
  }, []);

  const options: ISourceOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 60,
        density: {
          enable: true
        }
      },
      color: {
        value: ['#60a5fa', '#3b82f6', '#ffa726', '#ff8c42', '#ffffff', '#94a3b8']
      },
      shape: {
        type: ['circle', 'triangle', 'square']
      },
      opacity: {
        value: { min: 0.15, max: 0.6 },
        animation: {
          enable: true,
          speed: 0.3,
          sync: false
        }
      },
      size: {
        value: { min: 2, max: 6 },
        animation: {
          enable: true,
          speed: 1.5,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: { min: 0.3, max: 0.8 },
        direction: 'top',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
          top: 'out',
          bottom: 'out'
        },
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200
          }
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#3b82f6',
        opacity: 0.15,
        width: 1,
        triangles: {
          enable: false
        }
      },
      shadow: {
        enable: true,
        blur: 5,
        color: '#ffa726',
        offset: {
          x: 0,
          y: 0
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ['grab', 'bubble'],
          parallax: {
            enable: true,
            force: 15,
            smooth: 25
          }
        },
        resize: {
          enable: true,
          delay: 0.5
        }
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.4,
            color: '#ffa726'
          }
        },
        bubble: {
          distance: 200,
          size: 10,
          duration: 2,
          opacity: 0.8
        }
      }
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 30
            },
            move: {
              speed: { min: 0.2, max: 0.5 }
            },
            links: {
              enable: false
            }
          }
        }
      }
    ],
    background: {
      color: 'transparent'
    }
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
}
