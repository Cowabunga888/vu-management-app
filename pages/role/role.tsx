import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridCellEditStopReasons, GridRenderCellParams, GridRowId, GridRowModel, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { callAPI } from '../../services/callAPI';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deleteRoleById, getRoleList, updateRoleById } from '../../services/app/roles.app';
import { Delete } from '@mui/icons-material';
import RoleFormBuilerDialog from '../../admin/role/RoleFormBuilerDialog';


function Roles() {
    return (
        <>
            <h1>Role management</h1>
            <BasicExampleDataGrid />
        </>
    )
}

export default Roles


const BasicExampleDataGrid = () => {
    const VISIBLE_FIELDS = ['ID', 'avatar', 'name', 'dateCreated', 'isAdmin'];

    const [datatable, setDatatable] = React.useState([]);

    const renderAvatar = (props: GridRenderCellParams) => {
        return <Avatar alt={props.field} src={props.value} />
    }

    const columns = [
        {
            "field": "id",
            "hide": false
        },
        {
            "field": "role_name",
            "headerName": "Role",
            "dataGeneratorUniquenessEnabled": true,
            "sortable": true,
            "width": 120,
            "editable": true,
        },
        {
            "field": "role_desciption",
            "headerName": "Role desciption",
            "dataGeneratorUniquenessEnabled": true,
            "sortable": true,
            "width": 120,
            "editable": true,
        },
        {
            field: 'actions',
            "headerName": "Actions",
            type: 'actions',
            getActions: (params: GridRowParams) => [
                //@ts-ignore
                <GridActionsCellItem key={'delete'} icon={<Delete />} onClick={() => { onDeleteRole(params) }} label="Delete" />,
            ]
        }
    ];

    const loadDataList = () => {
        getRoleList().then(res => {
            console.table(res.data.data)
            setDatatable(res.data.data);
        })
    }

    const onDeleteRole = React.useCallback((record: GridRowId) => {
        console.log(record)
        deleteRoleById(record).then((res) => {
            if (res.status !== 200) { return }
            loadDataList();
        })
    }, [])

    React.useEffect(() => {
        loadDataList();
    }, [])

    const onUpdateRow = React.useCallback(
        async (newRow: GridRowModel) => {
            let payloadUpdate: any = {
                id: newRow.id,
                ...newRow
            }
            const res: any = await updateRoleById(payloadUpdate);
            return res.status === 200 ? Promise.resolve(newRow) : Promise.reject(null)
        },
        []
    );
    const onUpdateRowError = React.useCallback((err: any) => {
        console.log(err);
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <RoleFormBuilerDialog onRefresh={loadDataList} />
            <DataGrid
                initialState={{
                    "columns": {
                        "columnVisibilityModel": {
                            "id": true,
                        }
                    }
                }}
                columns={columns} rows={datatable}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    }
                }}
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditStop={(param, event) => {
                    if (param.reason === GridCellEditStopReasons.cellFocusOut) {
                        event.defaultMuiPrevented = true
                    }
                }}
                getRowId={(row) => {
                    return row?.id
                }}
                processRowUpdate={onUpdateRow}
                onProcessRowUpdateError={onUpdateRowError}
            />
        </div>
    );
}