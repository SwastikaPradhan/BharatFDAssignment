const translate = require("@vitalets/google-translate-api");
async function translateText(text,targetLanguage){
    try{
        const res = await translate(text,{to:targetLanguage});
        console.log(`Original Text:${text}`);
        console.log(`Translate Text:${res.text}`);
        return res.text;

    }
    catch(error){
        console.error("Translate Error:",error);
        return null;

    }
}

module.exports=translateText;