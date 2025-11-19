// components/ListaIngresos.jsx
import React from "react";
import { Button } from "react-bootstrap";

export const ListaIngresos = ({ ingresos, onEdit, onDelete }) => {
    return (
        <div className="p-3 border rounded h-100">
            <h5 className="mb-3">Ingresos</h5>

            {ingresos.length === 0 && <p className="text-muted">No hay ingresos registrados.</p>}

            {ingresos.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Descripción</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Categoría</th>
                                <th scope="col" className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingresos.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>{item.description}</strong>
                                    </td>
                                    <td>₡{item.amount}</td>
                                    <td>{item.category}</td>
                                    <td className="d-flex justify-content-center gap-1">
                                        <Button
                                            size="sm"
                                            variant="light"
                                            onClick={() => onEdit(item)}
                                            title="Editar"
                                        >
                                            <i className="bi bi-pencil"></i> {/* ✏️ Icono de Edición */}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="light"
                                            onClick={() => onDelete(item.id)}
                                            title="Eliminar"
                                        >
                                            <i className="bi bi-trash"></i> {/* 🗑️ Icono de Eliminar */}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
