// Global variables
let currentStep = 1;
let userData = {
    firstName: '',
    gender: '',
    month: '',
    day: '',
    year: '',
    angel: null
};

// Configuração da URL de checkout - ALTERE AQUI SUA URL REAL
const CHECKOUT_URL = 'https://pay.hotmart.com/P101801752S?off=d6tzczic';

// Initialize the page with performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Use requestIdleCallback para tarefas não críticas
    if (window.requestIdleCallback) {
        requestIdleCallback(() => {
            populateDateSelects();
            setupAutoSave();
        });
    } else {
        setTimeout(() => {
            populateDateSelects();
            setupAutoSave();
        }, 100);
    }
    
    // Tarefas críticas executadas imediatamente
    loadProgress();
    updateProgressBar();
    setupGenderAutoAdvance();
});

// Setup auto-save for form fields
function setupAutoSave() {
    // Auto-save para nome
    const firstNameField = document.getElementById('firstName');
    if (firstNameField) {
        firstNameField.addEventListener('input', function() {
            userData.firstName = this.value;
            saveProgress();
        });
    }
    
    // Auto-save para data de nascimento
    const monthField = document.getElementById('month');
    const dayField = document.getElementById('day');
    const yearField = document.getElementById('year');
    
    if (monthField) {
        monthField.addEventListener('change', function() {
            userData.month = this.value;
            saveProgress();
        });
    }
    
    if (dayField) {
        dayField.addEventListener('change', function() {
            userData.day = this.value;
            saveProgress();
        });
    }
    
    if (yearField) {
        yearField.addEventListener('change', function() {
            userData.year = this.value;
            saveProgress();
        });
    }
}

// Populate day and year selects
function populateDateSelects() {
    const daySelect = document.getElementById('day');
    const yearSelect = document.getElementById('year');
    
    // Populate days (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // Populate years (1940-2023)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1940; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// Setup gender auto-advance
function setupGenderAutoAdvance() {
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    genderOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (currentStep === 2) {
                userData.gender = this.value;
                saveProgress(); // Salvar progresso
                
                // Evento de pixel removido para evitar duplicação
                
                setTimeout(() => {
                    nextStep();
                }, 800); // Pequeno delay para feedback visual
            }
        });
    });
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const steps = document.querySelectorAll('.step');
    
    // Update progress bar width
    const progressWidth = (currentStep / 3) * 100;
    progressFill.style.width = progressWidth + '%';
    
    // Update step indicators
    steps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Validate current step
function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            const firstName = document.getElementById('firstName').value.trim();
            if (!firstName) {
                showNotification('Por favor, ingresa tu nombre.', 'warning');
                const nameField = document.getElementById('firstName');
                if (nameField) {
                    nameField.focus();
                    nameField.classList.add('error-shake');
                    setTimeout(() => nameField.classList.remove('error-shake'), 600);
                }
                return false;
            }
            userData.firstName = firstName;
            
            // Evento do pixel para primeiro passo completado
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }
            
            return true;
            
        case 2:
            const gender = document.querySelector('input[name="gender"]:checked');
            if (!gender) {
                showNotification('Por favor, selecciona tu género.', 'warning');
                const genderSection = document.querySelector('.gender-options');
                if (genderSection) {
                    genderSection.classList.add('error-shake');
                    setTimeout(() => genderSection.classList.remove('error-shake'), 600);
                }
                return false;
            }
            userData.gender = gender.value;
            return true;
            
        case 3:
            const month = document.getElementById('month').value;
            const day = document.getElementById('day').value;
            const year = document.getElementById('year').value;
            
            if (!month || !day || !year) {
                showNotification('Por favor, completa tu fecha de nacimiento.', 'warning');
                const dateSection = document.querySelector('.date-inputs');
                if (dateSection) {
                    dateSection.classList.add('error-shake');
                    setTimeout(() => dateSection.classList.remove('error-shake'), 600);
                }
                return false;
            }
            
            userData.month = month;
            userData.day = day;
            userData.year = year;
            return true;
            
        default:
            return true;
    }
}

