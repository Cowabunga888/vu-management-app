import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createNewRole } from '../../services/app/roles.app';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';

const roomSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  value: yup.string().required()
}).required()

export default function RoleFormBuilderDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(roomSchema)
  })

  const onAddRole = (data: any, e: any) => {
    e.preventDefault()
    if (data.name) {
      createNewRole(data).then(resp => {
        if (resp.status !== 200) return alert("Create role fail");
        handleClose()
        props.onRefresh()
      })
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='my-2'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add role</DialogTitle>


        <DialogContent>
          <form onSubmit={(e) => handleSubmit(onAddRole)(e)}>

            <Controller
              name={"name"}
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    error={Object.hasOwn(errors, "name")}
                    helperText={`${errors?.name?.message || ""}`}
                    label="Role name"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )
              }}
            />
            <Controller
              name={"desciption"}
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    error={Object.hasOwn(errors, "description")}
                    helperText={`${errors?.name?.message || ""}`}
                    label="Role desciption"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )
              }}
            />

            <Controller
              name={"value"}
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <FormControl sx={{ m: 1, minWidth: 120 }} error={Object.hasOwn(errors, "value")}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role-error"
                      label="Role"
                      renderValue={(value) => `⚠️  - ${value}`}
                      {...field}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'ADMIN'}>Admin</MenuItem>
                      <MenuItem value={'MANAGER'}>Manager</MenuItem>
                      <MenuItem value={'MEMBER'}>Member</MenuItem>
                    </Select>
                    {Object.hasOwn(errors, "value") && <FormHelperText>{`${errors?.value?.message}`}</FormHelperText>}
                  </FormControl>
                )
              }}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onAddRole)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}