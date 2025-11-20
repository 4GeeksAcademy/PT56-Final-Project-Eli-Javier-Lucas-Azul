import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateToken } from "../js/auth";

// Componentes importados
import { Graficos } from '../components/Graficos';
import { Balance } from '../components/Balance';
import { ListaIngresos } from '../components/ListaIngresos';
import { ListaGastos } from '../components/ListaGastos';
import { AgregarIngreso } from '../components/AgregarIngreso';
import { AgregarGasto } from '../components/AgregarGasto';
// import { EditarGasto } from '../components/EditarGasto'; // Descomentar al implementar edición

export const DetallePresupuesto = () => {
    const { budgetId } = useParams();
    const navigate = useNavigate();

    const [budget, setBudget] = useState(null);
    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [budgetName, setBudgetName] = useState("Cargando...");

    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);
    // const [showEditarGasto, setShowEditarGasto] = useState(false); // Para edición
    // const [gastoAEditar, setGastoAEditar] = useState(null); // Para edición

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
    const token = localStorage.getItem("jwt");

    const loadBudget = async () => {
        if (!budgetId) return;

        const res = await fetch(`${API_URL}/api/budgets/${budgetId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
            setBudget(data);
            setBudgetName(data.name);
            setGastos(data.gastos || []);
            setIngresos(data.ingresos || []);
        } else {
            alert(data.msg || "Error cargando presupuesto.");
            navigate("/budget"); // Redirigir si no se encuentra
        }
    };

    const refreshData = () => {
        loadBudget();
    };

    // Valida el token y cargar datos
    useEffect(() => {
        const check = async () => {
            const valid = await validateToken();
            if (!valid) navigate("/login");
        };
        check();

        loadBudget();
    }, [budgetId]);

    // Lógica de eliminación
    const handleDeleteItem = async (endpoint, id) => {
        try {
            const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                alert(`${endpoint === 'ingresos' ? 'Ingreso' : 'Gasto'} eliminado correctamente.`);
                refreshData();
            } else {
                const data = await res.json();
                alert(data.msg || `Error al eliminar ${endpoint}.`);
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        }
    };

    const handleDeleteGasto = (id) => handleDeleteItem('gastos', id);
    const handleDeleteIngreso = (id) => handleDeleteItem('ingresos', id);

    // Función para manejar la edición (DEBES IMPLEMENTAR EL MODAL EditarGasto/EditarIngreso)
    // const handleEditGasto = (gasto) => {
    //     setGastoAEditar(gasto);
    //     setShowEditarGasto(true);
    // };


    if (!budget) {
        return <div className="container mt-5">Cargando detalles del presupuesto...</div>;
    }
    return (
        <div className="container mt-4">

            <h2 className='text-center mb-4'>Detalle del Presupuesto: {budgetName}</h2>

            {/* Sección de Botones (Igual que en CreateBudget) */}
            <div className="d-flex justify-content-center gap-3 mb-4">
                <button
                    className="btn btn-outline-success d-flex align-items-center gap-2"
                    onClick={() => setShowIngreso(true)}
                >
                    <i className="bi bi-plus-circle"></i> Agregar Ingreso
                </button>

                <button
                    className="btn btn-outline-danger d-flex align-items-center gap-2"
                    onClick={() => setShowGasto(true)}
                >
                    <i className="bi bi-dash-circle"></i> Agregar Gasto
                </button>
            </div>

            <div className="row g-4 mb-5">
                {/* Recuadro Negro Superior: Gráfico de Resumen */}
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <GraficoDeResumen gastos={gastos} ingresos={ingresos} />
                        </div>
                    </div>
                </div>

                {/* Recuadro Negro Inferior: Balance */}
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <Balance ingresos={ingresos} gastos={gastos} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Listas de Ingresos y Gastos (Recuadro Rojo) */}
            <div className="row g-4">
                <div className="col-md-6">
                    <ListaIngresos
                        ingresos={ingresos}
                        onEdit={() => alert("Función de edición pendiente")}
                        onDelete={handleDeleteIngreso}
                    />
                </div>
                <div className="col-md-6">
                    <ListaGastos
                        gastos={gastos}
                        onEdit={() => alert("Función de edición pendiente")}
                        onDelete={handleDeleteGasto}
                    />
                </div>
            </div>

            {/* Modales */}
            <AgregarIngreso
                show={showIngreso}
                handleClose={() => setShowIngreso(false)}
                budgetId={budgetId}
                token={token}
                onAdded={refreshData}
            />

            <AgregarGasto
                show={showGasto}
                handleClose={() => setShowGasto(false)}
                budgetId={budgetId}
                token={token}
                onAdded={refreshData}
            />

            {/* Modal de edición (Descomentar al implementar) */}
            {/* <EditarGasto
                show={showEditarGasto}
                handleClose={() => setShowEditarGasto(false)}
                gasto={gastoAEditar}
                token={token}
                onUpdated={refreshData}
            /> */}

        </div>
    );
};