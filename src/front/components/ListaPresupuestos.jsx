import React from 'react';
import { Button } from 'react-bootstrap';

export const ListaPresupuestos = ({ budgets, onSelectBudget, onRefresh, token }) => {
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const handleDeleteBudget = async (budgetId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este presupuesto y todos sus ingresos/gastos asociados?")) {
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/budgets/${budgetId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (res.ok) {
                alert("Presupuesto eliminado exitosamente.");
                onRefresh();
            } else {
                alert(data.msg || "Error al eliminar el presupuesto.");
            }
        } catch (error) {
            alert("Error de conexión al eliminar el presupuesto.");
        }
    };

    return (
        <div className="list-group ">
            {budgets.map((budget) => (
                <div
                    key={budget.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    style={{ background: '#515963' }}
                >
                    <span onClick={() => onSelectBudget(budget.id)} style={{ cursor: 'pointer', color: 'white' }}>
                        {budget.name}
                    </span>
                    <Button
                        variant='light'
                        size="md"
                        onClick={() => handleDeleteBudget(budget.id)}
                        title="Eliminar Presupuesto"
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            ))}
        </div>
    );
};