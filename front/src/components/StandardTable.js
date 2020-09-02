import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Table, TableHead, TableBody, TableRow, TableHeadCell, TableDataCell, Button} from 'react95'

import {usePages} from '../hooks'

const tableTypes = {
    twoods: ['content', 'likes'],
    users: ['username'],
    rooms: ['name']
}

const StandardTable = ({initialState, type}) => {
    const history = useHistory()
    const {current, operations} = usePages(initialState)

    const {next, prev, sort} = operations

    const tableType = tableTypes[type]

    if (!current[0]) return null

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow head>
                        {tableType.map(head => {
                            return (
                                <TableHeadCell onClick={() => sort(head)} key={head}>
                                    {head}
                                </TableHeadCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {current.map(item => {
                        return (
                            <TableRow
                                key={item.id}
                                onClick={() => history.push(`/${type}/${item.id}`)}
                            >
                                {tableType.map(cell => {
                                    return <TableDataCell key={cell}>{item[cell]}</TableDataCell>
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Button
                disabled={!prev}
                onClick={() => prev()}
            >
                Prev Page
            </Button>
            <Button
                disabled={!next}
                onClick={() => next()}
            >
                    Next Page
            </Button>
        </div>
    )
}



export default StandardTable
