import "./style.css"
function App() {
  return (
    <>
      <div className="calc-text">My <br /> Calculator</div>
      <div className="calculator-grid">  {/*  the outermost  */}
        <div className="output-screen">  {/* the display screen */}
          <div className="prev-operand">123*566</div>  {/* the prev output that is gets pushed up when we enter another operand */}
          <div className="curr-operand">554625554625554625554625</div>  {/* the operand we enter after prev-operand */}
        </div>

        <button className="spans">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>×</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>.</button>
        <button>0</button>
        <button className="spans">=</button>

      </div>
    </>
  );
}

export default App;
