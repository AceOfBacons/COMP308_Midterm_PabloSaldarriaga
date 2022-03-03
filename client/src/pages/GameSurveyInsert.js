import React, { useState } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;





    `


function GameInsert(props) {
    const [daysPerYear, setdaysPerYear] = useState('');
    const [age, setage] = useState('');
    const [gameGenre, setgameGenre] = useState("Action"); //default value
    
    const handleSelectGenre = (event) => {
        console.log(event.target.value)
        setgameGenre(event.target.value);
    }

    const handleChangeInputdaysPerYear = (event) => {
        const value = event.target.validity.valid
            ? event.target.value
            : daysPerYear

        setdaysPerYear(value);
    }

    const handleAddMovie = async (event) => {
        const payload = { gameGenre, daysPerYear, age }
        console.log(payload)
        await api.insertGame(payload).then(res => {
            window.alert(`Game inserted successfully`)
            setdaysPerYear('');
            setage('');
            window.location.href = `/games/list`;

        })


    };


    return (
        <Wrapper>
            <Title>Create Game</Title>

            <Label>Genre: </Label>
            <select className="form-control mb-2" value={gameGenre} onChange={handleSelectGenre}>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Strategy">Strategy</option>
                <option value="Sports">Sports</option>
            </select>
            
            <Label>Days Per Year: </Label>
            <InputText
                type="number"
                step="1"
                lang="en-US"
                min="1"
                max="365"
                value={daysPerYear}
                onChange={handleChangeInputdaysPerYear}
            />

            <Label>Age: </Label>
            <InputText
                type="number"
                value={age}
                onChange={e => setage(e.target.value)}
            />

            <Button onClick={handleAddMovie}>Add Game</Button>
            <CancelButton href={'/games/list'}>Cancel</CancelButton>
        </Wrapper>
    );
}

export default GameInsert
