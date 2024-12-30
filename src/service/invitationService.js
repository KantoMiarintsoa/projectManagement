import nodemailer from 'nodemailer';
import Invitation from '../models/invitationModel.js';
export async function sendInvitation(senderEmail, recipientEmail, subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kanto@gmail.com', 
            pass: 'your-password',     
        },
    });

    const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: subject,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé : ' + info.response);

        // Enregistrer dans la base de données
        await Invitation.create({
            senderEmail,
            recipientEmail,
            subject,
            message,
        });

        return info.response;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email : ', error);
        throw error;
    }
}

export async function findInvitationsByEmail(email) {
    try {
        return await Invitation.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderEmail: email },
                    { recipientEmail: email },
                ],
            },
        });
    } catch (error) {
        console.error('Erreur lors de la recherche des invitations : ', error);
        throw error;
    }
}
