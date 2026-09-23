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
        // Quitar el indicador de escribiendo
        escribiendoDiv.remove();

        let respuestaBot = generarRespuestaBot(textoUsuario);
        agregarMensajeAChat(respuestaBot, 'bot');
    }, 900);
}

// Función para pintar los mensajes en pantalla y hacer scroll automático hacia abajo
function agregarMensajeAChat(mensaje, remitente) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add('mensaje', remitente === 'usuario' ? 'mensaje-usuario' : 'mensaje-bot');
    
    // Si el mensaje tiene HTML (imágenes), lo pone como HTML, si no como texto normal
    if (typeof mensaje === 'string' && mensaje.includes('<img')) {
        nuevoDiv.innerHTML = mensaje;
    } else {
        nuevoDiv.textContent = mensaje;
    }
    
    chatMensajes.appendChild(nuevoDiv);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// respuestas basicas
function generarRespuestaBot(texto) {
    const msg = texto.toLowerCase();
    
    if (msg.includes("saludar") || msg.includes("hola")) {
        return "¡Hola! ¿Cómo estas? Cuentame en que puedo ayudarte?";
    } 
    else if (msg.includes("javascript") || msg.includes("js")) {
        return "JavaScript (JS) es un lenguaje genial y dinámico para crear páginas web interactivas";
    } 
    else if (msg.includes("yo le digo hola") || msg.includes("le digo hola")) {
        return "Y ella me dice Goodbye.";
    } 
    else if (msg.includes("le digo nena como tu ya no hay") || msg.includes("nena como tu ya no hay")) {
        return "Me dice que tiene novio pero yo no le creo, y esque se complica cada vez que la veo eo";
    } 
    else if (msg.includes("html") || msg.includes("ht")) {
        return "HTML (HT) es el lenguaje de marcado estándar utilizado para estructurar y desplegar páginas web";
    } 
    else if (msg.includes("css") || msg.includes("cs")) {
        return "CSS (CS) es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado en HTML";
    } 
    else if (msg.includes("k&p") || msg.includes("nosotros") || msg.includes("kyp") || msg.includes("que hacemos") || msg.includes("servicios")) {
        return "K&P Colombia es una empresa dedicada a brindar soluciones integrales en capacitaciones empresariales, asesorías corporativas y gestión de SST en convenio con ARL SURA";
    } 
    else if (msg.includes("creadores") || msg.includes("quienes son") || msg.includes("desarrolladores") || msg.includes("autor")) {
        return "Este proyecto y su chatbox fueron creados por: Juan Manuel Arbeláez García, Samantha Polo y Emiliano Jaramillo";
    } 
    else if (msg.includes("nombre")) {
        return "Soy tu asistente virtual oficial de K&P Colombia, en que puedo ayudarte?";
    }
    else if (msg.includes("juan manuel") || msg.includes("arbelaez") || msg.includes("arbeláez") || msg.includes("quien es arbelaez") || msg.includes("quien es juan manuel")) {
        return "El Legendario Juan Manuel Arbeláez García es un desarrollador web y creador de este proyecto, especializado en soluciones digitales y programación Junior de páginas web, con un enfoque en la experiencia del usuario y la funcionalidad de las aplicaciones web.";
    }

    // ========== BROMA CON POLO Y EMILIANO ==========
    else if (msg.includes("polo y emiliano") || msg.includes("emiliano y polo")) {
        return `
            <img src="images/polo.jpeg" alt="Polo" style="max-width:100%; border-radius:8px; margin-bottom:6px;">
            <img src="images/emiliano.jpeg" alt="Emiliano" style="max-width:100%; border-radius:8px; margin-bottom:6px;">
            <br>estos dos no hicieron una monda
        `;
    }
    else if (msg.includes("polo")) {
        return `
            <img src="images/polo.jpeg" alt="Polo" style="max-width:100%; border-radius:8px; margin-bottom:6px;">
            <br>Polo no aportó na
        `;
    }
    else if (msg.includes("emiliano")) {
        return `
            <img src="images/emiliano.jpeg" alt="Emiliano" style="max-width:100%; border-radius:8px; margin-bottom:6px;">
            <br>Emiliano no aportó na
        `;
    }
    // ===============================================
    else if (msg.includes("alejinimasturbini")) {
        return "COMENTAS TUS FALACIAS PALABRAS DE TU SUCIA BOCA ANTE EL SAGRADO NALGÓN QUW TODOS AMAMOS, NUESTRO GENERAL FRUHER EL NAZI SUPREMO USUARIO DE GRAP AL FALLO +, ridley DE MRDA";
    } 
    else if (msg.includes("que eres")) {
        return "soy una IA creada para ayudarte con tus dudas sobre K&P Colombia y sus servicios, asi como también asistente general de la empresa, Cometame que nesecitas saber.....";
    } 
    // =========nuevas respuestas ==========
    else if (msg.includes("contacto") || msg.includes("teléfono") || msg.includes("telefono") || msg.includes("correo") || msg.includes("email") || msg.includes("whatsapp")) {
        return "Puedes contactarnos por WhatsApp o correo electrónico. Escríbenos y con gusto te atendemos. ¿Quieres que te pase el número o el correo?";
    }
    else if (msg.includes("ubicación") || msg.includes("ubicacion") || msg.includes("dirección") || msg.includes("direccion") || msg.includes("dónde están") || msg.includes("donde estan")) {
        return "Estamos ubicados en Colombia y atendemos a nivel nacional. Si necesitas la dirección exacta o zona de cobertura, ¡házmelo saber!";
    }
    else if (msg.includes("precios") || msg.includes("costos") || msg.includes("cuánto cuesta") || msg.includes("cuanto cuesta") || msg.includes("tarifas")) {
        return "Los precios varían según el tipo de capacitación o asesoría que necesites. Cuéntame qué servicio te interesa y te doy información más precisa.";
    }
    else if (msg.includes("horario") || msg.includes("horarios") || msg.includes("horario de atención")) {
        return "Nuestro horario de atención es de lunes a viernes. Si necesitas atención fuera de ese horario, déjanos tu mensaje y te respondemos lo antes posible.";
    }
    else if (msg.includes("sst") || msg.includes("seguridad y salud") || msg.includes("sg-sst")) {
        return "Ofrecemos gestión integral de SST y Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) en convenio con ARL SURA. ¿Necesitas implementación, actualización o capacitación?";
    }
    else if (msg.includes("capacitaciones") || msg.includes("cursos") || msg.includes("entrenamiento")) {
        return "Tenemos capacitaciones empresariales en diferentes temas, incluyendo SST, trabajo en alturas, primeros auxilios, brigadas y más. ¿Sobre qué tema te gustaría información?";
    }
    else if (msg.includes("trabajo en alturas") || msg.includes("alturas")) {
        return "Sí, ofrecemos capacitaciones de Trabajo en Alturas según la normativa vigente. Incluyen nivel básico, avanzado y reentrenamiento. ¿Quieres más detalles?";
    }
    else if (msg.includes("primeros auxilios")) {
        return "Contamos con cursos de Primeros Auxilios básicos y avanzados, ideales para brigadas y cumplimiento de SST. ¿Te interesa para tu empresa?";
    }
    else if (msg.includes("brigadas") || msg.includes("brigada de emergencia")) {
        return "Capacitamos y conformamos Brigadas de Emergencia (primeros auxilios, control de incendios, evacuación y rescate). ¿Necesitas armar o actualizar tu brigada?";
    }
    else if (msg.includes("arl") || msg.includes("sura")) {
        return "Trabajamos en convenio con ARL SURA para apoyar a las empresas en gestión de riesgos laborales y cumplimiento de SST. ¿En qué te podemos ayudar?";
    }
    else if (msg.includes("cómo contratar") || msg.includes("como contratar") || msg.includes("proceso")) {
        return "El proceso es sencillo: nos cuentas qué necesitas, te enviamos propuesta y agendamos. ¿Quieres que te oriente paso a paso?";
    }
    else if (msg.includes("certificado") || msg.includes("certificados")) {
        return "Todas nuestras capacitaciones entregan certificado. Dependiendo del curso puede ser avalado y válido ante ARL y Ministerio de Trabajo.";
    }   
    else if (msg.includes("quiénes somos") || msg.includes("quienes somos")) {
        return "Somos K&P Colombia, especialistas en capacitaciones empresariales, asesorías corporativas y gestión de SST en convenio con ARL SURA.";
    }
    // ==========================================
    else {
        return "Lo Siento, no puedo entender tu mensaje";
    }
}

// Eventos de clic en el botón de enviar y uso de la tecla "Enter"
btnEnviar.addEventListener('click', enviarMensaje);

inputText.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        enviarMensaje();
    }
});

// Ocultar badge de Netlify
function ocultarBadgeNetlify() {
    const badges = document.querySelectorAll('a[href*="netlify"], iframe[src*="netlify"], .netlify-badge');
    badges.forEach(badge => badge.remove());
}

// Se ejecuta varias veces por si Netlify lo inyecta tarde
ocultarBadgeNetlify();
setTimeout(ocultarBadgeNetlify, 1000);
setTimeout(ocultarBadgeNetlify, 3000);
setInterval(ocultarBadgeNetlify, 5000);