import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    titulo: '5 Erros Comuns no Treino de Hipertrofia',
    data: '2024-01-15',
    autor: 'Dário Lopes',
    categoria: 'Treino',
    resumo: 'Descubra os principais erros que podem estar prejudicando seus resultados na musculação.',
    imagem: '/images/blog1.svg',
  },
  {
    id: 2,
    titulo: 'Como Montar sua Dieta para Ganho de Massa',
    data: '2024-01-10',
    autor: 'Dário Lopes',
    categoria: 'Nutrição',
    resumo: 'Guia completo para calcular suas necessidades calóricas e montar um plano alimentar eficaz.',
    imagem: '/images/blog2.svg',
  },
  {
    id: 3,
    titulo: 'Periodização do Treino: O Que Você Precisa Saber',
    data: '2024-01-05',
    autor: 'Dário Lopes',
    categoria: 'Educação Física',
    resumo: 'Entenda como organizar seus treinos ao longo das semanas para evitar plateaus.',
    imagem: '/images/blog3.svg',
  },
  {
    id: 4,
    titulo: 'Suplementação: O Que Realmente Funciona',
    data: '2024-01-20',
    autor: 'Dário Lopes',
    categoria: 'Nutrição',
    resumo: 'Análise dos principais suplementos do mercado e sua eficácia comprovada.',
    imagem: '/images/blog4.svg',
  },
  {
    id: 5,
    titulo: 'Treino para Iniciantes: Guia Completo',
    data: '2024-01-25',
    autor: 'Dário Lopes',
    categoria: 'Treino',
    resumo: 'Tudo que você precisa saber para começar sua jornada no mundo do fitness.',
    imagem: '/images/blog5.svg',
  },
];

function PostCard({ post }) {
  return (
    <article className="bg-brand-dark/80 border border-white/10 rounded-3xl overflow-hidden card-glow group hover:transform hover:scale-[1.02] transition-all">
      <div className="h-48 bg-gradient-to-br from-brand-red/20 to-brand-black/50 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Tag className="w-16 h-16 text-brand-red/30" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.data).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.autor}</span>
          </div>
        </div>
        
        <span className="inline-block text-brand-red text-xs font-semibold uppercase tracking-wider mb-2">
          {post.categoria}
        </span>
        
        <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
          {post.titulo}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.resumo}
        </p>
        
        <a href="#" className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:gap-3 transition-all">
          Ler mais <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

export default function Blog() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  }, []);

  const visiblePosts = [
    posts[current],
    posts[(current + 1) % posts.length],
    posts[(current + 2) % posts.length],
  ];

  return (
    <section id="blog" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-red font-semibold tracking-widest text-sm uppercase mb-4 block">
            Últimos Artigos
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
            BLOG DE{' '}
            <span className="text-gradient">EDUCAÇÃO FÍSICA</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dicas, estratégias e conhecimentos para você alcançar seus objetivos.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {visiblePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? 'bg-brand-red w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-block bg-gradient-red text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Ver Todos os Artigos
          </a>
        </motion.div>
      </div>
    </section>
  );
}