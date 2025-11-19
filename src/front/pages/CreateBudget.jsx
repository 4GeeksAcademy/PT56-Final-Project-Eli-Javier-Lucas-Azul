import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";
import { AgregarIngreso } from "../components/AgregarIngreso";
import { AgregarGasto } from "../components/AgregarGasto";
import { ListaIngresos } from "../components/ListaIngresos";
import { ListaGastos } from "../components/ListaGastos";
import { Balance } from "../components/Balance";

export const CreateBudget = () => {

    const navigate = useNavigate();

    const [budgetName, setBudgetName] = useState("");
    const [budgetId, setBudgetId] = useState(null);
    const [gastos, setGastos] = useState([]);
    const [ingresos, setIngresos] = useState([]);

    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);

    // Variable de entorno.-
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    // Token y usuario
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));

    // Validar token
    useEffect(() => {
        const check = async () => {
            const valid = await validateToken();
            if (!valid) navigate("/login");
        };
        check();
    }, []);

    // Crear presupuesto
    const crearBudget = async () => {
        if (!budgetName.trim()) {
            return alert("El nombre del presupuesto es obligatorio");
        }

        const res = await fetch(`${API_URL}/api/budgets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: budgetName }),
        });

        const data = await res.json();

        if (!res.ok) return alert(data.msg || "Error creando presupuesto");

        setBudgetId(data.id);
        alert("Presupuesto creado");
        CargarBudget(data.id);
    };

    // Cargar el presupuesto
    const CargarBudget = async (id) => {
        const res = await fetch(`${API_URL}/api/budgets/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setGastos(data.gastos || []);
        setIngresos(data.ingresos || []);
    };

    // Recargar después de agregar ingresos/gastos
    const RecargarInfo = () => {
        if (budgetId) CargarBudget(budgetId);
    };

    // Eliminar Gasto
    const BorrarGasto = async (id) => {
        const res = await fetch(`${API_URL}/api/gastos/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            alert("Gasto eliminado");
            RecargarInfo();
        } else {
            const data = await res.json();
            alert(data.msg || "Error al eliminar el gasto");
        }
    };

    // Función de eliminación de Ingreso (A implementar)
    const BorrarIngreso = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/ingresos/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                alert("Ingreso eliminado correctamente.");
                RecargarInfo(); // Llama a la función para recargar gastos e ingresos
            } else {
                const data = await res.json();
                alert(data.msg || "Error al eliminar el ingreso.");
            }
        } catch (error) {
            alert("Error al conectar con el servidor para eliminar el ingreso.");
        }
    };
    return (
        <div className="container mt-4">

            {/* Input + botón */}
            <div className="d-flex justify-content-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Nombre del presupuesto"
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                    className="form-control w-50"
                />
                <button className="btn btn-primary" onClick={crearBudget}>
                    Crear Presupuesto
                </button>
            </div>

            {/* Botones Ingreso / Gasto */}
            <div className="d-flex justify-content-center gap-3 mb-4">
                <button
                    className="btn btn-outline-success"
                    disabled={!budgetId}
                    onClick={() => setShowIngreso(true)}
                >
                    Agregar Ingreso
                </button>

                <button
                    className="btn btn-outline-danger"
                    disabled={!budgetId}
                    onClick={() => setShowGasto(true)}
                >
                    Agregar Gasto
                </button>
            </div>

            {/* Panel principal */}
            {budgetId && (
                <div className="border rounded p-4 shadow-sm mt-4">

                    <h4 className="text-center mb-4">
                        {budgetName}
                    </h4>

                    <div className="row g-4">

                        {/* Gastos */}
                        <div className="col-md-4">
                            <ListaGastos
                                gastos={gastos}
                                onEdit={() => { }}
                                onDelete={BorrarGasto}
                            />
                        </div>

                        {/* Ingresos */}
                        <div className="col-md-4">
                            <ListaIngresos
                                ingresos={ingresos}
                                onEdit={() => { }}
                                onDelete={BorrarIngreso} // Se pasa la función de eliminación
                            />
                        </div>

                        {/* Balance */}
                        <div className="col-md-4">
                            <Balance
                                ingresos={ingresos}
                                gastos={gastos}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Modales */}
            <AgregarIngreso
                show={showIngreso}
                handleClose={() => setShowIngreso(false)}
                budgetId={budgetId}
                token={token}
                onAdded={RecargarInfo}
            />

            <AgregarGasto // Se pasan las props necesarias
                show={showGasto}
                handleClose={() => setShowGasto(false)}
                budgetId={budgetId}
                token={token}
                onAdded={RecargarInfo}
            />

        </div>
    );
};