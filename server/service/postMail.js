const express = require('express');
const router = express.Router();
const mailer = require("nodemailer");

router.post('/', async (req, res) => {
    const transporter = mailer.createTransport(
        {
            host: 'smtp.mail.ru',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                // Пожалуйста, используйте свой собственный аккаунт для рассылки
                user: 'nkornasevich@mail.ru', // (замените звездочики на название вашего почтового ящика)
                pass: 'superkornas27' //  (замените звездочики на пароль вашего почтового ящика)
            }
        },
        {
            from: 'Mailer Test <nkornasevich@mail.ru>',
        }
    );

    const mail = {
        from: "Plasticod <nkornasevich@mail.ru>",
        to: "nkornasevich@mail.ru",
        subject: "Новый заказ plasticod.by",
        text: "order text",
        html: `
        ФИО: ${req.body.fullName}<br>
        E-mail: ${req.body.email}<br>
        Номер телефона: ${req.body.phoneNumber}<br>
        Код заказа: ${req.body.numberOrder}<br>
        Тип доставки: ${req.body.shipping === "transportCompany" ? "Транспортной компанией" : "Самовывоз"}<br><br>
        
        <b>Для уточнения деталей заказа перейдите в панель администратора. </b>
        `
    };

    transporter.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + req.body.email);
        }

        transporter.close();
    });
});


module.exports = router;