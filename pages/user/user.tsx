import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridCellEditStopReasons, GridRenderCellParams, GridRowId, GridRowModel, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import user_data from './data.json';
import { callAPI } from '../../services/callAPI';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deleteUserById, getUserList, updateUserById } from '../../services/app/users.app';
import { Delete } from '@mui/icons-material';
import UserFormBuilderDialog from '../../admin/user/UserFormBuilerDialog';
import RoleSelectionBox from '../../admin/role/RoleSelectionBox';
import { getRoleList } from '../../services/app/roles.app';


function Users() {
  return (
    <>
      <h1>User management</h1>
      <BasicExampleDataGrid />
    </>
  )
}

export default Users


const BasicExampleDataGrid = () => {
  const [dataTable, setDataTable] = React.useState([]);
  const [roleOpts, setRoleOpts] = React.useState([]);

  const [datatable, setDatatable] = React.useState([]);

  const renderAvatar = (props: GridRenderCellParams) => {
    return <Avatar alt={props.field} src={props.value} />
  }

  const columns = [
    {
      "field": "id",
      "hide": true
    },
    {
      "field": "user_avatar_url",
      "headerName": "Avatar",
      "disableExport": true,
      "width": 60,
      renderCell: renderAvatar
    },
    {
      "field": "role",
      "headerName": "Role",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 100,
      "editable": false,
      "renderCell": (param: any) => {
        return <RoleSelectionBox role={param.value} user={param.row} roleOpts={roleOpts} onUpdate={updateUserRole} />
      }
    },
    {
      "field": "fullname",
      "headerName": "Fullname",
      "dataGeneratorUniquenessEnabled": true,
      "sortable": true,
      "width": 220,
      "editable": true,
    },
    {
      "field": "username",
      "headerName": "Username",
      "dataGeneratorUniquenessEnabled": true,
      "sortable": true,
      "width": 220,
      "editable": true,
    },
    {
      "field": "email",
      "headerName": "Email",
      "width": 250,
      "editable": false,
      "hide": false
    },
    {
      "field": "password",
      "headerName": "Password",
      "width": 150,
      "editable": true,
      "hide": false
    },
    {
      "field": "state",
      "headerName": "State",
      "width": 50,
      "editable": false,
      "type": "boolean",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "valueOptions": [true, false],
      "hide": false
    },
    {
      field: 'actions',
      "headerName": "Actions",
      type: 'actions',
      getActions: (params: GridRowParams) => [
        //@ts-ignore
        <GridActionsCellItem key={'delete'} icon={<Delete />} onClick={() => { onDeleteUser(params) }} label="Delete" />,
      ]
    },
  ];

  const loadDataList = () => {
    getUserList().then(res => {
      console.table(res.data.data)
      setDatatable(res.data.data);
    })

    loadRoleOpts();
  }

  const loadRoleOpts = () => {
    getRoleList().then(res => {
      console.table(res.data.data)
      setRoleOpts(res.data.data)
    })
  }

  const updateUserRole = (userData: any, roleUpdate: any) => {
    let payloadUpdate: any = {
      id: userData.id,
      ...userData,
      role: roleUpdate
    }
    updateUserById(payloadUpdate).then(resp => {
      if (resp.status === 200) loadDataList();
    })
  }

  const onDeleteUser = React.useCallback((record: GridRowId) => {
    console.log(record)
    deleteUserById(record).then((res) => {
      if (res.status !== 200) { return }
      loadDataList();
    })
  }, [])

  React.useEffect(() => {
    loadDataList();
  }, [])

  const data = user_data;


  const onUpdateRow = React.useCallback(
    async (newRow: GridRowModel) => {
      let payloadUpdate: any = {
        id: newRow.id,
        ...newRow
      }
      const res: any = await updateUserById(payloadUpdate);
      return res.status === 200 ? Promise.resolve(newRow) : Promise.reject(null)
    },
    []
  );

  const onUpdateRowError = React.useCallback((err: any) => {
    console.log(err);
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <UserFormBuilderDialog onRefresh={loadDataList} />
      <DataGrid
        initialState={{
          "columns": {
            "columnVisibilityModel": {
              "id": false,
            }
          }
        }}
        //@ts-ignore
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

function getListOfRole() {
  throw new Error('Function not implemented.');
}
