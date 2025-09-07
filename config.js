// Configuraciones del sitio Angel Oasis
const siteConfig = {
    // Textos principales
    texts: {
        mainTitle: "El Día Que Naciste NO Fue Un Accidente. Un Ángel de la Guarda Fue Asignado Para Cuidarte...",
        subtitle: "Ingresa Tus Detalles Abajo Para Descubrir el Nombre de Tu Ángel de la Guarda y El Mensaje Especial Que Te Espera...",
        
        steps: {
            step1: "Paso 1: ¿Cuál es tu nombre?",
            step2: "Paso 2: ¿Eres mujer u hombre?",
            step3: "Paso 3: ¿Cuándo naciste?",
            step4: "Paso 4: ¿Dónde debería enviarse tu lectura gratuita?"
        },
        
        placeholders: {
            firstName: "Ingresa Tu Nombre*",
            lastName: "Ingresa Tu Apellido",
            email: "Ingresa Tu Email"
        },
        
        buttons: {
            continue: "Continuar →",
            showResult: "¡Sí, Muestra Mi Resultado! →",
            discover: "Haz Clic Aquí Para Descubrir Cómo Conectarte Con El Arcángel",
            addToCart: "Agregar Al Carrito 🛒"
        },
        
        results: {
            angelName: "Jeremiel",
            angelTitle: "El Arcángel {name} Tiene Las Llaves De Tu Gran Destino...",
            angelDescription: "El día que naciste tenías un Ángel muy especial cuidándote... Tu Ángel de la Guarda se llama {name} y {name} tiene mucho que decirte que se revelará en un momento.",
            angelMeaning: "El nombre de {name} se traduce como \"{meaning}\". En conexión con el Arcángel {name}, descubrirás el propósito de tu vida, tus talentos naturales y tus habilidades ocultas..."
        },
        
        offer: {
            productName: "El Reporte Premium del Ángel de la Guarda",
            productDescription: "\"La Clave Para Desbloquear Toda Tu Grandeza Espiritual...\"",
            originalPrice: "$179.95",
            salePrice: "$7",
            urgency: "SOLO HOY"
        }
    },
    
    // Configurações de tempo
    timing: {
        loadingDuration: 3000, // 3 segundos
        autoSave: 5000, // salvar a cada 5 segundos
        animationDuration: 600 // 0.6 segundos
    },
    
    // Configurações de validação
    validation: {
        nameMinLength: 2,
        emailRequired: true,
        dateRequired: true,
        genderRequired: true
    },
    
    // Lista de ángeles basados en el mes de nacimiento
    angelsByMonth: {
        1: { // Enero
            name: "Gabriel",
            meaning: "Fuerza de Dios",
            description: "Fuerza de Dios Gabriel es el mensajero divino que trae claridad, propósito y dirección a tu vida. Cuando estás confundido o en duda, él aparece para recordarte que todo tiene un propósito superior. Su energía despierta tu voz interior y te conecta con tu verdadero llamado. 👉 Descubre cómo escuchar a Gabriel y desbloquear tu propósito divino ahora.",
            image: "raphael.jpg"
        },
        2: { // Febrero
            name: "Raguel",
            meaning: "Justicia de Dios",
            description: 'Justicia de Dios Raguel es el guardián del equilibrio. Él aparece cuando hay caos o injusticia, ayudándote a restaurar la armonía en tus relaciones y decisiones. Si sientes que algo en tu vida está "fuera de lugar", es hora de invocar su guía. 👉 Haz clic para conectar con Raguel y encontrar paz y equidad.',
            image: "raguel.jpg"
        },
        3: { // Marzo
            name: "Raziel",
            meaning: "Secretos de Dios",
            description: "Secretos de Dios Raziel es el guardián de los misterios del universo. Él te ayuda a comprender sueños, señales y verdades espirituales ocultas. Si has sentido que hay más en la vida de lo que puedes ver, es Raziel quien te está llamando. 👉 Haz clic y accede a los secretos divinos que cambiarán tu vida.",
            image: "raguel.jpg"
        },
        4: { // Abril
            name: "Sariel",
            meaning: "Mandato de Dios",
            description: "Mandato de Dios Sariel te ofrece dirección cuando estás perdido. Su energía es firme, clara y segura. Él te ayuda a tomar decisiones alineadas con tu alma y caminar con fe. Si has estado dudando de ti, Sariel está listo para guiarte. 👉 Conéctate con Sariel y sigue el camino que tu alma eligió.",
            image: "uriel.jpg"
        },
        5: { // Mayo
            name: "Miguel",
            meaning: "Quien es como Dios",
            description: "Quien es como Dios Miguel es el guerrero celestial. Te da fuerza para vencer tus miedos, romper cadenas y enfrentar la vida con coraje. Si estás pasando por pruebas, él es tu protector. 👉 Descubre cómo invocar a Miguel y sentir su escudo a tu alrededor.",
            image: "michael.jpg"
        },
        6: { // Junio
            name: "Chamuel",
            meaning: "Amor de Dios",
            description: "Amor de Dios Chamuel trae el bálsamo del amor divino. Sana corazones rotos, restaura relaciones y te enseña a amarte a ti mismo. Si te has sentido solo o rechazado, Chamuel quiere abrazarte. 👉 Haz clic y siente el amor sanador de Chamuel.",
            image: "haniel.jpg"
        },
        7: { // Julio
            name: "Jofiel",
            meaning: "Belleza de Dios",
            description: "Belleza de Dios Jofiel ilumina tu mente con pensamientos de luz, creatividad y gratitud. Te enseña a ver la belleza en ti y en todo lo que te rodea. Si la vida te parece gris, es Jofiel quien viene a pintarla de nuevo. 👉 Conéctate con Jofiel y transforma tu perspectiva.",
            image: "jophiel.jpg"
        },
        8: { // Agosto
            name: "Zadquiel",
            meaning: "Justicia de Dios",
            description: "Justicia de Dios Zadquiel es el ángel del perdón y la transmutación. Te ayuda a liberar el pasado y transformar dolor en sabiduría. Si hay heridas que aún pesan, Zadquiel puede ayudarte a soltarlas. 👉 Descubre cómo sanar con Zadquiel y renacer.",
            image: "ariel.jpg"
        },
        9: { // Septiembre
            name: "Uriel",
            meaning: "Luz de Dios",
            description: "Luz de Dios Uriel trae iluminación en momentos de oscuridad. Cuando no sabes qué hacer, él enciende la chispa de la claridad. Su guía es práctica y poderosa. 👉 Haz clic y permite que Uriel ilumine tu camino.",
            image: "uriel.jpg"
        },
        10: { // Octubre
            name: "Jeremiel",
            meaning: "Misericordia de Dios",
            description: "Misericordia de Dios Jeremiel te guía a través de una revisión compasiva de tu vida. Él te muestra lo que has aprendido y lo que está por venir. Si sientes que estás en una encrucijada, Jeremiel es tu consejero celestial. 👉 Conéctate con Jeremiel y descubre tu propósito oculto.",
            image: "jeremiel-224.jpg"
        },
        11: { // Noviembre
            name: "Azrael",
            meaning: "Ayuda de Dios",
            description: "Ayuda de Dios Azrael ofrece consuelo durante pérdidas y transiciones. Él transforma el dolor en comprensión profunda. Si estás enfrentando un cambio difícil, Azrael quiere acompañarte. 👉 Haz clic para sentir el consuelo y la sabiduría de Azrael.",
            image: "haniel.jpg"
        },
        12: { // Diciembre
            name: "Rafael",
            meaning: "Sanación de Dios",
            description: "Sanación de Dios Rafael es el sanador del cuerpo, mente y espíritu. Su presencia trae equilibrio, vitalidad y paz interior. Si sientes que necesitas restauración, él ya está a tu lado. 👉 Descubre cómo recibir la sanación de Rafael hoy.",
            image: "raphael.jpg"
        }
    },
    
    // Configurações de cores (para fácil customização)
    colors: {
        primary: "#006eff",
        secondary: "#e91e63",
        accent: "#ff9800",
        success: "#4caf50",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBackground: "rgba(255, 255, 255, 0.95)"
    },
    
    // URLs e links externos
    urls: {
        paymentProcessor: "#", // Substituir por URL real do processador de pagamento
        termsOfService: "#",
        privacyPolicy: "#",
        contactUs: "#"
    },
    
    // Configurações de analytics (opcional)
    analytics: {
        googleAnalytics: "", // ID do Google Analytics
        facebookPixel: "", // ID do Facebook Pixel
        trackingEnabled: false
    }
};

// Função para aplicar configurações
function applyConfig() {
    // Aplicar cores CSS customizadas
    const root = document.documentElement;
    root.style.setProperty('--primary-color', siteConfig.colors.primary);
    root.style.setProperty('--secondary-color', siteConfig.colors.secondary);
    root.style.setProperty('--accent-color', siteConfig.colors.accent);
    root.style.setProperty('--success-color', siteConfig.colors.success);
}

// Função para obter anjo baseado no mês de nascimento
function getAngelByMonth(month) {
    const monthNumber = parseInt(month);
    if (monthNumber >= 1 && monthNumber <= 12) {
        return siteConfig.angelsByMonth[monthNumber];
    }
    return siteConfig.angelsByMonth[10]; // Retorna Jeremiel (outubro) por padrão
}

// Aplicar configurações quando a página carregar
document.addEventListener('DOMContentLoaded', applyConfig);

// Exportar configurações para uso global
window.siteConfig = siteConfig;
