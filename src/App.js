import "./App.css";
import { Routes, Route } from 'react-router-dom';
import "./components/Cake.css";
import Front from "./components/First";
import Secret from "./components/Secret";
import Letter from "./components/Letter";
import Last from "./components/Last";
import ScrollToTop from "./components/Scroll";
import BirthdayCake from "./components/Cake";

function App() {
  return (
    <div className="app">
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/last" element= {<Last/>}/>
        <Route path= "/cake" element= {<BirthdayCake/>}/>
         <Route path="*" element={<Front />} />
      </Routes>
    </div>
  );
}

export default App;