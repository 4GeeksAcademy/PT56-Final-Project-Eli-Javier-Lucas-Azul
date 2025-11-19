import React from "react";
import { Button } from "react-bootstrap";

export const ListaGastos = ({ gastos, onEdit, onDelete }) => {
    return (
        <div className="p-3 border rounded h-100">
            <h5 className="mb-3">Gastos</h5>

            {gastos.length === 0 && <p className="text-muted">No hay gastos registrados.</p>}

            {gastos.map((item) => (
                <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                    <div>
                        <strong>{item.description}</strong>
                        <br />
                        ₡{item.amount} — {item.category}
                    </div>

                    <div className="d-flex flex-column gap-1">
                        <Button size="sm" variant="outline-primary" onClick={() => onEdit(item)}>
                            Edit
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => onDelete(item.id)}>
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};