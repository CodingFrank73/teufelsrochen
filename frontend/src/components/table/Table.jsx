import "./table.scss";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const List = () => {

    const rows = [
        {
            id: 1231231,
            product: "Haifisch-Filet",
            img: "",
            customer: "Jürgen Müller",
            amount: 450,
            status: "Geliefert"
        },
        {
            id: 3546792,
            product: "Walbrust",
            img: "",
            customer: "Anna Meier",
            amount: 900,
            status: "Bestellt"
        },
        {
            id: 1645892,
            product: "Räucher-Ahl",
            img: "",
            customer: "Wolfgang Austria",
            amount: 220,
            status: "Zustellung"
        },
    ]
    return (

        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Tracking ID</TableCell>
                        <TableCell className="tableCell">Product</TableCell>
                        <TableCell className="tableCell">Customer</TableCell>
                        <TableCell className="tableCell">Amount</TableCell>
                        <TableCell className="tableCell">Lieferstatus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">{row.id}</TableCell>
                            <TableCell className="tableCell">{row.product}</TableCell>
                            <TableCell className="tableCell">{row.customer}</TableCell>
                            <TableCell className="tableCell">{row.amount}</TableCell>
                            <TableCell className="tableCell"><span className={`status ${row.status}`}>{row.status}</span></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default List;