import React, { useEffect } from "react"
import { Graficos } from "./Graficos"

export const GraficoCarrusel = ({ ingresos, egresos }) => {

    return (
        <div id="graficosCarrusel" className="carousel slide" data-bs-ride="carousel">

            <div className="carousel-inner">

                {/* Slide 1 — Egresos */}
                <div className="carousel-item">
                    <div className="text-center">
                        <h5 className="fw-bold">Egresos</h5>
                    </div>
                    <div className="d-flex justify-content-center p-4">
                        <Graficos datos={egresos || []} />
                    </div>
                </div>

                {/* Slide 2 — Ingresos */}
                <div className="carousel-item active">
                    <div className="text-center">
                        <h5 className="fw-bold">Ingresos</h5>
                    </div>
                    <div className="d-flex justify-content-center p-4">
                        <Graficos datos={ingresos || []} />
                    </div>
                </div>

            </div>

            {/* Controles del carrusel */}
            <button className="carousel-control-prev" type="button" data-bs-target="#graficosCarrusel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden btn-custom">Anterior</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#graficosCarrusel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}