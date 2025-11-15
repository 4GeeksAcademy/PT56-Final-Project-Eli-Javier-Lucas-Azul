import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AgregarGasto = ({ show, handleClose, onSave }) => {
    const [monto, setMonto] = useState("");
    const [categoria, setCategoria] = useState("comida");
    const [descripcion, setDescripcion] = useState("");

    const handleSubmit = () => {
        onSave({
            tipo: "gasto",
            monto,
            categoria,
            descripcion,
        });
        setMonto("");
        setCategoria("comida");
        setDescripcion("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Gasto</Modal.Title>
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
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="comida">Comida</option>
                            <option value="transporte">Transporte</option>
                            <option value="entretenimiento">Entretenimiento</option>
                            <option value="hogar">Hogar</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="otros">Otros</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Guardar Gasto
                </Button>
            </Modal.Footer>
        </Modal>
    );
};