import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Play, Sparkles, Zap, ShieldCheck, CreditCard, ChevronDown, 
  CheckCircle2, AlertTriangle, Crown, Volume2, VolumeX, 
  BookOpen, Flame, Brain, Radio, Music, Library, XCircle, 
  ArrowRight, HelpCircle, Star, Sun, Eye, Shield, Lock, Infinity 
} from 'lucide-react';

// ==========================================
// TYPES
// ==========================================

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  effect?: 'fade-up' | 'scale' | 'slide-right';
}

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  Icon: React.ElementType;
}

// ==========================================
// CONSTANTS
// ==========================================

const MODULES = [
  {
    number: "01",
    title: "Glândula Pineal",
    description: "Ative seu terceiro olho e acesse a visão além do alcance físico. A porta da alma.",
    Icon: Eye
  },
  {
    number: "02",
    title: "Despertar",
    description: "Saia da matrix. Entenda quem você realmente é e o propósito da sua existência.",
    Icon: Sun
  },
  {
    number: "03",
    title: "Kundalini",
    description: "A serpente de fogo. Desperte a energia vital adormecida na base da sua coluna.",
    Icon: Flame
  },
  {
    number: "04",
    title: "Cristo",
    description: "A consciência crística universal. O caminho do amor incondicional e da verdade.",
    Icon: Crown
  },
  {
    number: "05",
    title: "Reprogramação",
    description: "Limpe crenças limitantes do seu subconsciente e instale novos softwares mentais.",
    Icon: Brain
  },
  {
    number: "06",
    title: "O Poder da Mente",
    description: "Domine a arte de materializar pensamentos. Você cria a sua própria realidade.",
    Icon: Zap
  },
  {
    number: "07",
    title: "Campo Eletromagnético",
    description: "Aprenda a blindar sua aura e elevar sua frequência vibracional instantaneamente.",
    Icon: Radio
  },
  {
    number: "08",
    title: "O Livro de Enoch",
    description: "Os segredos dos anjos caídos e a história oculta da humanidade revelada.",
    Icon: BookOpen
  },
  {
    number: "09",
    title: "Remoção de Implantes",
    description: "Limpeza espiritual profunda. Remova chips e parasitas astrais do seu campo.",
    Icon: Shield
  },
  {
    number: "10",
    title: "Frequências Puras",
    description: "Sons binaurais e frequências de cura para harmonizar seus chakras.",
    Icon: Music
  },
  {
    number: "11",
    title: "O Pentagrama",
    description: "Geometria sagrada, proteção e o equilíbrio dos cinco elementos.",
    Icon: Star
  },
  {
    number: "12",
    title: "Acervo Místico",
    description: "Uma biblioteca de conhecimentos ocultos protegidos por séculos.",
    Icon: Library
  }
];

const BENEFITS = [
  "+ de 1.000 receitas naturais ancestrais",
  "Mais de 6.000 pessoas já usaram para se curar",
  "Conhecimento de milhares de anos reunido",
  "Receitas que seus bisavós usavam — e funcionavam melhor"
];

const PRICING = {
  old: "497,00",
  new: "47,99",
  installments: "11x de R$ 5,33"
};

const FAQS = [
  {
    question: "Esse conteúdo é pra mim, mesmo sendo iniciante?",
    answer: "Sim. O curso foi feito para qualquer pessoa com mente aberta e desejo real de despertar, independente do nível de conhecimento prévio."
  },
  {
    question: "Por quanto tempo terei acesso?",
    answer: "Acesso vitalício. Você poderá assistir quantas vezes quiser, no seu próprio ritmo, para sempre."
  },
  {
    question: "Funciona mesmo?",
    answer: "O conteúdo já foi acessado por milhares de pessoas, com resultados profundos de transformação e cura. Você só precisa aplicar o conhecimento."
  },
  {
    question: "Os bônus são entregues mesmo?",
    answer: "Sim. Você recebe o acervo de +1.000 receitas naturais e todos os materiais extras imediatamente após a confirmação do pagamento."
  },
  {
    question: "Posso pedir reembolso?",
    answer: "Sim. Você tem 30 dias de garantia incondicional. Se sentir que não é para você, devolvemos 100% do seu dinheiro sem perguntas."
  }
];

