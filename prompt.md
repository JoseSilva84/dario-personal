Crie um site completo em React (single-file .jsx) para um personal trainer chamado "Dário Lopes Personal". 
O site deve ser visualmente impactante, profissional e moderno, inspirado no layout de academia.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 IDENTIDADE VISUAL (obrigatório)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Paleta principal: preto (#0a0a0a), vermelho vibrante (#CC0000 / #E31A1A), branco (#FFFFFF)
- Acento: gradiente vermelho-laranja (#FF4500) para efeitos de fogo e energia
- Tipografia: fonte de impacto/bold para títulos (ex: "Barlow Condensed", "Bebas Neue" ou "Black Ops One" via Google Fonts), fonte clean para corpo (ex: "Poppins")
- Estética: dark, agressiva, energética — textura de fogo sutil no hero, sombras vermelhas em hover
- Instagram: @dariolopes_personal | WhatsApp: (88) 92165-7051 e (88) 988284543

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🖥️ SEÇÕES DO SITE (em ordem)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. NAVBAR FIXA
- Logo com nome "Dário Lopes Personal" + ícone de raio (⚡)
- Links: Início | Sobre | Planos | Resultados | Contato
- Botão CTA vermelho: "Começar Agora"
- Fundo preto com borda inferior vermelha ao rolar

2. HERO (tela cheia com carrossel automático)
- Slider com 3 slides de fundo escuro/fogo com textos motivacionais em PT-BR:
  • "Transforme seu corpo. Mude sua vida."
  • "Treino personalizado para resultados reais."  
  • "Do iniciante ao avançado. Online e presencial."
- Badge "Consultoria Online Disponível" pulsando
- Dois botões: "Ver Planos" (vermelho) e "Falar no WhatsApp" (verde escuro com ícone WhatsApp)
- Partículas ou faíscas animadas no fundo (CSS puro)

3. SEÇÃO "SOBRE O PERSONAL"
- Layout 2 colunas: esquerda com foto placeholder (silhueta musculosa) + lado direito com texto
- Bio: "Dário Lopes é personal trainer especializado em consultoria online e presencial, com foco em resultados reais através de treino personalizado e acompanhamento próximo."
- 3 estatísticas animadas ao entrar na tela (contador JS): "500+ Alunos Atendidos", "5+ Anos de Experiência", "98% de Satisfação"
- Badges com especialidades: 🔥 Hipertrofia | ⚡ Emagrecimento | 🏆 Performance

4. SEÇÃO "PLANOS" (cards lado a lado, responsivo)
Três cards de planos com efeito hover de brilho vermelho:

PLANO 1 — BASIC
- Planilha de treino demonstrativa
- Acesso pelo app MFit Personal
- R$ 49,90/mês
- Botão: "Escolher Plano"

PLANO 2 — MASTER 🔥 (destacado como "Mais Popular")
- Planilha de treino demonstrativa
- 3 avaliações físicas
- Acesso pelo app MFit Personal
- R$ 99,90/mês
- Botão vermelho maior: "Escolher Plano"

PLANO 3 — MASTER AVANÇADO 🏆
- Treino personalizado
- 3 avaliações físicas
- Acompanhamento trimestral
- R$ 199,90/mês
- Botão: "Escolher Plano"

5. SEÇÃO "RESULTADOS" (antes & depois)
- Grid de 3 cards "Antes / Depois" com imagens placeholder (cinza escuro)
- Overlay com texto motivacional ao hover
- Título: "Resultados que Falam por Si"
- Subtítulo: "Consultoria Online — Transformações Reais"

6. SEÇÃO "COMO FUNCIONA"
- 4 steps em linha com ícones e linha conectora:
  1️⃣ Escolha seu plano
  2️⃣ Faça sua avaliação física
  3️⃣ Receba seu treino personalizado
  4️⃣ Acompanhe sua evolução
- Fundo levemente diferente (cinza escuro #111)

7. SEÇÃO "DEPOIMENTOS"
- 3 cards com citações fictícias de alunos satisfeitos
- Avatar circular placeholder + nome + estrelas (⭐⭐⭐⭐⭐)

8. SEÇÃO CTA FINAL
- Fundo com gradiente vermelho-preto
- Título grande: "PRONTO PARA TRANSFORMAR SEU CORPO?"
- Subtítulo: "Entre em contato agora e comece sua jornada."
- Botão WhatsApp gigante verde: "(88) 92165-7051"
- Botão secundário: "Ver no Instagram @dariolopes_personal"

9. FOOTER
- Logo + links sociais (Instagram, WhatsApp)
- Copyright "© 2025 Dário Lopes Personal. Todos os direitos reservados."
- Fundo preto com linha vermelha no topo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ REQUISITOS TÉCNICOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- React com hooks (useState, useEffect, useRef)
- Tailwind CSS para estilização (classes utilitárias)
- Animações com CSS keyframes e transitions
- Totalmente responsivo (mobile-first)
- Carrossel do hero com auto-play a cada 4 segundos
- Contadores numéricos animados com IntersectionObserver
- Scroll suave entre seções
- Nenhuma dependência externa além de React e Tailwind
- Fontes via Google Fonts (import no head ou @import CSS)
- Arquivo único .jsx com export default