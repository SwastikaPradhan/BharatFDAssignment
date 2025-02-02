import React, { useState,useEffect } from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";


const FaqForm = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [faqList, setFaqList] = useState([]);

    useEffect(()=>{
        axios
        .get("http://localhost:8000/faqs")
        .then((response)=>setFaqList(response.data))
        .catch((error)=> console.log("Error fetching FAQs:",error));
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFaq = { question, answer };

        axios 
          .post("http://localhost:8000/api/faq",newFaq)
          .then((response)=>{

            setFaqList([...faqList, newFaq]);
            setQuestion("");
            setAnswer("");

          })
          .catch((error)=>console.error("Error submitting FAQ:",error));
       
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h1>FAQ Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <CKEditor
                    editor={ClassicEditor}
                    data={answer}
                    onChange={(event, editor) => setAnswer(editor.getData())}
                />
                <button type="submit" style={{ marginTop: "10px", padding: "8px 12px" }}>
                    Submit
                </button>
            </form>

            <h2>FAQ List</h2>
            {faqList.map((faq, index) => (
                <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                    <h3>{faq.question}</h3>
                    <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
            ))}
        </div>
    );
};

export default FaqForm;
