 

 require('dotenv').config();
const db = require('../models/db');
const voucher_codes = require('voucher-code-generator');
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 require('dotenv').config() 


 
 
const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: USER,
        pass: PASS,
    },
    secure: true,
});

exports.getRefs = async (req, res) => {
    try {
        const refs = await prisma.referalcodes.findMany();
        res.json({ refcodes: refs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch referral codes' });
    }
}

exports.addRef = async (req, res) => {
    const { name, email, fname, femail } = req.body;
    try {
        let alreadyExists = false;
        const existingCodes = await prisma.referalcodes.findMany({ 
            where: { email: email, femail: femail }, 
            orderBy: { id: 'desc' },
        });

        if (existingCodes.length > 0) {
            const today = new Date();
            const createdDate = new Date(existingCodes[0].createdat);
            const threeDaysBefore = new Date(today);
            threeDaysBefore.setDate(today.getDate() - 3);

            if (createdDate > threeDaysBefore) {
                alreadyExists = true;
            }
        }

        if (!alreadyExists) {
            const newRefCode = voucher_codes.generate({
                length: 5,
                charset: voucher_codes.charset("alphanumeric")
            })[0];
            const now = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
            const refdata = {
                name: name,
                email: email,
                fname: fname,
                femail: femail,
                refcode: newRefCode,
                used: 0,
                createdat: now
            };

            const query = 'INSERT INTO referalcodes SET ?';
            db.query(query, refdata, (err, result) => {
                if (err) {
                    console.error('Database insert error:', err);
                    res.status(500).json({ error: 'Failed to add referral code' });
                } else {
                    sendEmail(refdata.refcode, femail);
                    res.status(200).json({ msg: 'Code added' });
                }
            });
        } else {
            res.status(200).json({ msg: 'Referral code already exists' });
        }
    } catch (error) {
        console.error('Error adding referral code:', error);
        res.status(500).json({ error: 'An error occurred while adding the referral code' });
    }
}

exports.deleteRef = async (req, res) => {
    console.log('Delete Ref');
}

exports.updateRefs = async (req, res) => {
    console.log('Update Ref');
}

function sendEmail(refcode, email) {
    const mailData = {
        from: USER,
        to: email,
        subject: 'Accredian Referral Code',
        text: 'Hello world',
        html: `<b>Hey there!</b><br>Please enter <b>${refcode}</b> as your referral code while signing up.<br/>`,
    };
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
