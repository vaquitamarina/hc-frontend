import React, { useState, useEffect } from 'react'; // ❌ mal espaciado

export default function TestLint() {
  // ❌ espacio innecesario
  const [count, setCount] = useState(0); // ❌ sin espacios

  useEffect(() => {
    console.log('Count actualizado:', count); // ❌ comillas dobles (prettier pide simples)
  }, [count]); // ❌ sin espacio después de coma

  function incrementar() {
    // ❌ espacio innecesario
    setCount((prev) => {
      return prev + 1;
    }); // ❌ mal indentado
  }

  return (
    <div>
      {' '}
      {/* ❌ mal indentado */}
      <h1>Contador:{count}</h1> {/* ❌ sin espacio alrededor de llaves */}
      <button onClick={incrementar}>+1</button> {/* ❌ espacio raro */}
    </div>
  );
}
