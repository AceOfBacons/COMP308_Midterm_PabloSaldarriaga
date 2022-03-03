import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
function UpdateGame(props) {
    const updateUser = (event) => {
        event.preventDefault()

        window.location.href = `/games/update/${props.id}`
    }
    return (<Update onClick={updateUser}>Update</Update>);


}

function DeleteGame(props) {
    const deleteUser = (event) => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the game ${props.id} permanently?`,
            )
        ) {
            api.deleteGameById(props.id)
            window.location.reload()
        }
    }
    return (<Delete onClick={deleteUser}>Delete</Delete>);
}

function GamesList(props) {
    const [movies, setMovies] = useState([]);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {


            setLoading(true);

            await api.getAllGames().then(result => {
                setMovies(result.data.data);
                setLoading(false);

            }).catch((error) => {
                console.log('error in fetchData:', error)
            });
        };
        fetchData();

    }, []);

    const columns = [
        {
            Header: 'Survey ID',
            accessor: '_id',
            filterable: true,
        },
        {
            Header: 'Game Genre',
            accessor: 'gameGenre',
            filterable: true,
        },
        {
            Header: 'Days Played Per Year',
            accessor: 'daysPerYear',
            filterable: true,
        },
        {
            Header: 'Age',
            accessor: 'age',
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <DeleteGame id={props.original._id} />
                    </span>
                )
            },
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props) {
                return (
                    <span>
                        <UpdateGame id={props.original._id} />
                    </span>
                )
            },
        },
    ]


    let showTable = true
    if (!movies.length) {
        showTable = false
    }

    return (
        <Wrapper>
            {showTable && (
                <ReactTable
                    data={movies}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                />
            )}
        </Wrapper>
    )
}


export default GamesList
