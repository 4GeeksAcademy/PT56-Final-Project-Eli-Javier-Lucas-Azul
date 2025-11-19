import React from "react";

export const Balance = ({ ingresos, gastos }) => {
    const totalIngresos = ingresos.reduce((sum, i) => sum + i.amount, 0);
    const totalGastos = gastos.reduce((sum, g) => sum + g.amount, 0);
    const disponible = totalIngresos - totalGastos;

    return (
        <div className="p-3 border rounded h-100">
            <h5 className="mb-3">Balance</h5>

            <div className="d-flex justify-content-between border-bottom py-2">
                <strong>Ingreso:</strong> <span>₡{totalIngresos}</span>
            </div>

            <div className="d-flex justify-content-between border-bottom py-2">
                <strong>Egreso:</strong> <span>₡{totalGastos}</span>
            </div>

            <div className="d-flex justify-content-between py-2">
                <strong>Disponible:</strong> <span>₡{disponible}</span>
            </div>
        </div>
    );
};