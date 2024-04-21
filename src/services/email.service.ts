import nodemailer from 'nodemailer';
import { configs } from '../configs/email.config';

export const sendEmailCreatedArticle = async(data: any) => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: configs.username,
            pass: configs.password
        }
    });
    const url = `${(data.url)}`;

    const mailOptions = {
        from: configs.username,
        to: data.email,
        subject: `Student ${data.name} has created a new contribution`,
        html: `<h1>Dear ${data.name}</h1>
                                <p>Your contribution has been successfully submitted to the website.</p>
                                <p>Click the link below to view your contribution.</p>
                                <a href="${url}">View</a>`
    };
    

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error.message);
            return;
        }
        console.log('Email sent:', info.response);
    });

}
export const sendEmailUpdateArticle = async(data: any) => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: configs.username,
            pass: configs.password
        }
    });
    const url = `${(data.url)}`;

    const mailOptions = {
        from: configs.username,
        to: data.email,
        subject: `Student ${data.name} has updated a contribution`,
        html: `<h1>Dear ${data.name}</h1>
                                <p>Your contribution has been successfully updated on the website.</p>
                                <p>Click the link below to view your contribution.</p>
                                <a href="${url}">View</a>`
    };
    

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error.message);
            return;
        }
        console.log('Email sent:', info.response);
    });

}

// const sendResetPassword = async(data) => {
//     const transporter = await nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: environmentConfig.email.user,
//             pass: environmentConfig.email.password
//         }
//     });
//     const url = `${environmentConfig.frontendDomain}auth/login?phone=${data.Phone}&password=${(data.Password)}`;

//     const mailOptions = {
//         from: environmentConfig.email.user,
//         to: data.Email,
//         subject: 'Mật khẩu của bạn đã được cập nhật',
//         html: `<h1>Chào ${data.FullName}</h1>
//                                 <p>Mật khẩu của bạn đã được cập nhật.</p>
//                                 <p>Tài khoản: <b>${data.Phone}</b></p>
//                                 <p>Mật khẩu mới của bạn là: <b>${data.Password}</b></p>
//                                 <p>Nhấn vào link bên dưới để đăng nhập vào tài khoản với mật khẩu mới.</p>
//                                 <a href="${url}">Login</a>`
//     };
    

//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error occurred while sending email:', error.message);
//             return;
//         }
//         console.log('Email sent:', info.response);
//     });

// }


// const sendChangePassword = async(data) => {
//     const transporter = await nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: environmentConfig.email.user,
//             pass: environmentConfig.email.password
//         }
//     });
//     const url = `${environmentConfig.frontendDomain}auth/login`;

//     const mailOptions = {
//         from: environmentConfig.email.user,
//         to: data.Email,
//         subject: 'Mật khẩu của bạn vừa được cập nhật',
//         html: `<h1>Chào ${data.FullName}</h1>
//                                 <p>Mật khẩu của bạn vừa được cập nhật thành công.</p>
//                                 <p>Tài khoản: <b>${data.Phone}</b></p>
//                                 <p>Nhấn vào link bên dưới để đăng nhập vào website với mật khẩu mới.</p>
//                                 <a href="${url}">Login</a>`
//     };
    

//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error occurred while sending email:', error.message);
//             return;
//         }
//         console.log('Email sent:', info.response);
//     });

// }

// module.exports = {
//     sendCreatedAccountEmail,
//     sendUpdateInfoAdmission,
//     sendResetPassword,
//     sendChangePassword
// }