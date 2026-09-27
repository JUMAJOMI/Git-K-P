// ================= JAVASCRIPT DEL CHATBOX K&P COLOMBIA =================

const chatWidget = document.getElementById('chatWidget');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatContainer = document.getElementById('chatContainer');
const chatCloseBtn = document.getElementById('chatCloseBtn');

const inputText = document.getElementById('inputText');
const btnEnviar = document.getElementById('btnEnviar');
const chatMensajes = document.getElementById('chatMensajes');

// Abrir y cerrar el chat al hacer clic en la burbuja flotante
chatToggleBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('active');
    if (chatContainer.classList.contains('active')) {
        inputText.focus();
    }
});

// Botón para cerrar la ventana del chat con la "X"
chatCloseBtn.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Función principal para enviar el mensaje del usuario
function enviarMensaje() {
    const textoUsuario = inputText.value.trim();
    if (textoUsuario === "") return;

    agregarMensajeAChat(textoUsuario, 'usuario');
    inputText.value = "";

    // Mostrar indicador de "escribiendo..."
    const escribiendoDiv = document.createElement('div');
    escribiendoDiv.classList.add('mensaje', 'mensaje-bot', 'escribiendo');
    escribiendoDiv.innerHTML = '<span class="punto"></span><span class="punto"></span><span class="punto"></span>';
    chatMensajes.appendChild(escribiendoDiv);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;

    // Simula el tiempo de respuesta del bot
    setTimeout(() => {
        escribiendoDiv.remove();
        const respuestaBot = generarRespuestaBot(textoUsuario);
        agregarMensajeAChat(respuestaBot, 'bot');
    }, 900);
}

// Pinta un mensaje en pantalla y hace scroll automático hacia abajo.
// IMPORTANTE: siempre se inserta como texto plano (textContent), nunca como
// HTML. La versión anterior usaba innerHTML cuando el mensaje contenía la
// cadena "<img", y esa comprobación se aplicaba también a lo que escribe
// el usuario: cualquiera podía escribir algo como "<img src=x onerror=...>"
// en el chat y ejecutar JavaScript arbitrario en la página (XSS). Ahora el
// contenido del usuario y del bot se trata siempre como texto seguro.
function agregarMensajeAChat(mensaje, remitente) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add('mensaje', remitente === 'usuario' ? 'mensaje-usuario' : 'mensaje-bot');
    nuevoDiv.textContent = mensaje;

    chatMensajes.appendChild(nuevoDiv);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// Quita acentos y pasa a minúsculas, para no tener que repetir cada
