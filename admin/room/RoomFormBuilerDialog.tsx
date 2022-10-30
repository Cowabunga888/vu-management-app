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
import { createNewRoom } from '../../services/app/rooms.app';

const roomSchema = yup.object({
  name: yup.string().required()
}).required()

export default function RoomFormBuilderDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(roomSchema)
  })

  const onAddRoom = (data: any, e: any) => {
    e.preventDefault()
    if (data.name) {
      createNewRoom(data).then(resp => {
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
        <DialogTitle>Add room </DialogTitle>


        <DialogContent>
          <form onSubmit={(e) => handleSubmit(onAddRoom)(e)}>

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
                    label="Room name"
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
          <Button onClick={handleSubmit(onAddRoom)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}