export const SobreNosotros = () => {
    return (
        <div className="container mt-5 mb-5">

            <h1 className="text-center mb-4">Sobre Nosotros</h1>

            <section className="mb-5">
                <h3>Descripción del Proyecto</h3>
                <p>
                    Billetera Familiar es una herramienta diseñada para ayudar a las familias
                    a administrar su presupuesto de forma clara, sencilla y visual. Permite
                    registrar ingresos, gastos, generar reportes en PDF y visualizar gráficos
                    que facilitan la toma de decisiones financieras.
                </p>
            </section>

            <section className="mb-5">
                <h3>Nuestro Equipo</h3>
                <div className="row mt-4">

                    <div className="col-md-4">
                        <div className="card perfil-card">
                            <img src="https://placehold.co/400" className="card-img-top" alt="Elizabeth" />
                            <div className="card-body">
                                <h5 className="card-title">Elizabeth</h5>
                                <p className="card-text descripcion-hover">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi eum aliquid neque minima ipsam deserunt possimus ab officiis, nam, suscipit similique praesentium tempore, voluptates tenetur iste ratione! Ipsa, ad blanditiis.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card perfil-card">
                            <img src="https://placehold.co/400" className="card-img-top" alt="Javier" />
                            <div className="card-body">
                                <h5 className="card-title">Javier</h5>
                                <p className="card-text descripcion-hover">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, debitis. Quaerat aspernatur asperiores perferendis quidem accusantium tempora odio minima placeat. Qui nesciunt porro animi delectus inventore ex aliquam error in!.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card perfil-card">
                            <img src="https://placehold.co/400" className="card-img-top" alt="Lucas" />
                            <div className="card-body">
                                <h5 className="card-title">Lucas</h5>
                                <div className="card-text descripcion-hover">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repudiandae impedit dicta doloribus placeat dignissimos vel eaque eius, laboriosam est tempore adipisci cupiditate nihil similique nulla ipsum consequuntur ipsam? Omnis.</p>
                                    <a
                                        href="https://www.linkedin.com/in/lucas-urquiza-b6663624a/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="linkedin-btn"
                                    >
                                        <i className="fa-brands fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="mb-5">
                <h3>Tecnologías Usadas</h3>
                <ul>
                    <li>React + Bootstrap</li>
                    <li>Python Flask</li>
                    <li>SQLAlchemy</li>
                    <li>JWT Authentication</li>
                    <li>ReportLab para generación de PDFs</li>
                </ul>
            </section>

            <section className="mb-5">
                <h3>Funciones a Futuro</h3>
                <ul>
                    <li>Exportar reportes a Excel</li>
                    <li>Comparar presupuestos entre meses</li>
                    <li>Sincronización familiar multiusuario</li>
                    <li>Gráficos avanzados por categoría</li>
                </ul>
            </section>

        </div>
    );
};
