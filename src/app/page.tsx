"use client"
import { ChangeEvent, useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const mapText = (text: string) => {
  // Extraer los ganadores
  const ganadoresRegex = /Ganador(es)?:\s*(.*?)\n/m;
  const ganadoresMatch = text.match(ganadoresRegex);
  const ganadores = ganadoresMatch ? ganadoresMatch[2].trim() : "";

  // Extraer el bote total
  const boteTotalRegex = /bote total (de|en) premios de (\d+\.?\d*)€/i;
  const boteTotalMatch = text.match(boteTotalRegex);
  const boteTotal = boteTotalMatch ? boteTotalMatch[2] : "";

  // Extraer las observaciones
  const observacionesRegex = /Observaciones:\s*(.*?)$/m;
  const observacionesMatch = text.match(observacionesRegex);
  const observaciones = observacionesMatch ? observacionesMatch[1].trim() : "";

  return {
    ganadores,
    bote: boteTotal,
    observaciones,
  };
}

export default function Home() {
  const [text, setText] = useState('')
  const [ganadores, setGanadores] = useState('')
  const [bote, setBote] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const onClickMapText = (text: string) => {
    if (!text) return
    setGanadores(mapText(text).ganadores)
    setBote(mapText(text).bote)
    setObservaciones(mapText(text).observaciones)
  }


  return (
    <main className="min-h-screen bg-zinc-950">

      <div className='md:w-9/12 mx-auto '>
        <h1 className="text-xl font-bold text-center">Actualizar torneo</h1>

        <textarea className="w-full rounded-xl p-5 bg-zinc-900 text-zinc-400" rows={10} onChange={(event) => handleChange(event)} />

        <button
          className="bg-zinc-50 text-zinc-800 font-semibold px-3 py-1 rounded-md mt-2 mb-8"
          onClick={() => onClickMapText(text)} >Generar</button>

        <div className='w-full rounded-xl overflow-hidden' >

          <SyntaxHighlighter
            language="htmlbars"
            wrapLongLines={true}
            style={dracula}
          >
            {`<hr style="border-color: white;" />
<span style="color: #00ccff;"><em>Actualizado</em></span>
<strong>GANADORES:</strong> ${ganadores}
<strong>PREMIO TOTAL:</strong> ${bote}€
<strong>CRÓNICA:</strong> ${observaciones}
`}
          </SyntaxHighlighter>

        </div>
      </div>
    </main>
  )
}
