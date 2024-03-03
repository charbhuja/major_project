import React from 'react';
import { useEffect, useState, useRef } from 'react';


const TransButton = ({ callback, cap }) => {

    const [languageOptions, setLanguageOptions] = useState([
        { code: "en", name: "English" },
        { code: "hi", name: "Hindi" },
        { code: "mr", name: "Marathi" },
        { code: "fr-ca", name: "French" },
        { code: "zh-Hans", name: "Chinese" },
        { code: "ml", name: "Malayalam" },
        { code: "kn", name: "Kannada" }
    ]);
    const [to, setTo] = useState('en');
    // const [from, setFrom] = useState('en');
    // const [input, setInput] = useState('');
    // const [output, setOutput] = useState('');

    const prevTo = useRef(to);

    const handleTranslate = async () => {

        console.log(cap);

        if (to === "en") {
            callback(cap);
        }

        else {
            const url = "https://rapid-translate.p.rapidapi.com/TranslateText";
            const fetchOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Key":
                        "13432e6be1mshe9443dd07406b12p1c4d3djsn5767bb70aa46",
                    "X-RapidAPI-Host": "rapid-translate.p.rapidapi.com"
                },
                // body: new URLSearchParams({
                //     from: "en",
                //     to: to,
                //     text: cap
                // })
                body: JSON.stringify({
                    from: "en",
                    text: cap,
                    to: to
                })
            };

            try {
                const response = await fetch(url, fetchOptions);
                const result = await response.json();
                // setCap(result.translated_text);
                callback(result.result);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleLanguageChange = (e) => {
        setTo(e.target.value);
    };

    useEffect(() => {
        if (prevTo.current !== to) {
            console.log(to);
            prevTo.current = to;
        }
    }, [to]);

    return (
        <>
            <div style={{margin:"14px 2px", marginLeft:"157px"}}>
                <select onChange={handleLanguageChange}>
                    {languageOptions.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button className="translate-btn" onClick={handleTranslate}>Translate</button>
            </div>
        </>
    )
}

export default TransButton