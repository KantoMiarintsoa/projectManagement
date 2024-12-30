import { sendInvitation, findInvitationsByEmail } from '../service/invitationService.js'

export async function sendInvitationController(req, res) {
    const { senderEmail, recipientEmail, subject, message } = req.body;

    try {
        await sendInvitation(senderEmail, recipientEmail, subject, message);
        res.status(200).send('Invitation envoyée avec succès.');
    } catch (error) {
        res.status(500).send('Erreur lors de l\'envoi de l\'invitation.');
    }
}
export async function searchInvitationsController(req, res) {
    const { email } = req.query;
    try {
        const invitations = await findInvitationsByEmail(email);
        res.status(200).json(invitations);
    } catch (error) {
        res.status(500).send('Erreur lors de la recherche des invitations.');
    }
}