// Move to next step
function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    if (currentStep < 3) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Move to next step
        currentStep++;
        
        // Show next step
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update progress
        updateProgressBar();
        
        // Save progress
        saveProgress();
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Generate reading (final step)
function generateReading() {
    if (!validateCurrentStep()) {
        return;
    }
    
    // Determinar o anjo baseado no mês de nascimento
    userData.angel = getAngelByMonth(userData.month);
    
    // Evento do pixel para geração de resultado
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CompleteRegistration');
    }
    
    // Save progress before proceeding
    saveProgress();
    
    // Hide step 3
    document.getElementById('step3').classList.remove('active');
    
    // Show loading screen
    document.getElementById('loading').classList.add('active');
    
    // Update user names and angel info in result screens
    updateUserNames();
    updateAngelInfo();
    
    // Simulate loading time
    setTimeout(() => {
        document.getElementById('loading').classList.remove('active');
        document.getElementById('results').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
}

// Update user names in result screens
function updateUserNames() {
    const firstName = userData.firstName;
    const userNameElements = [
        'userName',
        'userNameResult', 
        'userNameOffer',
        'userNameDear'
    ];
    
    userNameElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = firstName;
        }
    });
}

// Update angel information in result screens
function updateAngelInfo() {
    if (!userData.angel) return;
    
    const angel = userData.angel;
    
    // Atualizar todos os elementos com nome do anjo
    const angelElements = [
        'angelNameTitle',
        'angelNameText', 
        'angelNameText2',
        'angelNameDetails',
        'angelNameOffer',
        'angelNameOfferDetails'
    ];
    
    angelElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = angel.name;
        }
    });
    
    // Atualizar imagem do anjo
    const angelImage = document.getElementById('angelImage');
    if (angelImage) {
        angelImage.src = angel.image;
        angelImage.alt = `Arcángel ${angel.name}`;
    }
    
    // Atualizar descrição do anjo
    const angelDescription = document.getElementById('angelDescription');
    if (angelDescription) {
        angelDescription.textContent = `El nombre de ${angel.name} se traduce como "${angel.meaning}". ${angel.description}`;
    }
    
    // Atualizar botão de descoberta
    const discoverBtn = document.getElementById('discoverBtn');
    if (discoverBtn) {
        discoverBtn.textContent = `Haz Clic Aquí Para Descubrir Cómo Conectarte Con El Arcángel ${angel.name}`;
    }
}

// Show offer screen
function showOffer() {
    document.getElementById('results').classList.remove('active');
    document.getElementById('offer').classList.add('active');
    
    // Marcar no localStorage que o usuário chegou na VSL
    localStorage.setItem('angelOasisVSLReached', 'true');
    
    // Evento do pixel para visualização da VSL
    if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: 'VSL - Video Sales Letter'
        });
    }
    
    // Configurar botão do carrinho com parâmetros
    setupCartButton();
    
    // Inicializar o player de vídeo apenas quando a página aparecer
    if (typeof initializePlayer === 'function') {
        initializePlayer();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Centralizar e destacar o vídeo após um pequeno delay
    setTimeout(() => {
        const videoElement = document.querySelector('.video-placeholder');
        if (videoElement) {
            // Adicionar classe de destaque
            videoElement.classList.add('highlighted');
            
            // Centralizar o vídeo na tela
            videoElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            
            // Remover classe de destaque após 3 segundos
            setTimeout(() => {
                videoElement.classList.remove('highlighted');
            }, 3000);
        }
    }, 3000);
}

// Setup cart button with parameters
function setupCartButton() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn && !addToCartBtn.hasAttribute('data-configured')) {
        addToCartBtn.setAttribute('data-configured', 'true');
        addToCartBtn.addEventListener('click', function() {
            // Eventos de pixel do Facebook removidos
            
            // Se existe a função global, usa ela
            if (window.redirectWithParams) {
                window.redirectWithParams(CHECKOUT_URL);
                return;
            }
            
            // Fallback: construir URL manualmente
            const url = new URL(CHECKOUT_URL);
            
            // Adicionar dados do usuário para Hotmart
            if (userData && userData.firstName) {
                url.searchParams.set('name', userData.firstName);
            }
            if (userData && userData.gender) {
                url.searchParams.set('gender', userData.gender);
            }
            if (userData && userData.angel && userData.angel.name) {
                url.searchParams.set('angel', userData.angel.name);
            }
            
            // Adicionar parâmetros da URL atual
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.forEach((value, key) => {
                if (!url.searchParams.has(key)) {
                    url.searchParams.set(key, value);
                }
            });
            
            window.location.href = url.toString();
        });
    }
}

// Add event listeners for gender selection
document.addEventListener('DOMContentLoaded', function() {
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    genderOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Auto-advance after gender selection (optional)
            setTimeout(() => {
                if (validateCurrentStep()) {
                    // You can enable auto-advance here if desired
                    // nextStep();
                }
            }, 500);
        });
    });
});

