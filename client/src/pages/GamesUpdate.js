import React, { useState, useEffect } from 'react'
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
function GamesUpdate(props) {
    const [id, setId] = useState(props.match.params.id);
    const [daysPerYear, setdaysPerYear] = useState('');
    const [age, setage] = useState('');
    const [gameGenre, setgameGenre] = useState('');

    const handleSelectGenre = (event) => {
        console.log(event.target.value)
        setgameGenre(event.target.value);
    }

    useEffect(()=>{
        const fetchData = async () => {
        const game = await api.getGameById(id)
        setdaysPerYear(game.data.data.daysPerYear);
        setage(game.data.data.age);
        setgameGenre(game.data.data.gameGenre);
        };
       fetchData(); 
    },[id]);
    const handleChangeInputdaysPerYear = (event) => {
        const value = event.target.validity.valid
            ? event.target.value
            : daysPerYear

        setdaysPerYear(value);
    }
    const handleUpdateGame = async (event) =>{
        const payload = { daysPerYear, age, gameGenre }
        console.log(payload)
        await api.updateGameById(id, payload).then(res => {
            window.alert(`game updated successfully`)
            setdaysPerYear('');
            setage('');
            setgameGenre('');
            window.location.href = `/games/list`;
            
        })


    };

    return (
        <Wrapper>
            <Title>Create game</Title>

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

            <Button onClick={handleUpdateGame}>Update game</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    );  
}


export default GamesUpdate
