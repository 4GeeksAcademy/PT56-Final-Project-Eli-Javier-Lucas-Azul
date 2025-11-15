import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AgregarIngreso = ({ show, handleClose, onSave }) => {
    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");

    const handleSubmit = () => {
        onSave({
            tipo: "ingreso",
            monto,
            descripcion,
            categoria,
        });
        setMonto("");
        setDescripcion("");
        setCategoria("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Ingreso</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Monto</Form.Label>
                        <Form.Control
                            type="number"
                            value={monto}
                            onChange={e => setMonto(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="salario">Salario</option>
                            <option value="bono">Bono</option>
                            <option value="interes">Interes</option>
                            <option value="extra">Extras</option>
                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Guardar Ingreso
                </Button>
            </Modal.Footer>
        </Modal>
    );
};