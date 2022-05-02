import "./datatable.scss";

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import apiBaseUrl from "../../api";

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const Datatable = ({ route, columns }) => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [mainRoute, setMainRoute] = useState("");

    useEffect(() => {
        setMainRoute(seperateMainRoute(route))

        fetch(apiBaseUrl + `${route}`)
            .then(res => res.json())
            .then(res => setData(res))

    }, [route]);


    function seperateMainRoute(route) {
        const mainRouteArray = route.split("/");
        return mainRouteArray[2]
    }

    console.log("mainRoute", mainRoute);


    const actionColumn = [
        {
            field: 'action',
            type: 'actions',
            headerName: '',
            flex: .5,

            renderCell: (params) => [
                <GridActionsCellItem icon={< ModeOutlinedIcon />} label="Edit" onClick={() => navigate(`/${mainRoute}/` + params.row._id)} />,
                <GridActionsCellItem icon={<DeleteOutlineOutlinedIcon />} label="Delete" />
            ]
        }
    ]

    return (
        <div className="datatable">
            <Stack
                sx={{ width: '100%', mb: 1 }}
                direction="row"
                alignItems="flex-start"
                justifyContent="flex-end"
                columnGap={1}
            >
                <button className="addNew" onClick={() => (navigate(`/${mainRoute}/new`))}>Neuen {mainRoute} anlegen</button>
            </Stack>
            <DataGrid getRowId={(row) => row._id}
                rows={data}
                columns={columns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                columnVisibilityModel={{
                    _id: false
                }}
            />

        </div>

    );
}

export default Datatable;