const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // O el puerto que elijas

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar el servicio que prefieras
    auth: {
        user: 'nashmzdgo@gmail.com', // Reemplaza con tu correo electrónico
        pass: 'osopardo21R'   // Reemplaza con tu contraseña de correo
    }
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el envío de tickets
app.post('/tickets', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'support@gamehub.com', // Reemplaza con el correo electrónico de soporte
        subject: 'Nuevo Ticket de Soporte',
        text: `Nombre: ${name}\nCorreo Electrónico: ${email}\n\nMensaje:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el ticket. Inténtalo de nuevo más tarde.');
        } else {
            console.log('Correo enviado:', info.response);
            res.status(200).send('Ticket enviado correctamente.');
        }
    });
});

// Servir archivos estáticos (si es necesario)
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
