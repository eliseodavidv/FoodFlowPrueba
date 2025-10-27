import React, { useState } from 'react';
import axios from 'axios';

const Analic = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cambia la URL por la de tu backend si es diferente
        const response = await axios.post('http://localhost:8000/api/atena', { data: input });
        setResult(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button type="submit">Submit</button>
            {result && <div>Resultado: {JSON.stringify(result)}</div>}
        </form>
    );
};

export default Analic;