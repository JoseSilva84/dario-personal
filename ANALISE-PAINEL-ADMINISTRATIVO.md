# Análise e sugestões para o painel administrativo

## Visão geral

O site do personal trainer Dário Lopes já possui um painel administrativo integrado ao Firebase. Atualmente, o administrador consegue adicionar e excluir:

- Posts do blog;
- Fotos da galeria;
- Depoimentos de clientes.

O site público também apresenta planos, formulário de agendamento, contatos, integração com WhatsApp e informações profissionais. No entanto, essas áreas ainda não podem ser gerenciadas pelo painel.

O objetivo recomendado é evoluir o painel de um gerenciador de conteúdo para uma ferramenta de gestão comercial e acompanhamento de alunos.

## Funcionalidades prioritárias

### 1. Dashboard comercial

Criar uma tela inicial com os principais indicadores da operação:

- Novos pedidos de agendamento;
- Leads recebidos no período;
- Alunos ativos;
- Planos próximos do vencimento;
- Pagamentos pendentes;
- Conteúdos publicados;
- Cliques no WhatsApp;
- Origem dos contatos, como Instagram, Google ou acesso direto.

Isso permite visualizar rapidamente a situação do negócio e as tarefas que precisam de atenção.

### 2. Agenda de atendimentos

O formulário atual encaminha a solicitação para o WhatsApp. O painel poderia registrar e organizar os agendamentos com:

- Nome e contato do interessado;
- Serviço escolhido;
- Data e horário;
- Status: solicitado, confirmado, concluído ou cancelado;
- Observações internas;
- Bloqueio de horários indisponíveis;
- Limite de alunos por horário;
- Lembretes pelo WhatsApp;
- Visualizações diária, semanal e mensal.

O sistema também deve impedir solicitações para horários que já estejam ocupados.

### 3. Gestão de leads

Criar um CRM simples para acompanhar possíveis clientes. Cada lead poderia passar pelas etapas:

- Novo contato;
- Em atendimento;
- Avaliação agendada;
- Proposta enviada;
- Matriculado;
- Não interessado;
- Retornar posteriormente.

Cada cadastro poderia conter objetivo, plano de interesse, origem do contato, observações e próxima data de retorno.

### 4. Cadastro e acompanhamento de alunos

Criar uma área individual para cada aluno contendo:

- Dados pessoais e contato;
- Plano contratado;
- Data de início e vencimento;
- Objetivo do aluno;
- Anamnese e PAR-Q;
- Restrições, lesões e observações;
- Peso, medidas e percentual de gordura;
- Fotos de evolução;
- Gráficos de progresso;
- Histórico de avaliações;
- Frequência nos treinos;
- Data da próxima reavaliação.

Fotos e informações relacionadas à saúde devem possuir acesso protegido e consentimento do aluno, seguindo as boas práticas da LGPD.

### 5. Gerenciamento dos planos

Atualmente, nomes, preços e benefícios dos planos estão definidos diretamente no código do site. O painel poderia permitir:

- Alterar nome e preço;
- Editar benefícios;
- Marcar um plano como “Mais popular”;
- Ativar ou ocultar um plano;
- Reordenar os planos;
- Criar promoções;
- Definir a modalidade como presencial ou online;
- Personalizar a mensagem enviada ao WhatsApp.

### 6. Blog mais completo

O gerenciamento do blog poderia receber:

- Edição de posts existentes;
- Rascunhos;
- Pré-visualização antes da publicação;
- Agendamento de publicação;
- Editor com títulos, listas, negrito, imagens e links;
- URLs amigáveis;
- Título e descrição para mecanismos de busca;
- Tags e categorias;
- Post em destaque;
- Duplicação de publicações;
- Busca e filtros.

Atualmente, o painel permite adicionar e excluir posts, mas não editá-los.

### 7. Galeria e transformações

Sugestões para melhorar a gestão da galeria:

- Reordenar fotos por meio de arrastar e soltar;
- Editar legenda, categoria e texto alternativo;
- Definir fotos de destaque;
- Publicar comparações de antes e depois;
- Controlar a autorização de uso de imagem;
- Ocultar fotos sem excluí-las;
- Criar álbuns por aluno ou evento;
- Aplicar marca-d’água automaticamente.

### 8. Depoimentos

Além do cadastro atual, implementar:

- Edição e reordenação;
- Aprovação antes da publicação;
- Destaque dos melhores depoimentos;
- Nota de 1 a 5;
- Identificação do plano utilizado;
- Vídeo ou link externo;
- Registro da autorização de publicação.

### 9. Controle financeiro simples

O painel poderia oferecer uma gestão financeira básica, sem a complexidade de um sistema contábil:

- Mensalidades pagas e pendentes;
- Forma de pagamento;
- Data de vencimento;
- Receita mensal;
- Lista de alunos inadimplentes;
- Planos próximos da renovação;
- Histórico financeiro por aluno;
- Exportação para planilha;
- Lembretes de cobrança.

### 10. Configurações gerais do site

Permitir que o administrador altere sem depender de mudanças no código:

- Telefone e WhatsApp;
- Instagram e outras redes sociais;
- Horários de atendimento;
- Textos da página inicial;
- Fotos principais;
- Contadores de alunos e avaliações;
- Dados profissionais e CREF;
- Serviços oferecidos;
- Perguntas frequentes;
- Avisos e promoções;
- Mensagens padrão do WhatsApp.

## Pontos técnicos importantes

### Cadastro público de administrador

A tela atual apresenta a opção “Criar minha Conta”. Dependendo das regras configuradas no Firebase, qualquer visitante que descubra o acesso pode criar uma conta.

Recomendações:

- Remover o cadastro de administrador do site público;
- Criar administradores de forma controlada;
- Validar permissões administrativas no banco de dados;
- Não depender apenas do acesso escondido no símbolo de copyright.

Uma rota `/admin` com autenticação adequada seria mais clara e segura.

### Armazenamento de imagens

As imagens estão sendo comprimidas e armazenadas como texto Base64 dentro do Firestore. Essa abordagem pode aumentar custos, prejudicar o carregamento e atingir o limite de tamanho dos documentos.

O ideal é:

- Armazenar os arquivos no Firebase Storage;
- Salvar no Firestore somente a URL e os metadados;
- Gerar miniaturas para as listagens;
- Validar tamanho e formato dos arquivos;
- Excluir o arquivo do Storage quando o conteúdo for removido.

### Permissões e auditoria

Adicionar mecanismos para garantir que apenas administradores autorizados possam criar, editar ou excluir conteúdo:

- Regras restritivas no Firestore e no Storage;
- Perfis e níveis de acesso, se houver mais usuários futuramente;
- Registro de quem realizou cada alteração;
- Data de criação e última atualização;
- Confirmação para operações destrutivas;
- Rotina de backup ou exportação dos dados.

## Estrutura recomendada do painel

O menu principal poderia ser organizado da seguinte forma:

1. Visão geral;
2. Agenda;
3. Leads;
4. Alunos;
5. Avaliações e evolução;
6. Planos;
7. Financeiro;
8. Blog;
9. Galeria;
10. Depoimentos;
11. Configurações;
12. Usuários e segurança.

## Ordem de implementação sugerida

### Fase 1 — Segurança e conteúdo

- Remover o cadastro público de administradores;
- Revisar as regras do Firebase;
- Migrar as imagens para o Firebase Storage;
- Adicionar edição de blog, galeria e depoimentos;
- Incluir rascunho, publicação e pré-visualização.

### Fase 2 — Conversão e atendimento

- Gerenciamento dos planos;
- Registro dos pedidos de agendamento;
- Agenda com controle de disponibilidade;
- Gestão de leads;
- Dashboard comercial.

### Fase 3 — Gestão de alunos

- Cadastro de alunos;
- Anamnese e avaliações;
- Fotos e gráficos de evolução;
- Controle de planos e renovações;
- Lembretes de reavaliação.

### Fase 4 — Financeiro e automações

- Controle de mensalidades;
- Indicadores financeiros;
- Exportação de relatórios;
- Lembretes de cobrança e agendamento;
- Integrações adicionais com WhatsApp, agenda ou meios de pagamento.

## Recomendação final

A melhor primeira versão deve concentrar-se em cinco pontos:

1. Segurança do acesso administrativo;
2. Edição completa dos conteúdos existentes;
3. Gerenciamento dos planos pelo painel;
4. Agenda integrada ao formulário do site;
5. Cadastro e acompanhamento de leads.

Esse conjunto já reduz o trabalho manual pelo WhatsApp, mantém o site atualizado e ajuda a converter visitantes em alunos. Depois dessa base, o painel pode evoluir para o acompanhamento dos alunos e para o controle financeiro.