// ==========================================
// VISUAL EFFECTS COMPONENTS
// ==========================================

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block mix-blend-screen"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div 
        className={`rounded-full bg-gold transition-all duration-300 ease-out border border-white/50
          ${isHovering ? 'w-12 h-12 opacity-40 bg-purple-600' : 'w-4 h-4 bg-[#FFD700] shadow-[0_0_15px_#FFD700]'}`}
      />
      <div 
         className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 opacity-30 transition-all duration-500
          ${isHovering ? 'w-16 h-16 animate-spin' : 'w-8 h-8'}`}
      />
    </div>
  );
};

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", effect = 'fade-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getEffectClass = () => {
    switch(effect) {
      case 'slide-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12';
      case 'scale':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90';
      case 'fade-up':
      default:
        return isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${getEffectClass()} ${className}`}
    >
      {children}
    </div>
  );
};

const SacredGeometry: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] opacity-[0.05] pointer-events-none z-0">
       <svg viewBox="0 0 100 100" className="w-full h-full mandala-spin stroke-[#FFD700] fill-none stroke-[0.2]">
         <circle cx="50" cy="50" r="48" />
         <circle cx="50" cy="50" r="30" />
         <circle cx="50" cy="50" r="15" />
         {[0, 60, 120, 180, 240, 300].map(deg => (
           <g key={deg} transform={`rotate(${deg} 50 50)`}>
             <circle cx="50" cy="25" r="25" />
             <circle cx="50" cy="25" r="12" />
           </g>
         ))}
       </svg>
    </div>
  );
};

const PortalButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-10 py-5 font-cinzel font-bold text-white uppercase tracking-widest transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-full border-2 border-[#FFD700] opacity-50 blur-[2px] group-hover:blur-[4px] transition-all duration-300" />
      <div className="absolute inset-0 rounded-full border border-[#FFD700] group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute -inset-4 rounded-full border border-[#FFD700]/20 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
      <span className="relative z-10 flex items-center gap-3 text-lg drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] group-hover:text-[#FFD700] transition-colors">
        {children}
      </span>
    </button>
  );
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; size: number; opacity: number; speed: number; glow: boolean }[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.2 + 0.05,
        glow: Math.random() > 0.9
      });
    }

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      gradient.addColorStop(0, 'rgba(75, 0, 130, 0.15)');
      gradient.addColorStop(0.5, 'rgba(20, 0, 40, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        const flicker = Math.sin(Date.now() * 0.002 + star.x) * 0.3 + 0.7;
        const currentOpacity = star.opacity * flicker;
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        if (star.glow) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFD700';
        } else {
            ctx.shadowBlur = 0;
        }
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

// ==========================================
// SECTIONS
// ==========================================

const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('story');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <SacredGeometry />
      <div className="absolute top-10 animate-pulse-glow opacity-80">
         <Crown className="w-12 h-12 text-[#FFD700]" strokeWidth={1} />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl">
        <Reveal effect="fade-up" delay={200}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-[#E0E0E0] to-[#707070]">
            VOCÊ NÃO CHEGOU AQUI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] text-glow filter drop-shadow-lg">
              POR ACASO
            </span>
          </h1>
        </Reveal>

        <Reveal effect="fade-up" delay={600}>
          <p className="text-lg md:text-2xl font-light text-gray-300 tracking-wide mb-8 max-w-3xl mx-auto border-l-2 border-[#FFD700] pl-6 italic">
            "Nada acontece por acaso. Algo dentro de você está pronto para despertar."
          </p>
          <p className="text-md md:text-xl text-gray-400 mb-12">
            Você está prestes a dar o maior <strong>salto quântico</strong> da sua vida.
          </p>
        </Reveal>

        <Reveal effect="scale" delay={1000}>
          <PortalButton onClick={scrollToNext}>
            <Sparkles className="w-5 h-5 animate-spin" />
            EU QUERO DESPERTAR
          </PortalButton>
        </Reveal>
      </div>

      <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={scrollToNext}>
        <ChevronDown className="w-10 h-10 text-cyan-400" />
      </div>
    </section>
  );
};

