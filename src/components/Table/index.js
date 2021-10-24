import React from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import moment from 'moment';


const TableComponent = ({ loading, data, config, actions, actionsExc, onRowClick }) => {

    return (
        <Table loading={loading} data={data} height={300} onRowClick={onRowClick} style={{ fontSize: 12 }} >
            {config.map((c) => (
                <Column flexGrow={!c.width ? 1 : 0} width={c.width} flixed={c.fixed}>
                    <HeaderCell>{c.label}</HeaderCell>
                    <Cell dataKey={c.key} />
                </Column>
            ))}

            <Column width={60} flixed="right">
                <HeaderCell>Editar</HeaderCell>
                <Cell>{(item) => actions(item, 'update')}</Cell>
            </Column>
            <Column width={60} flixed="right">
                <HeaderCell>Delete</HeaderCell>
                <Cell>{(item) => actionsExc(item, 'delete')}</Cell>
            </Column>

        </Table>
    );
};

export default TableComponent;