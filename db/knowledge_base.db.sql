-- K&P Colombia Knowledge Base Database
-- Purpose: Store training information, contacts, and chat interactions

-- Training Courses Table
-- Contains information about available capacitaciones
CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    categoria TEXT,
    duracion TEXT,
    certificacion TEXT,
    nivel TEXT,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions Table
-- Stores contact forms from various pages
CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    empresa TEXT,
    email TEXT NOT NULL,
    telefono TEXT,
    mensaje TEXT,
    pagina_origen TEXT,
    fecha_envio TEXT DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'pendiente'
);

-- Chat Messages Table
-- Stores chat interactions from the chat widget
CREATE TABLE IF NOT EXISTS mensajes_chat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    remitente TEXT CHECK(remitente IN ('usuario', 'bot')),
    mensaje TEXT NOT NULL,
    pagina TEXT,
    fecha_hora TEXT DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'leido'
);

-- Seminars/Events Table
-- Stores information about seminars and workshops
CREATE TABLE IF NOT EXISTS seminarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    tipo TEXT,
    fecha TEXT,
    lugar TEXT,
    descripcion TEXT,
    ponentes TEXT,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Insert training courses
INSERT INTO cursos (nombre, descripcion, categoria, duracion, certificacion, nivel) VALUES
('Seguridad y Salud en el Trabajo', 'Formación en prevención de riesgos laborales, prácticas seguras y fortalecimiento de la cultura de seguridad', 'SST', '1 día', 'Aprobado por ARL SURA', 'Básico'),
('Trabajo en Alturas', 'Capacitación y reentrenamiento para realizar trabajos en alturas con prácticas seguras', 'SST', '2 días', 'Certificado ARL SURA', 'Básico'),
('Trabajo en Alturas Avanzado', 'Capacitación avanzada para líderes y supervisores de trabajo en alturas', 'SST', '1 día', 'Certificado ARL SURA', 'Avanzado'),
('Primeros Auxilios Básicos', 'Formación para responder ante emergencias con primeros auxilios y evacuación', 'Emergencia', '1 día', 'Incluido en brigada', 'Básico'),
('Primeros Auxilios Avanzados', 'Formación avanzada en primeros auxilios y manejo de emergencias', 'Emergencia', '1 día', 'Certificado K&P', 'Avanzado'),
('Brigadas de Emergencia', 'Conformación de brigadas empresariales con primeros auxilios, control de incendios y rescate', 'Emergencia', '2 días', 'Certificado K&P', 'Intermedio'),
('Gestión de SST', 'Asesoría corporativa para implementación de Sistema de Gestión de Seguridad y Salud en el Trabajo', 'SST', 'Variable', 'Aprobado ARL SURA', 'Avanzado');

-- Insert contact form submissions
INSERT INTO contactos (nombre, empresa, email, telefono, mensaje, pagina_origen, estado) VALUES
('Empresa Test', 'Test Corp', 'test@test.com', '3001234567', 'Solicito información sobre capacitaciones de SST', 'index.html', 'pendiente'),
('Cliente Demo', 'Demo S.A', 'demo@demo.com', '3109876543', 'Interesado en taller de trabajo en alturas', 'capacitaciones.html', 'pendiente');

-- Insert seminar records
INSERT INTO seminarios (titulo, tipo, fecha, lugar, descripcion, ponentes) VALUES
('Avances, Desafíos y Seguridad en la Mecanización de la Cosecha Forestal en Colombia', 'Seminario Internacional', '2023-10-15', 'Medellín', 'Encuentro técnico sobre mecanización, seguridad operacional y desafíos de la cosecha forestal', 'Juan Manuel Arbeláez, Samantha Polo'),
('Seguridad y Salud Ocupacional en la Prevención de Accidentes en Incendios Forestales en Chile', 'Seminario Técnico', '2022-11-20', 'Bogotá', 'Prevención, seguridad y salud ocupacional aplicadas a operaciones vinculadas a incendios forestales', 'Emiliano Jaramillo'),
('Chile, País Forestal: Situación Actual y Desarrollo Próximo Decenio', 'Seminario Sectorial', '2023-06-10', 'Cali', 'Institucionalidad, gremios, tecnología aplicada, nuevas tendencias y desafíos futuros del sector forestal', 'Samantha Polo, Juan Manuel Arbeláez');

-- Insert initial chat messages (bot welcome messages)
INSERT INTO mensajes_chat (remitente, mensaje, pagina, estado) VALUES
('bot', '¡Hola! ¿En qué te puedo ayudar hoy?', 'index.html', 'leido'),
('bot', '¡Hola! Pregúntame sobre el convenio ARL SURA o nuestras asesorías corporativas.', 'convenio.html', 'leido'),
('bot', '¡Hola! ¿Qué capacitación te interesa conocer?', 'capacitaciones.html', 'leido'),
('bot', '¡Hola! Pregúntame sobre K&P Colombia y sus servicios.', 'TrabajoR.html', 'leido');