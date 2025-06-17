import { useState, useEffect } from "react";
import Pieza from "./Pieza";
import Boton from "./Boton";
import "../App.css";
import { FaRedo, FaEye } from "react-icons/fa";

export default function Tablero({ imagen, numero, onCompletado, tiempoTotal, reiniciarTiempo }) {
    // Configuración del estado resuelto del rompecabezas (números del 1-8 y null para el espacio vacío)
    const solucion = [1, 2, 3, 4, 5, 6, 7, 8, null];

    // Estados del componente
    const [piezas, setPiezas] = useState([1, 2, 3, 4, 5, 6, null, 7, 8]); // Estado actual del tablero
    const [movimientos, setMovimientos] = useState(0); // Contador de movimientos realizados
    const [completo, setCompleto] = useState(false); // Para saber si el rompecabezas está resuelto
    const [mostrarImagen, setMostrarImagen] = useState(false); // Para mostrar/ocultar vista previa

    // Efecto que se ejecuta cuando cambia el número del puzzle (reinicia el tablero cuando cambia de nivel)
    useEffect(() => {
        iniciarTablero();
    }, [numero]);

    // Función para mezclar el tablero al inicializar/reiniciar
    const iniciarTablero = () => {
        console.log(`🔄 Mezclando tablero del rompecabezas ${numero}`);

        // Resetear estados
        setCompleto(false);
        setMovimientos(0);
        setMostrarImagen(false);

        // Crear una copia de la solución para mezclar
        let mezcla = [...solucion];

        // Realizar 100 movimientos aleatorios válidos para mezclar

        for (let i = 0; i < 100; i++) {
            // Encontrar la posición del espacio vacío (null)
            const vacio = mezcla.indexOf(null);

            // Calcular posiciones adyacentes válidas (arriba, abajo, izquierda, derecha)
            const vecinos = [
                vacio - 3, // Arriba
                vacio + 3, // Abajo
                vacio % 3 !== 0 ? vacio - 1 : -1, // Izquierda (solo si no está en el borde izquierdo)
                vacio % 3 !== 2 ? vacio + 1 : -1, // Derecha (solo si no está en el borde derecho)
            ];

            // Filtrar solo las posiciones válidas (dentro del tablero 3x3)
            const validos = vecinos.filter((i) => i >= 0 && i < 9);

            // Elegir una posición aleatoria válida
            const destino = validos[Math.floor(Math.random() * validos.length)];

            // Intercambiar el espacio vacío con la pieza seleccionada
            [mezcla[vacio], mezcla[destino]] = [mezcla[destino], mezcla[vacio]];
        }

        // Asegurar que el rompecabezas no quede ya resuelto después de la mezcla
        while (JSON.stringify(mezcla) === JSON.stringify(solucion)) {
            // Repetir un movimiento aleatorio hasta que sea diferente a la solución
            const vacio = mezcla.indexOf(null);
            const vecinos = [vacio - 3, vacio + 3, vacio % 3 !== 0 ? vacio - 1 : -1, vacio % 3 !== 2 ? vacio + 1 : -1];
            const validos = vecinos.filter((i) => i >= 0 && i < 9);
            const destino = validos[Math.floor(Math.random() * validos.length)];
            [mezcla[vacio], mezcla[destino]] = [mezcla[destino], mezcla[vacio]];
        }

        // Establecer el nuevo estado del tablero mezclado
        setPiezas(mezcla);

        // Reiniciar el cronómetro si la función está disponible
        if (reiniciarTiempo) {
            reiniciarTiempo();
        }
    };

    // Función para mover una pieza al espacio vacío
    const moverPieza = (index) => {
        // No permitir movimientos si el rompecabezas ya está completo
        if (completo) return;

        // Encontrar la posición del espacio vacío
        const vacio = piezas.indexOf(null);

        // Calcular las posiciones adyacentes a la pieza clickeada
        const adyacentes = [index - 1, index + 1, index - 3, index + 3];

        // Solo permitir el movimiento si el espacio vacío está adyacente
        if (!adyacentes.includes(vacio)) return;

        // Crear una copia del estado actual y realizar el intercambio
        const nuevas = [...piezas];
        [nuevas[index], nuevas[vacio]] = [nuevas[vacio], nuevas[index]];
        setPiezas(nuevas);

        // Incrementar el contador de movimientos
        const nuevosMovimientos = movimientos + 1;
        setMovimientos(nuevosMovimientos);

        // Verificar si el rompecabezas está completo
        if (JSON.stringify(nuevas) === JSON.stringify(solucion)) {
            setCompleto(true);
            console.log("🎉 ¡Rompecabezas resuelto!");

            // Llamar al mensaje de completado después de una pequeña pausa
            setTimeout(() => {
                onCompletado(tiempoTotal, nuevosMovimientos);
            }, 200);
        }
    };

    return (
        <section className="tablero">
            {/* Barra superior con información del juego */}
            <div className="barra-superior">
                <span>⏱️ Tiempo: {tiempoTotal}s</span>
                <span>🎯 Movimientos: {movimientos}</span>
            </div>

            {/* Grilla del rompecabezas 3x3 */}
            <div className="grilla">
                {piezas.map((valor, i) => (
                    <Pieza
                        key={i}
                        valor={valor}
                        onClick={() => moverPieza(i)}
                        mostrarImagen={mostrarImagen}
                        imagen={imagen}
                        completo={completo}
                    />
                ))}
            </div>

            {/* Botones de control */}
            <div className="botones-laterales">
                <Boton texto="Reiniciar" icono={<FaRedo />} onClick={iniciarTablero} />
                <Boton texto="Vista previa" icono={<FaEye />} onClick={() => setMostrarImagen(!mostrarImagen)} />
            </div>
        </section>
    );
}
