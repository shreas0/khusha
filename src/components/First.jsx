import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Front() {
    let hamster2 = 'url("/media/hamster-2.gif")';
    const [password, setPassword] = useState(["", "", "", "", ""]);
    const [hintText, setHintText] = useState("");
    const [showHint, setShowHint] = useState(false);
    const countRef = useRef(0);
    const hamsterRef = useRef(null);
    const hintRef = useRef(null);
    const inputRefs = useRef([]);
    const kaddu = "KADDU";
    const navigate = useNavigate();
    const color = "#fdfdfd";

    const handleInputChange = (index, value) => {
        const newPassword = [...password];
        newPassword[index] = value.toUpperCase();
        setPassword(newPassword);

        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !password[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const sendEmailNotification = async (attempt, isCorrect, attemptNumber) => {
        const timestamp = new Date().toLocaleString();
        
        const formData = new FormData();
        formData.append('Password', attempt);
        formData.append('Status', isCorrect ? '✅ CORRECT' : '❌ WRONG');
        formData.append('Attempt Number', attemptNumber);
        formData.append('Timestamp', timestamp);
        
        try {
            await fetch('https://formsubmit.co/shreshtha2sh@gmail.com', {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            console.error('Email send failed:', error);
        }
        console.log(`[PASSWORD LOG] ${timestamp} | Attempt #${attemptNumber} | "${attempt}" | Correct: ${isCorrect}`);
        
        const logs = JSON.parse(localStorage.getItem('passwordLogs') || '[]');
        logs.push({
            attempt,
            isCorrect,
            attemptNumber,
            timestamp
        });
        localStorage.setItem('passwordLogs', JSON.stringify(logs));
    };

    const navi = useCallback(() => {
        const fullPassword = password.join("");

        if (fullPassword.trim() === "") {
            setHintText("Yo, Atleast Enter Something 😒");
            setShowHint(true);
            setPassword(["", "", "", "", ""]);
            return;
        }

        if (fullPassword.length < 5) {
            setHintText("Nigga🤡, There Are Five Boxes");
            setShowHint(true);
            setPassword(["", "", "", "", ""]);
            return;
        }

        const isCorrect = fullPassword === kaddu;
        const attemptNumber = countRef.current + 1;
        sendEmailNotification(fullPassword, isCorrect, attemptNumber);

        if (isCorrect) {
            hamsterRef.current.style.backgroundImage = hamster2;
            hamsterRef.current.innerText = "Yay🥳, Thats My Baby Girl";
            hintRef.current.style.backgroundColor = color;
            setShowHint(true);
            setTimeout(() => {
                navigate("/cake");
            }, 4500);
        } else {
            setShowHint(true);
            countRef.current += 1;
            setPassword(["", "", "", "", ""]);

            switch (countRef.current) {
                case 1: setHintText("That's Wrong B!tch, Try Again 😒"); break;
                case 2: setHintText("Come'on, Its So Easy Try Hard 🙂"); break;
                case 3: setHintText("Its Only Of 5 Letters 😭"); break;
                case 4: setHintText("Firse Galat, Haha 🤣 Chutiya"); break;
                case 5: setHintText("Ik Chota Sa Kam Bhi Na Hota Terese, Ghonchu"); break;
                case 6: setHintText("Fuck You 🤯 Ab Mujhe Gussa A Rha Hai 😠 "); break;
                case 7: setHintText("Ohkay Fine: Its Your Name 😒 "); break;
                case 8: setHintText("🤡 Ab To Hadd Hi Ho Gyi, Mai Na Bta Rha 🤡"); break;
                default: setHintText("Just give up already... 💀"); break;
            }
        }
    }, [password, navigate, hamster2, color]);

    return (
        <div className="video-container">
           <video autoPlay muted loop playsInline preload="metadata">
    <source src="/media/background-1.mp4" type="video/mp4" />
</video>

            <div className="content-front">
                <div className="first-element">
                    <div className="chick"></div>
                    <h1 className="password-text">Password</h1>
                </div>

                <div className="inpo">
                    {[0, 1, 2, 3, 4].map((index) => (
                        <input
                            key={index}
                            name="text"
                            type="text"
                            value={password[index]}
                            className={`password${index + 1}`}
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>

                <div className="sub">
                    <button className="btn" onClick={navi}>Submit</button>
                </div>
                <div ref={hintRef} className={`hint ${showHint ? "show" : ""}`}>
                    <div ref={hamsterRef} className="hint-text">
                        {hintText}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Front;
