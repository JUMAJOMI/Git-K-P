from flask import Flask, request, redirect
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Configuración de la base de datos SQLite (Cumpliendo con lo pedido)
DB_PATH = 'knowledge_base.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS solicitudes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            empresa TEXT NOT NULL,
            correo TEXT NOT NULL,
            detalle TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Inicializar la base de datos al arrancar
init_db()

# Función para enviar el correo electrónico
def enviar_correo(empresa, correo_cliente, detalle):
    # CORREO DE DESTINO (Donde quieres recibir los avisos de la empresa)
    DESTINATARIO = "jumadiscor00@gmail.com" 
    
    # TUS CREDENCIALES DE ENVÍO
    REMITENTE = "jumadiscor00@gmail.com"  # Tu correo de Gmail
    PASSWORD = "Juma0902"   # Tu contraseña de aplicación de 9 dígitos (no tu contraseña normal de Gmail)

    asunto = f"Nueva Solicitud de Asesoría - {empresa}"
    cuerpo = f"""
    ¡Has recibido una nueva solicitud desde la web de K&P COLOMBIA!

    - Empresa / Organización: {empresa}
    - Correo de Contacto: {correo_cliente}
    
    Detalle de la Solicitud:
    {detalle}
    """

    msg = MIMEMultipart()
    msg['From'] = REMITENTE
    msg['To'] = DESTINATARIO
    msg['Subject'] = asunto
    msg.attach(MIMEText(cuerpo, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(REMITENTE, PASSWORD)
        server.send_message(msg)
        server.quit()
        print("Correo enviado exitosamente.")
    except Exception as e:
        print(f"Error al enviar correo: {e}")

# Ruta del formulario
@app.route('/enviar-solicitud', methods=['POST'])
def enviar_solicitud():
    empresa = request.form.get('empresa')
    correo = request.form.get('correo')
    detalle = request.form.get('detalle')

    if not empresa or not correo or not detalle:
        return "Por favor completa todos los campos.", 400

    # 1. Guardar en la base de datos SQL
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO solicitudes (empresa, correo, detalle) VALUES (?, ?, ?)',
        (empresa, correo, detalle)
    )
    conn.commit()
    conn.close()

    # 2. Enviar la notificación por correo
    enviar_correo(empresa, correo, detalle)

    # 3. Alerta y redirección visual
    return '''
        <script>
            alert("¡Solicitud enviada con éxito! Guardada en la base de datos y correo notificado.");
            window.location.href = "/convenio.html";
        </script>
    '''

if __name__ == '__main__':
    app.run(debug=True, port=5000)