const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-32 px-4 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-purple-900/30 to-transparent blur-[80px]" />

      <Reveal className="w-full max-w-5xl z-10">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(75,0,130,0.5)] group">
           <img 
             src="https://picsum.photos/1920/1080?grayscale&blur=2" 
             alt="Cosmic background" 
             className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-24 h-24 rounded-full border-2 border-[#FFD700] flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_30px_#FFD700] cursor-pointer hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-white fill-white ml-2" />
              </div>
           </div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] w-full animate-[shine_3s_infinite]" />
        </div>
      </Reveal>
      
      <Reveal delay={200} className="mt-12 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl text-white mb-6 uppercase font-bold">Me responde com sinceridade...</h2>
        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          Você acredita que é possível <strong className="text-[#FFD700]">reconstruir seus órgãos ou reverter doenças</strong> apenas com o poder da mente?
        </p>
        <p className="text-gray-400 leading-relaxed text-lg">
          Eu também não acreditava... <strong>Até o dia em que quase morri.</strong> E foi nesse ponto que tudo mudou. Descobri um caminho escondido, esquecido por muitos, protegido por poucos, e revelado apenas a quem está pronto.
        </p>
      </Reveal>
    </section>
  );
};

const ModuleCard: React.FC<ModuleCardProps> = ({ number, title, description, Icon }) => (
  <div className="group relative h-full">
    <div className="glass-panel h-full p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-x-2 hover:shadow-[0_20px_40px_rgba(139,0,255,0.3)] border border-white/5 hover:border-[#8B00FF]">
      <div className="absolute top-4 right-4 text-xs font-bold text-[#FFD700] border border-[#FFD700] rounded-full px-3 py-1">
        MÓDULO {number}
      </div>
      
      <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-900 to-black border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-180 transition-all duration-700 shadow-[0_0_20px_rgba(0,245,255,0.3)]">
        <Icon className="w-8 h-8 text-cyan-400" />
      </div>
      
      <h3 className="text-2xl text-white font-bold mb-3 group-hover:text-[#FFD700] transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-400 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>

      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-600/20 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

const ModulesSection: React.FC = () => {
  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white mb-4">Os Módulos do Despertar</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Um curso 100% em vídeo, com conteúdos diretos, reveladores e transformadores.
            Você vai acessar conhecimentos sagrados, ocultos e esquecidos.
          </p>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto rounded-full shadow-[0_0_10px_#FFD700] mt-8" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          {MODULES.map((mod, i) => (
            <Reveal key={i} delay={i * 50} effect="fade-up">
              <ModuleCard {...mod} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const BonusSection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a0b00] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass-panel p-8 md:p-16 rounded-3xl border border-[#FFD700]/30 shadow-[0_0_60px_rgba(255,215,0,0.15)] flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 text-center md:text-left">
            <Reveal>
              <h2 className="text-3xl md:text-5xl text-[#FFD700] font-black mb-2 flex items-center justify-center md:justify-start gap-3">
                <Crown className="w-10 h-10" /> 
                BÔNUS ESPECIAL
              </h2>
              <p className="text-gray-300 text-lg mb-8 border-l-4 border-[#FFD700] pl-4">
                 + de <strong>1.000 receitas naturais ancestrais</strong>
              </p>
              
              <ul className="space-y-4">
                {BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0" />
                    <span className="text-lg font-light">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex-1 flex justify-center">
            <Reveal effect="scale" delay={300}>
               <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 to-transparent rounded-full blur-3xl animate-pulse" />
                 <BookOpen className="w-full h-full text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] transform group-hover:-translate-y-4 transition-transform duration-500" strokeWidth={0.5} />
                 <div className="absolute top-0 right-0 animate-bounce">
                   <Sparkles className="text-cyan-400 w-12 h-12" />
                 </div>
               </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const OfferSection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[500px] bg-gradient-to-b from-white to-transparent shadow-[0_0_50px_white]" />

       <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="mb-16 glass-panel p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl md:text-3xl text-gray-200 font-serif mb-8">
                  💰 Esse Conhecimento Poderia Facilmente Custar <br/>
                  <span className="text-red-400 decoration-red-500/50 line-through">R$497, R$997 ou Mais...</span>
                </h2>
                
                <div className="text-gray-400 text-left max-w-2xl mx-auto space-y-4 mb-8 text-sm md:text-base">
                  <p>Estamos falando de um conteúdo sagrado, com técnicas que não existem em nenhum outro lugar, reveladas por quem viveu o despertar na pele.</p>
                  <p className="font-bold text-gray-300">Se você fosse buscar esse conhecimento individualmente:</p>
                  <ul className="space-y-2 pl-4 border-l-2 border-purple-500/30">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> Com terapeutas holísticos → R$200 a R$400 por sessão</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> Com cursos presenciais → até R$2.000 por módulo</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> Em livros raros e acervos proibidos → valores que passam de R$1.000</li>
                  </ul>
                  <p className="italic text-center pt-4 text-white">"Mas o objetivo aqui não é o lucro. É espalhar essa verdade para o máximo de pessoas que estão prontas."</p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent mb-8"></div>

                <p className="text-[#FFD700] uppercase tracking-widest text-sm font-bold mb-4">🎁 Por isso, e somente hoje, você investe apenas:</p>
                
                <div className="flex flex-col items-center justify-center">
                    <div className="text-[4rem] md:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B] leading-none tracking-tighter text-holographic animate-pulse-glow">
                      R$ {PRICING.new}
                    </div>
                    <span className="text-sm text-gray-400 uppercase tracking-widest mt-2 mb-2">à vista</span>
                    <span className="text-xl md:text-2xl text-cyan-300 font-light">ou {PRICING.installments}</span>
                </div>
                
                <p className="text-xs text-gray-500 mt-6 max-w-sm mx-auto">Isso mesmo. Por menos que um lanche por mês, você recebe um acervo transformador que pode mudar tudo.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <PortalButton className="scale-110 md:scale-125 mb-8">
              <Zap className="fill-[#FFD700]" /> EU QUERO DESPERTAR AGORA
            </PortalButton>
            
            <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <CreditCard className="w-6 h-6 text-white" />
              <div className="text-xs text-gray-400 max-w-[200px] text-left">
                Pagamento 100% seguro.
              </div>
            </div>
          </Reveal>
       </div>
    </section>
  );
};

const ChoicesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-black relative">
       <div className="max-w-6xl mx-auto">
         <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 uppercase">Agora você tem duas escolhas</h2>
            <p className="text-gray-400">Imagine-se agora diante de dois caminhos...</p>
         </Reveal>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal effect="slide-right" delay={100} className="relative group">
              <div className="h-full glass-panel p-8 rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-colors duration-500 bg-gradient-to-b from-red-950/20 to-black">
                 <div className="absolute top-4 right-4 text-red-500 opacity-50"><XCircle size={32} /></div>
                 <h3 className="text-xl text-red-500 font-bold mb-4 flex items-center gap-2">🔴 Caminho 1</h3>
                 <p className="text-gray-400 leading-relaxed">
                   Você ignora esse chamado, continua sua vida exatamente como está, e talvez daqui a alguns anos se pergunte:
                 </p>
                 <p className="mt-4 text-gray-300 italic">"E se eu tivesse começado aquele dia?"</p>
              </div>
            </Reveal>

            <Reveal effect="slide-right" delay={300} className="relative group">
               <div className="h-full glass-panel p-8 rounded-2xl border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors duration-500 bg-gradient-to-b from-indigo-950/20 to-black shadow-[0_0_30px_rgba(75,0,130,0.2)]">
                 <div className="absolute top-4 right-4 text-[#FFD700] opacity-50"><CheckCircle2 size={32} /></div>
                 <h3 className="text-xl text-[#FFD700] font-bold mb-4 flex items-center gap-2">🔵 Caminho 2</h3>
                 <p className="text-gray-300 leading-relaxed">
                   Você aceita o despertar, entra em um mundo novo de conhecimento e transformação, e nunca mais será o mesmo.
                 </p>
                 <p className="mt-4 text-cyan-300 font-bold">✨ Sua alma já sabe a resposta.</p>
               </div>
            </Reveal>
         </div>

         <Reveal delay={500} className="mt-16 text-center">
            <p className="text-gray-400 mb-6 uppercase tracking-widest text-sm">🔥 Escolha o seu caminho</p>
            <a href="#" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors border-b border-[#FFD700] hover:border-white pb-1 font-cinzel text-xl">
               EU QUERO DESPERTAR AGORA <ArrowRight size={20} />
            </a>
         </Reveal>
       </div>
    </section>
  )
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 relative z-10 bg-black/50">
       <div className="max-w-3xl mx-auto">
         <Reveal className="text-center mb-16">
            <div className="flex justify-center mb-4"><HelpCircle className="text-[#FFD700] w-10 h-10" /></div>
            <h2 className="text-3xl md:text-4xl text-white font-bold">Perguntas Frequentes</h2>
         </Reveal>

         <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <Reveal key={index} delay={index * 100} effect="fade-up">
                <div 
                  className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 border ${openIndex === index ? 'border-[#FFD700]/50 bg-white/5' : 'border-white/5'}`}
                >
                   <button 
                     onClick={() => toggleFAQ(index)}
                     className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                   >
                     <span className={`font-bold text-lg ${openIndex === index ? 'text-[#FFD700]' : 'text-gray-300'}`}>{faq.question}</span>
                     <ChevronDown className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#FFD700]' : 'text-gray-500'}`} />
                   </button>
                   <div 
                     className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                   >
                     <p className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                        {faq.answer}
                     </p>
                   </div>
                </div>
              </Reveal>
            ))}
         </div>
       </div>
    </section>
  );
}

