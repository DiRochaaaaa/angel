# Angel Oasis - Sales Funnel Project

## 📋 Visão Geral do Projeto

O **Angel Oasis** é um funil de vendas de tráfego direto focado em espiritualidade e conexão com anjos da guarda. O projeto implementa uma estratégia de marketing digital completa, desde a captura de leads até a conversão em vendas.

## 🎯 Estratégia do Funil de Vendas

### Estrutura do Funil:
1. **Presell** (Página Principal) - `index.html`
2. **VSL** (Video Sales Letter) - Integrada na página principal
3. **Upsell** - Pasta `/up/index.html`

### Fluxo do Usuário:
```
Tráfego Direto → Presell (Quiz Interativo) → VSL → Oferta Principal → Upsell
```

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Servidor**: Node.js com módulo `serve`
- **Vídeo**: VTurb (converteai.net)
- **Pagamento**: Hotmart
- **Analytics**: Facebook Pixel
- **Fonts**: Google Fonts (Poppins, Arima Madurai)

## 📁 Estrutura do Projeto

```
angel/
├── assets/
│   ├── css/
│   │   └── styles.css           # Estilos principais
│   └── js/
│       ├── config.js            # Configurações dos anjos
│       └── script.js            # Lógica principal
├── assets-up/
│   └── global.css               # Estilos globais
├── up/
│   └── index.html               # Página de upsell
├── index.html                   # Página principal (presell + VSL)
├── script.js                    # Script adicional
├── package.json                 # Dependências do projeto
└── serve.json                   # Configuração do servidor
```

## 💰 Modelo de Negócio

### Produto Principal:
- **Nome**: "Reporte Premium del Ángel de la Guarda"
- **Preço**: $7 USD (originalmente $179.95)
- **Plataforma**: Hotmart
- **URL de Checkout**: `https://pay.hotmart.com/P101801752S?off=d6tzczic`

### Upsell:
- **Nome**: "Plan de Evolución Divina"
- **Preço**: $67 USD
- **Inclui**: Curso + Áudios + 4 Bônus Gratuitos
- **Valor Total**: $286.80 (com desconto)

## 🎪 Funcionalidades do Quiz

### Sistema de 3 Etapas:
1. **Nome**: Captura do primeiro nome
2. **Gênero**: Seleção masculino/feminino
3. **Data de Nascimento**: Mês, dia e ano

### Lógica dos Anjos:
- **12 Anjos diferentes** baseados no mês de nascimento
- Cada anjo tem nome, significado e descrição únicos
- Sistema de personalização dinâmica

### Exemplos de Anjos:
- **Janeiro**: Gabriel - "Fuerza de Dios"
- **Maio**: Miguel - "Quien es como Dios"
- **Setembro**: Uriel - "Luz de Dios"
- **Outubro**: Jeremiel - "Misericordia de Dios"

## 📊 Tracking e Analytics

### Facebook Pixel:
- ID: `891530102691135`
- Eventos trackados:
  - `PageView` - Visualização da página
  - `Lead` - Preenchimento do nome
  - `CompleteRegistration` - Finalização do quiz
  - `ViewContent` - Visualização da VSL
  - `Purchase` - Clique no botão de compra

### Persistência de Dados:
- **LocalStorage** para salvar progresso
- **Auto-save** em tempo real
- **Recuperação** automática de sessão

## 🎬 Sistema de VSL

### Características:
- **Player**: VTurb SmartPlayer
- **Duração**: Aproximadamente 17 minutos
- **Elementos Ocultos**: Aparecem após 1049 segundos
- **Controles**: Botões CTA aparecem gradualmente

### Elementos Progressivos:
- Botão "Añadir al Carrito"
- Depoimentos (Provas Sociais)
- Seção FAQ
- Garantia de 60 dias

## 🚀 Como Executar o Projeto

### Instalação:
```bash
npm install
```

### Desenvolvimento:
```bash
npm run dev
# Servidor roda em http://localhost:3000
```

### Produção:
```bash
npm start
# Usa PORT do ambiente ou 3000
```

## 📈 Otimizações Implementadas

### Performance:
- **Preload** de recursos críticos
- **DNS Prefetch** para domínios externos
- **Lazy Loading** para imagens
- **CSS crítico** inline
- **JavaScript** assíncrono

### UX/UI:
- **Animações** suaves e fluidas
- **Feedback visual** em tempo real
- **Sistema de notificações** elegante
- **Responsividade** completa
- **Acessibilidade** por teclado

## 🎯 Estratégias de Conversão

### Elementos Psicológicos:
- **Escassez**: "SOLO HOY"
- **Autoridade**: Depoimentos reais
- **Prova Social**: 7 testemunhos
- **Urgência**: Ofertas por tempo limitado
- **Personalização**: Nome + anjo específico

### Call-to-Actions:
- "Continuar →"
- "¡Sí, Muestra Mi Resultado! →"
- "Agregar Al Carrito 🛒"
- "¡Sí! Agregar A Mi Pedido"

## 🔧 Configurações Técnicas

### Propagação de Parâmetros:
- **UTM tracking** automático
- **Parâmetros personalizados** (nome, gênero, anjo)
- **Integração** com Hotmart

### URLs Importantes:
- **Produto Principal**: Hotmart checkout
- **Upsell**: Página interna `/up/`
- **Decline**: Redirecionamento alternativo

## 🛡️ Considerações de Segurança

- **HTTPS** obrigatório em produção
- **Sanitização** de inputs do usuário
- **Rate limiting** recomendado
- **CSP Headers** para XSS protection

## 📱 Responsividade

### Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações Mobile:
- Quiz otimizado para touch
- Vídeo responsivo
- Notificações adaptadas
- Botões com área de toque adequada

## 🎨 Branding

### Cores:
- **Primária**: #006eff (Azul)
- **Secundária**: #e91e63 (Rosa)
- **Accent**: #ff9800 (Laranja)
- **Gradiente**: #667eea → #764ba2

### Tipografia:
- **Principal**: Poppins
- **Secundária**: Arima Madurai
- **Fallbacks**: Arial, sans-serif

## 📋 Lista de Tarefas Futuras

### Melhorias Potenciais:
- [ ] A/B testing do quiz
- [ ] Analytics mais detalhados
- [ ] Chatbot de suporte
- [ ] Sistema de afiliados
- [ ] Mobile app
- [ ] Integração com CRM

### Otimizações:
- [ ] Lazy loading de scripts
- [ ] Service worker para cache
- [ ] Compressão de imagens
- [ ] Minificação de assets

## 🔮 Métricas Importantes

### KPIs a Acompanhar:
- **Taxa de Conclusão** do quiz
- **Tempo na VSL** 
- **Conversão** presell → upsell
- **ROI** por fonte de tráfego
- **LTV** (Lifetime Value)

---

**Desenvolvido para maximizar conversões e oferecer uma experiência única de descoberta espiritual.**

*Última atualização: Dezembro 2024*