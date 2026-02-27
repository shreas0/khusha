import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Letter() {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    const [pos, setPos] = useState({ top: 0, left: 0 });

    const navigate = useNavigate();

    function moveRandomly() {
        const chick = document.querySelector(".warn");
        const container = containerRef.current;
        const button = buttonRef.current;
        const yesButton = document.querySelector(".yes");
        let count = 0;

        if (!container || !button || !yesButton) return;

        const containerRect = container.getBoundingClientRect();
        const yesRect = yesButton.getBoundingClientRect();

        const maxX = container.clientWidth - button.clientWidth;
        const maxY = container.clientHeight - button.clientHeight;

        let randomX, randomY;
        let overlap = true;
        let safetyCounter = 0;

        while (overlap && safetyCounter < 50) {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;

            const noRect = {
                left: containerRect.left + randomX,
                right: containerRect.left + randomX + button.clientWidth,
                top: containerRect.top + randomY,
                bottom: containerRect.top + randomY + button.clientHeight
            };

            overlap = !(
                noRect.right < yesRect.left ||
                noRect.left > yesRect.right ||
                noRect.bottom < yesRect.top ||
                noRect.top > yesRect.bottom
            );

            safetyCounter++;
        }

        setPos({
            left: randomX,
            top: randomY
        });
        count++;

        switch (count) {
            case 1: count++; chick.innerHTML = "Dont Click That Shit! Bitch!"; break;
        }
        chick.style.backgroundColor = "red";
    }


    function goToLast() {
        navigate("/Last");
    }

    return (
        <div className="video-container-letter">
            <div className="background-3">
                <video autoPlay muted loop playsInline preload="metadata">
                    <source src="/media/background-1.mp4" type="video/mp4" />
                </video>
            </div>


            <div className="letter-content">
                <h1 className="hi">Hi,</h1>



                <div className="message-box-1">
                    <div className="dots"><div></div><div></div><div></div></div>
                    <h3>Happy Birthday, Malkin! ✨ May God bless you with everything you want (waise God to hum khud hi hain, but still!). Humein gappe ladate ladate do saal ho gaye, and honestly, aapne apni jo aadat dalwai hai na—it’s just beautiful.

                        I’m sending a little plushie (gudda) your way. You once mentioned ki aapke paas sone ke liye koi cute partner nahi hai, toh ab se ye rahega. Jab bhi iske saath so, just imagine your comfort person and feel relaxed. And since irl milna thoda mushkil hai, mera ye virtual hug 🫂 sambhaal ke rakhna. Happy Birthday again! ❤️
                    </h3>

                </div>

                <div className="message-box-2">
                    <div className="dots"><div></div><div></div><div></div></div>
                    <h3>Humari aapas mein ab utni baat nahi hoti... mujhe nahi pata agar ye kisi personal issues ki wajah se hai jo tumhari life mein chal rahe hain, par agar aisa hai toh I'll pray for it ki sab jaldi resolve ho jaye. 🙏 I know main ek bahut boring insaan hoon aur zyada kuch hai nahi mujhse baat karne layak, main bas ek dost dhund raha tha. ❤️ Main kabhi nahi chahunga ki humari friendship tute kyunki mere paas bas tum hi ho, par agar kabhi aisa kuch hua toh us gudde ko meri yaadein smjh ke saath apne paas hi rakhna. ❤️ </h3>
                </div>

                <div className="message-box-3">
                    <div className="dots"><div></div><div></div><div></div></div>
                    <h3>Thank you so much ki tum meri life mein randomly aayi aur mujhe itna acha feel karaya. ✨ I truly respect your every effort... jo tumne mere bday pe wallet diya tha woh eklauta gift tha jo mujhe mila tha aur main hadd se zyada khush tha! 😭 Mujhe reaction dena nahi aata isliye tab bata nahi paya, but that meant a lot to me. ❤️ Aur tumne kitni care ki thi meri jab mujhe hives hua tha... you are a true friend. 🌸 Hope beech mein screen ki jagah reality hoti! 😭🙌✨</h3>
                </div>

                <div className="message-box-4">
                    <div className="dots"><div></div><div></div><div></div></div>
                    <h3>I am so, so sorry... 🥺 Sach bataun toh beech mein maine bohot galat tarike se baat ki thi aur be-mtlb ke taunts maare ki tum mujhe time nahi deti. I'm so sorry for that. 😔 Mujhe samajhna chahiye tha ki tumhari bhi apni life hai, apne kaam hain... shayad main hi apni hadd se zyada tumhari life mein involve ho raha tha. 🥀 Aur jo kuch bhi tumhare aur Ansh ke beech hua, mera wo matlab bilkul nahi tha... please believe me. 😭 I hate that meri wajah se tumhe itni troubles face karni padi. I’m really sorry for everything. ☹️💖
                    </h3>
                </div>

                <div className="last-thing">
                    <h1>Last ,Do You Love Me?</h1>
                    <div className="img-3"></div>
                    <div className="warn"></div>
                    <button className="yes" onClick={goToLast}>
                        Yes
                    </button>
                    <div className="no-container" ref={containerRef}>
                        <button
                            ref={buttonRef}
                            className="no"
                            onClick={moveRandomly}
                            style={{
                                left: pos.left,
                                top: pos.top
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Letter;
