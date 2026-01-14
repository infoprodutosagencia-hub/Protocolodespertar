import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Zap, ShieldCheck, CreditCard, ChevronDown, CheckCircle2, AlertTriangle, Crown, Volume2, VolumeX, BookOpen, Flame, Brain, Radio, Music, Library, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Reveal, SacredGeometry, PortalButton } from './VisualEffects';
import { MODULES, BENEFITS, PRICING, FAQS } from '../constants';
import { ModuleCardProps } from '../types';

// --- HERO SECTION ---
export const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('story');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <SacredGeometry />
      
      {/* Logo Area */}
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

// --- VIDEO / STORY SECTION ---
export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-32 px-4 flex flex-col items-center justify-center">
      {/* Spotlight Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-purple-900/30 to-transparent blur-[80px]" />

      <Reveal className="w-full max-w-5xl z-10">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(75,0,130,0.5)] group">
           {/* Placeholder Image simulating video thumbnail */}
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
           
           {/* Scanline Effect */}
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

// --- MODULES SECTION ---
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
      
      {/* Reveal text on hover mostly, but show a bit for mobile usability */}
      <p className="text-gray-400 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>

      {/* Glow corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-600/20 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

export const ModulesSection: React.FC = () => {
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

// --- BONUS SECTION ---
export const BonusSection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Parchment/Old texture overlay opacity */}
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
                 {/* Glowing Chest Representation */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 to-transparent rounded-full blur-3xl animate-pulse" />
                 <BookOpen className="w-full h-full text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] transform group-hover:-translate-y-4 transition-transform duration-500" strokeWidth={0.5} />
                 
                 {/* Floating Particles */}
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

// --- PRICE / VALUE PROPOSITION SECTION ---
export const OfferSection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative">
       {/* Divine Light from top */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[500px] bg-gradient-to-b from-white to-transparent shadow-[0_0_50px_white]" />

       <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* COMPARISON / VALUE */}
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

// --- TWO CHOICES SECTION ---
export const ChoicesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-black relative">
       <div className="max-w-6xl mx-auto">
         <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 uppercase">Agora você tem duas escolhas</h2>
            <p className="text-gray-400">Imagine-se agora diante de dois caminhos...</p>
         </Reveal>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PATH 1 */}
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

            {/* PATH 2 */}
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

// --- FAQ SECTION ---
export const FAQSection: React.FC = () => {
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

// --- FOOTER ---
export const Footer: React.FC = () => (
  <footer className="bg-black py-12 border-t border-white/5 text-center relative z-10">
    <div className="max-w-4xl mx-auto px-4">
      <Crown className="w-8 h-8 text-gray-600 mx-auto mb-6" />
      <p className="text-gray-600 text-sm mb-4">
        &copy; {new Date().getFullYear()} Astral Ascension. Todos os direitos reservados.
      </p>
      <p className="text-gray-700 text-xs max-w-xl mx-auto">
        Aviso Legal: Os resultados podem variar de pessoa para pessoa. Este produto não substitui o parecer médico ou profissional.
      </p>
    </div>
  </footer>
);

export const AudioController: React.FC = () => {
  const [muted, setMuted] = useState(true);
  
  // In a real app, you would use an <audio> ref here.
  // For this demo, it's a visual toggle.
  
  return (
    <div 
      onClick={() => setMuted(!muted)}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/10 hover:scale-110 transition-all duration-300"
    >
       {muted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-[#FFD700] animate-pulse" />}
    </div>
  )
}