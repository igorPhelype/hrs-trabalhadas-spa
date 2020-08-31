import React, { useState } from 'react'

const Loader = () => {
    return (
        <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    )
}

const intervaloTrabalhadoInitialState = {
    horaInicial: '',
    horaFinal: ''
}

export default function CalcularHorasTrabalhadas() {
    const [intervaloTrabalhado, setIntervaloTrabalhado] = useState(intervaloTrabalhadoInitialState)
    const [resultado, setResultado] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e = new Event()) => {
        e.preventDefault()
        setLoading(true)
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const {
                body, status
            } = await fetch('http://localhost:3333/horas-trabalhadas/totalizar', {
                method: 'post',
                body: JSON.stringify(intervaloTrabalhado),
                headers: headers,
            }).then(async (response) => {
                return { status: response.status, body: await response.json() }
            })
            if (status === 200) {
                console.log(body)
                setTimeout(() => {
                    setLoading(false)
                    setResultado(body)
                }, 1500)
            }else{
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            }
        } catch (e) {
            console.log(e)
            setTimeout(() => setLoading(false), 1000)
        }
    }

    const handleInputChange = (e = new Event()) => {
        setIntervaloTrabalhado({ ...intervaloTrabalhado, [e.target.name]: e.target.value })
    }

    return (
        <div className="row">
            {resultado ?
                <div class="col s12 m6 mb-0 offset-m3 l4 offset-l4">
                    <h4 className="title">Resultado:</h4>
                    <p className="text">Veja abaixo o resultado do calculo de horas trabalhadas</p>
                    <div className="card">
                        <div className="card-content">
                            {[{
                                label: "Entrada",
                                value: intervaloTrabalhado.horaInicial,
                            }, {
                                label: "Saída",
                                value: intervaloTrabalhado.horaFinal,
                            }, {
                                label: "Total",
                                value: resultado.horasTrabalhadasTotal,
                            }, {
                                label: "Horas diurnas",
                                value: resultado.horasTrabalhadasDia,
                            }, {
                                label: "Horas norturnas",
                                value: resultado.horasTrabalhadasNoite,
                            }].map(item => {
                                return (
                                    <div className="result-item">
                                        <h6 className="text">{item.label}: </h6>
                                        <p className="accent-text">{item.value}</p>
                                    </div>
                                )
                            })}
                            <button className="btn waves-effect waves-light" onClick={() => {
                                setResultado(null)
                                setIntervaloTrabalhado(intervaloTrabalhadoInitialState)
                            }}>Voltar</button>
                        </div>
                    </div>
                </div>
                :
                <div className="col s12 m6 mb-0 offset-m3 l4 offset-l4">
                    <h4 className="title">Calculo de horas trabalhadas</h4>
                    <p className="text">Insira abaixo a hora de entrada e a hora de saída</p>
                    <div className="card center-align">
                        <div className="card-content">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input onChange={handleInputChange} value={intervaloTrabalhado.horaInicial} placeholder="00:00" id="horaInicial" name="horaInicial" type="text" className="validate" />
                                        <label for="horaInicial">Hora de entrada (00:00)</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input onChange={handleInputChange} value={intervaloTrabalhado.horaFinal} placeholder="00:00" id="horaFinal" name="horaFinal" type="text" className="validate" />
                                        <label for="horaFinal">Hora de saída (00:00)</label>
                                    </div>
                                </div>
                                <div style={{ height: 41 }} className="row">
                                    {loading ?
                                        <Loader /> :
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Calcular</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
