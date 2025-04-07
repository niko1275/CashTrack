import transport from "../config/nodemailer"

type  emailType = {
    name: string
    email:string
    token: string
}

export class authEmail {
    static sendConfirmationemail = async (user: emailType) => {
      try {
        const email = await transport.sendMail({
          from: 'CashTrackr <admin@gmail.com>',
          to: user.email,
          subject: 'Cashtrackr - Confirma tu cuenta',
          html: `
            <p>${user.name}, ya creaste tu cuenta en CashTrackr. ¡Ya casi está lista!</p>
            <p>Visita el siguiente enlace:</p>
            <a href="#">Confirmar Cuenta</a>
            <p>Y usa este código: <b>${user.token}</b></p>
          `
        });
  
        console.log("✅ Email enviado:", email.messageId); 
        return email;
      } catch (error) {
        console.error("Error al enviar email:", error);
        throw new Error("No se pudo enviar el correo");
      }
    }
  }