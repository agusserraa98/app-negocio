import { Alert, Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const FormGeneral = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      origenVenta: "",
      monto: null
    }
  });

  const onSubmit = (data) => { 
    console.log(data);
    Swal.fire("Ingreso/Egreso correcto","Cargar otra venta","success")
  }

  const handleError = (errors) => console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <Stack spacing={2}>
          <h2>Ingreos de datos</h2>
          <Select 
            {...register("origenVenta", {
              required: {
                value: true,
                message: "Origen venta requerido"
              },
              maxlenght: 10
            })}>
          <MenuItem value={"negocio"}>Negocio</MenuItem>
          <MenuItem value={"reparto"}>Reparto</MenuItem>
          <MenuItem value={"individual"}>Venta individual</MenuItem>
          </Select>
          <Typography variant="span" color="red" >
            {errors?.origenVenta?.message}
          </Typography>
          <TextField
            id="textMonto"
            placeholder="Ingrese Monto"
            type="number"
            {...register("monto", {
              required: {
                value: true,
                message: "Falta ingresar el monto"
              },
              maxlenght: 10
            })}
          />
          <Typography variant="span" color="red" >
            {errors?.monto?.message}
          </Typography>
          <Button type='submit'>Submit</Button>
        </Stack>
      </form>
    </div>
  );

}

export default FormGeneral;
