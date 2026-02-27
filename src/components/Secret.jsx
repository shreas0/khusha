import { useNavigate } from "react-router-dom";


function Secret() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Letter");
  }
  return (
    <div className="video-container-secret">
      <div className="background-2">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/media/background-2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="content-secret">
        <div className="happy">
          <h1>H</h1>
          <h1>A</h1>
          <h1>P</h1>
          <h1>P</h1>
          <h1>Y</h1>
        </div>
        <div className="birthday"><h1>Birthday</h1></div>
        <div className="image-2-container"><h1>KHUSHA</h1><div className="image-2"></div></div>
        <div className="img-2-container">
          <div className="img-2"></div>
          <button onClick={handleClick}>Click Here</button>
          <div className="patr-patr">
            <h1>🤭Mera Kaddu</h1>
            <h3>Kitna Cutu Hai 💋, Ek Saal Or Badh Gya...Shabbash </h3></div>
        </div>
      </div>

    </div>

  );
}

export default Secret;