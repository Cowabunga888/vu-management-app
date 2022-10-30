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
import { createNewUser } from '../../services/app/users.app';

const userSchema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().required()
}).required()

export default function UserFormBuilderDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  })

  const onAddUser = (data: any, e: any) => {
    e.preventDefault()
    if (data.email) {
      createNewUser(data).then(resp => {
        if (resp.status !== 200) return alert("Create room fail");
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
        <DialogTitle>Add User </DialogTitle>


        <DialogContent>
          <form onSubmit={(e) => handleSubmit(onAddUser)(e)}>

            <Controller
              name={"email"}
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    error={Object.hasOwn(errors, "email")}
                    helperText={`${errors?.name?.message || ""}`}
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )
              }}
            />

            <Controller
              name={"fullname"}
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="fullname"
                    error={Object.hasOwn(errors, "fullname")}
                    helperText={`${errors?.name?.message || ""}`}
                    label="Fullname"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )
              }}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onAddUser)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}