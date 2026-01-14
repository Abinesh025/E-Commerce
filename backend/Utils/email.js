import nodemailer from "nodemailer"

export const getEmail = async options =>{

    const transport = {

        host:process.env.SMTP_HOST_NAME,
        port:process.env.SMTP_PORT_NAME,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASSWORD
        }
    }

    const shifter = nodemailer.createTransport(transport);

    const message = {
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_MAIL}>`,
        to:options.email,
        sub:options.sub,
        text:options.txt
    }

   await shifter.sendMail(message);
}