const Footer: React.FC = () => (
  <footer className="bg-black py-12 border-t border-white/5 text-center relative z-10">
    <div className="max-w-4xl mx-auto px-4">
      <Crown className="w-8 h-8 text-gray-600 mx-auto mb-6" />
      <p className="text-gray-600 text-sm mb-4">
        &copy; {new Date().getFullYear()} Protocolo Despertar. Todos os direitos reservados.
      </p>
      <p className="text-gray-700 text-xs max-w-xl mx-auto">
        Aviso Legal: Os resultados podem variar de pessoa para pessoa. Este produto não substitui o parecer médico ou profissional.
      </p>
    </div>
  </footer>
);

const AudioController: React.FC = () => {
  const [muted, setMuted] = useState(true);
  
  return (
    <div 
      onClick={() => setMuted(!muted)}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/10 hover:scale-110 transition-all duration-300"
    >
       {muted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-[#FFD700] animate-pulse" />}
    </div>
  )
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

function App() {
  return (
    <div className="relative min-h-screen text-white selection:bg-[#FFD700] selection:text-black">
      {/* Background Layer */}
      <StarField />
      
      {/* Global Effects */}
      <CustomCursor />
      <AudioController />

      {/* Main Content Flow */}
      <main className="relative">
        
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Story/Video */}
        <div className="relative">
          {/* Transition Wave SVG top */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
             <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-black opacity-80">
                 <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
             </svg>
          </div>
          <StorySection />
        </div>

        {/* Section 3: Modules */}
        <div className="relative">
           {/* Connecting energy line */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-purple-900 via-cyan-900 to-transparent opacity-50" />
           <ModulesSection />
        </div>

        {/* Section 4: Bonus */}
        <BonusSection />

        {/* Section 5: Offer */}
        <div className="relative overflow-hidden">
           {/* Background noise texture simulated */}
           <div className="absolute inset-0 z-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
           <OfferSection />
        </div>

        {/* Section 6: Choices */}
        <ChoicesSection />

        {/* Section 7: FAQ */}
        <FAQSection />

      </main>

      <Footer />
    </div>
  );
}

// ==========================================
// RENDER ROOT
// ==========================================

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);