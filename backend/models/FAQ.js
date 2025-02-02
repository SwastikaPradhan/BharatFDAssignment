const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
    question_inenglish:{
        type:String,required:true
    },
    answer_inenglish:{
        type:String,required:true
    },
    question_inhindi:{
        type:String
    },
    answer_inhindi:{
        type:String
    },
    question_intamil:{
        type:String
    },
    answer_intamil:{
        type:String
    }

});


FAQSchema.methods.getTranslatedText = function(lang) {
    switch(lang){
        case 'hi':
            return {
                question: this.question_inhindi || this.question_inenglish,  
                answer: this.answer_inhindi || this.answer_inenglish
            }
        case 'ti':
            return {
                question:this.question_intamil || this.question_inenglish,
                answer:this.answer_intamil || this.answer_inenglish
            } 
            
        default :
            return {
                question: this.question_inenglish,
                answer: this.answer_inenglish
            }
                 
    }

}


module.exports = mongoose.model('FAQ', FAQSchema);