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

export default function CalcularHorasTrabalhadas() {
    const [intervaloTrabalhado, setIntervaloTrabalhado] = useState({
        horaInicial: '',
        horaFinal: ''
    })
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
            }).then((response) => {
                setTimeout(() => setLoading(false), 3000)
                return { status: response.status, body: response.json() }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleInputChange = (e = new Event()) => {
        setIntervaloTrabalhado({ ...intervaloTrabalhado, [e.target.name]: e.target.value })
    }

    return (
        <div className="row">
            <div class="col s12 m6 mb-0 offset-m3 l4 offset-l4">
                <h4>Calculo de horas trabalhadas</h4>
                <p>Insira abaixo a hora de entrada e a hora de saída</p>
                <div className="card center-align">
                    <div className="card-content">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={handleInputChange} placeholder="00:00" id="horaInicial" name="horaInicial" type="text" className="validate" />
                                    <label for="horaInicial">Hora de entrada (00:00)</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={handleInputChange} placeholder="00:00" id="horaFinal" name="horaFinal" type="text" className="validate" />
                                    <label for="horaFinal">Hora de saída (00:00)</label>
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i class="material-icons right">send</i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
