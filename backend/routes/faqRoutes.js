const express = require('express');
const FAQ = require("../models/FAQ");
const translateText = require("../utils/translate");
const {cacheMiddleware,cacheResponse} = require('../middleware/cacheMiddleware');
const router = express.Router();

router.post('/faq', async (req, res) => {
    const { question_inenglish, answer_inenglish, question_inhindi, answer_inhindi, question_intamil, answer_intamil } = req.body;

    try {        
        const translatedQuestionHindi = question_inhindi || await translateText(question_inenglish, 'hi');
        const translatedAnswerHindi = answer_inhindi || await translateText(answer_inenglish, 'hi');
        const translatedQuestionTamil = question_intamil || await translateText(question_inenglish, 'ta');
        const translatedAnswerTamil = answer_intamil || await translateText(answer_inenglish, 'ta');

        const newFAQ = new FAQ({
            question_inenglish,
            answer_inenglish,
            question_inhindi: translatedQuestionHindi,
            answer_inhindi: translatedAnswerHindi,
            question_intamil: translatedQuestionTamil,
            answer_intamil: translatedAnswerTamil
        });

        await newFAQ.save();
        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create FAQ",
            error: error.message
        });
    }
});


router.get('/faqs', cacheMiddleware,async (req, res) => {
    const lang = req.query.lang || 'en'; 
    try {
        const faqs = await FAQ.find();
        const faqData = faqs.map(faq => faq.getTranslatedText(lang));
        cacheResponse(req.originalUrl,faqData); 
        res.json(faqData);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch faqs',
            error: error.message
        });
    }
});

module.exports = router;
