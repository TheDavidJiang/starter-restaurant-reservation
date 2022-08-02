import React from "react";


export default function TableDisplay({ tables = [], onFinish }){

    const handleFinish = ({
        target: {dataset: {tableIdFinish, reservationIdFinish}} = {},
    }) => {
       if (
            tableIdFinish && 
            reservationIdFinish && 
            window.confirm(
                "Is this table ready to seat new guests?\n\nThis cannot be undone."
            )
        ) {
            onFinish(tableIdFinish, reservationIdFinish)
        }
    }

    const rows = tables.map((table) => {
        return (
            <tr key={table.table_id}>
                <td>{table.table_id}</td>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status={table.table_id}>
                {table.reservation_id ? "Occupied" : "Free"}
                </td>
                <td>
                    {table.reservation_id ? (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            data-table-id-finish={table.table_id}
                            data-reservation-id-finish={table.reservation_id}
                            onClick={handleFinish}
                        >
                        Finish
                        </button>
                    ) : ( "" )}
                </td>
            </tr>
        );
    });

    return (
        <div className="table-responsive">
            <table className="table no-wrap">
                <thead>
                <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">TABLE NAME</th>
                    <th className="border-top-0">CAPACITY</th>
                    <th className="border-top-0">Free?</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}