// palabra clave con y sin tilde ("direccion" / "dirección").
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Reglas de respuesta del asistente. Antes esto era una cadena larga de
// if/else if con contenido de broma interno (chistes sobre compañeros,
// referencias ofensivas e insultos) que no debería existir en un chatbot
// público de cara al cliente. Se retiró ese contenido por completo y se
// dejaron solo las respuestas informativas sobre la empresa y sus
// servicios, en una estructura de datos más fácil de mantener y ampliar.
const reglasRespuesta = [
    { palabras: ['hola', 'saludar'], respuesta: '¡Hola! ¿Cómo estás? Cuéntame en qué puedo ayudarte.' },
    { palabras: ['javascript', 'js'], respuesta: 'JavaScript (JS) es un lenguaje dinámico usado para crear páginas web interactivas.' },
    { palabras: ['html'], respuesta: 'HTML es el lenguaje de marcado estándar utilizado para estructurar el contenido de las páginas web.' },
    { palabras: ['css'], respuesta: 'CSS es el lenguaje que define la presentación visual de un documento HTML.' },
    { palabras: ['k&p', 'kyp', 'que hacemos', 'servicios', 'quienes somos'], respuesta: 'K&P Colombia es una empresa dedicada a brindar soluciones integrales en capacitaciones empresariales, asesorías corporativas y gestión de SST en convenio con ARL SURA.' },
    { palabras: ['creadores', 'quienes son', 'desarrolladores', 'autor'], respuesta: 'Este proyecto y su chatbox fueron desarrollados por Juan Manuel Arbeláez García, Samantha Polo y Emiliano Jaramillo.' },
    { palabras: ['nombre'], respuesta: 'Soy el asistente virtual de K&P Colombia. ¿En qué puedo ayudarte?' },
    { palabras: ['que eres'], respuesta: 'Soy una IA creada para resolver tus dudas sobre K&P Colombia y sus servicios. Cuéntame qué necesitas saber.' },
    { palabras: ['contacto', 'telefono', 'correo', 'email', 'whatsapp'], respuesta: 'Puedes contactarnos por WhatsApp o correo electrónico. Escríbenos y con gusto te atendemos. ¿Quieres que te pase el número o el correo?' },
    { palabras: ['ubicacion', 'direccion', 'donde estan'], respuesta: 'Estamos ubicados en Colombia y atendemos a nivel nacional. Si necesitas la dirección exacta o zona de cobertura, ¡házmelo saber!' },
    { palabras: ['precios', 'costos', 'cuanto cuesta', 'tarifas'], respuesta: 'Los precios varían según el tipo de capacitación o asesoría que necesites. Cuéntame qué servicio te interesa y te doy información más precisa.' },
    { palabras: ['horario'], respuesta: 'Nuestro horario de atención es de lunes a viernes. Si necesitas atención fuera de ese horario, déjanos tu mensaje y te respondemos lo antes posible.' },
    { palabras: ['sst', 'seguridad y salud', 'sg-sst'], respuesta: 'Ofrecemos gestión integral de SST y del Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) en convenio con ARL SURA. ¿Necesitas implementación, actualización o capacitación?' },
    { palabras: ['capacitaciones', 'cursos', 'entrenamiento'], respuesta: 'Tenemos capacitaciones empresariales en diferentes temas, incluyendo SST, trabajo en alturas, primeros auxilios, brigadas y más. ¿Sobre qué tema te gustaría información?' },
    { palabras: ['trabajo en alturas', 'alturas'], respuesta: 'Sí, ofrecemos capacitaciones de Trabajo en Alturas según la normativa vigente: nivel básico, avanzado y reentrenamiento. ¿Quieres más detalles?' },
    { palabras: ['primeros auxilios'], respuesta: 'Contamos con cursos de Primeros Auxilios básicos y avanzados, ideales para brigadas y cumplimiento de SST. ¿Te interesa para tu empresa?' },
    { palabras: ['brigadas', 'brigada de emergencia'], respuesta: 'Capacitamos y conformamos Brigadas de Emergencia (primeros auxilios, control de incendios, evacuación y rescate). ¿Necesitas armar o actualizar tu brigada?' },
    { palabras: ['arl', 'sura'], respuesta: 'Trabajamos en convenio con ARL SURA para apoyar a las empresas en gestión de riesgos laborales y cumplimiento de SST. ¿En qué te podemos ayudar?' },
    { palabras: ['como contratar', 'proceso'], respuesta: 'El proceso es sencillo: nos cuentas qué necesitas, te enviamos una propuesta y agendamos. ¿Quieres que te oriente paso a paso?' },
    { palabras: ['certificado'], respuesta: 'Todas nuestras capacitaciones entregan certificado. Según el curso, puede estar avalado por ARL y el Ministerio de Trabajo.' },
];

const RESPUESTA_POR_DEFECTO = 'No logré entender tu mensaje. Puedes preguntarme por nuestras capacitaciones, la gestión de SST o el convenio con ARL SURA.';

function generarRespuestaBot(texto) {
    const mensajeNormalizado = normalizarTexto(texto);
    const regla = reglasRespuesta.find((r) =>
        r.palabras.some((palabra) => mensajeNormalizado.includes(normalizarTexto(palabra)))
    );
    return regla ? regla.respuesta : RESPUESTA_POR_DEFECTO;
}

// Eventos de clic en el botón de enviar y uso de la tecla "Enter"
btnEnviar.addEventListener('click', enviarMensaje);

inputText.addEventListener('keypress', function (evento) {
    if (evento.key === 'Enter') {
        enviarMensaje();
    }
});

// ================= MENÚ MÓVIL =================
// El botón hamburguesa (.menu-toggle) ya existía en el CSS pero no tenía
// ni elemento en el HTML ni lógica en JS: en pantallas pequeñas el menú
// no se podía abrir. Se añade aquí de forma defensiva (con comprobación
// de existencia) para que funcione en cualquier página que lo incluya.
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const abierto = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(abierto));
    });

    // Cierra el menú al elegir una opción, para no tener que cerrarlo a mano
    navMenu.querySelectorAll('a').forEach((enlace) => {
        enlace.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ================= OCULTAR BADGE DE NETLIFY =================
// La versión anterior sondeaba el DOM con setInterval cada 5 segundos para
// siempre, incluso si el badge nunca se inyecta o ya fue eliminado. Un
// MutationObserver reacciona de inmediato cuando el badge aparece en el
// DOM y no necesita seguir revisando en bucle mientras la pestaña esté
// abierta. Nota: si el sitio usa el plan gratuito de Netlify, revisa los
// términos de servicio antes de ocultar el badge de forma permanente.
function ocultarBadgeNetlify() {
    document
        .querySelectorAll('a[href*="netlify"], iframe[src*="netlify"], .netlify-badge')
        .forEach((badge) => badge.remove());
}

ocultarBadgeNetlify();
new MutationObserver(ocultarBadgeNetlify).observe(document.body, {
    childList: true,
    subtree: true,
});