// Add animation effects
function addAnimationEffects() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Call animation effects when page loads
document.addEventListener('DOMContentLoaded', addAnimationEffects);

// Add some easter eggs and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }, 150);
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeStep = document.querySelector('.step-content.active');
        const continueBtn = activeStep.querySelector('.continue-btn, .discover-btn, .add-to-cart-btn');
        if (continueBtn) {
            continueBtn.click();
        }
    }
});

// Angel names array for randomization (optional enhancement)
const angelNames = [
    'Jeremiel',
    'Gabriel',
    'Michael',
    'Raphael',
    'Uriel',
    'Chamuel',
    'Jophiel',
    'Zadkiel'
];

// Function to get angel based on birth date (optional enhancement)
function getGuardianAngel(month, day) {
    // Simple algorithm to assign angel based on birth date
    const dateValue = parseInt(month) + parseInt(day);
    const angelIndex = dateValue % angelNames.length;
    return angelNames[angelIndex];
}

// Local storage functions to save user progress
function saveProgress() {
    localStorage.setItem('angelOasisProgress', JSON.stringify({
        currentStep: currentStep,
        userData: userData
    }));
}

function loadProgress() {
    // Verificar se o usuário já chegou na VSL
    const vslReached = localStorage.getItem('angelOasisVSLReached');
    if (vslReached === 'true') {
        // Se já chegou na VSL, redirecionar diretamente para lá
        const saved = localStorage.getItem('angelOasisProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                userData = { ...userData, ...progress.userData };
                
                // Esconder todas as etapas
                document.querySelectorAll('.step-content').forEach(step => {
                    step.classList.remove('active');
                });
                
                // Mostrar diretamente a VSL
                document.getElementById('offer').classList.add('active');
                
                // Atualizar informações do usuário na VSL
                updateUserNames();
                updateAngelInfo();
                
                // Configurar botão do carrinho
                setupCartButton();
                
                // Inicializar player se necessário
                if (typeof initializePlayer === 'function') {
                    initializePlayer();
                }
                
                return; // Sair da função aqui
            } catch (error) {
                console.log('Error al cargar progreso VSL:', error);
                // Em caso de erro, continuar com o fluxo normal
            }
        }
    }
    
    // Fluxo normal se não chegou na VSL ainda
    const saved = localStorage.getItem('angelOasisProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            currentStep = progress.currentStep || 1;
            userData = { ...userData, ...progress.userData };
            
            // Esconder todas as etapas
            document.querySelectorAll('.step-content').forEach(step => {
                step.classList.remove('active');
            });
            
            // Mostrar etapa atual
            const currentStepElement = document.getElementById(`step${currentStep}`);
            if (currentStepElement) {
                currentStepElement.classList.add('active');
            }
            
            // Restore form values
            if (userData.firstName) {
                const firstNameField = document.getElementById('firstName');
                if (firstNameField) firstNameField.value = userData.firstName;
            }
            
            if (userData.gender) {
                const genderField = document.querySelector(`input[name="gender"][value="${userData.gender}"]`);
                if (genderField) genderField.checked = true;
            }
            
            if (userData.month) {
                const monthField = document.getElementById('month');
                if (monthField) monthField.value = userData.month;
            }
            
            if (userData.day) {
                const dayField = document.getElementById('day');
                if (dayField) dayField.value = userData.day;
            }
            
            if (userData.year) {
                const yearField = document.getElementById('year');
                if (yearField) yearField.value = userData.year;
            }
            
            // Atualizar barra de progresso
            updateProgressBar();
            
        } catch (error) {
            console.log('Error al cargar progreso:', error);
            // Si hay error, comenzar desde el inicio
            currentStep = 1;
        }
    }
}

// Clear progress (useful for testing or reset)
function clearProgress() {
    localStorage.removeItem('angelOasisProgress');
    localStorage.removeItem('angelOasisVSLReached');
    location.reload();
}

// Clear VSL flag specifically (useful for testing)
function clearVSLFlag() {
    localStorage.removeItem('angelOasisVSLReached');
    console.log('VSL flag cleared - user will go through normal flow on next reload');
}

// Sistema de notificações elegante
function showNotification(message, type = 'info') {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Ícones para diferentes tipos de notificação
function getNotificationIcon(type) {
    const icons = {
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    return icons[type] || icons['info'];
}
