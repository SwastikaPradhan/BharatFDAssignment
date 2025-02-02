const FAQ = require("../models/FAQ");

exports.createFAQ=async(req,res)=>{
    try{
        const {question_inenglish,answer_inenglish,question_inhindi,answer_inhindi,question_intamil,answer_intamil} = req.body;
        const faq= new FAQ({
            question_inenglish,answer_inenglish,question_inhindi,answer_inhindi,question_intamil,answer_intamil
        });
        await faq.save();
        res.status(201).json({
            message:"FAQ Created successfully",faq
        });
    }
    catch(error){
        res.status(500).json({
            message:"Server error",error
        });
    }
}