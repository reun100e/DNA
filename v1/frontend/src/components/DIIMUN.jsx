import "../styles/DIIMUN.css";
import logo from "../assets/logo.png";

function DIIMUN() {
  return (
    <div className="DIIMUN-container">
      <div className="DIIMUN">
        <div>DIIMUN</div>
        <div>by</div>
        <div>DNA</div>
      </div>
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default DIIMUN;
