import React, { useState } from 'react'

export default function CalcularHorasTrabalhadas() {
    const [intervaloTrabalhado, setIntervaloTrabalhado] = useState({
        horaInicial: '',
        horaFinal: ''
    })

    const handleSubmit = async (e = new Event()) => {
        e.preventDefault()
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
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input onChange={handleInputChange} placeholder="00:00" id="horaInicial" name="horaInicial" type="text" className="validate" />
                                    <label for="horaInicial">Hora inicial (00:00)</label>
                                </div>
                                <div className="input-field col s6">
                                    <input onChange={handleInputChange} placeholder="00:00" id="horaFinal" name="horaFinal" type="text" className="validate" />
                                    <label for="horaFinal">Hora Final (00:00)</label>
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
