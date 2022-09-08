import { Alert, Button, Card, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { get, now, set } from "lodash";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

// firebase
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase/firebase';

const FormGeneral = () => {
  // variables
  const db = getFirestore(firebaseApp);
  const [lista, setLista] = useState([])
  // funciones
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      origenVenta: "reparto",
      monto: null
    }
  });
  // submit
  const onSubmit = (data,items) => {
    const horax = +new Date();
    console.log(horax)
    data.hora = horax;
    console.log(data)
    getPedidos()
    try {
      addDoc(collection(db, 'ingresos'), {
        data
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  async function getPedidos() {
    try {
      const items = [];
      const response = await getDocs(collection(db, 'ingresos'))
      response.forEach((item)=>{
        items.push({...item.data(), id:item.id});
      })
      console.log(items)
      items.map((item)=>console.log(item.data.monto))
      setLista(items)
      return items;
    } catch (error) {
      console.error(error)
    }
  }

useEffect(()=>{
  console.log("me modifique")
},[lista])



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

      <div>
        <Stack spacing={2}>  
        { lista.map(item=>
            <Card key = {item.id}>
              <Typography variant="p">{item.data.origenVenta}</Typography>
              <Typography variant="h5">{item.data.monto}</Typography>
              <Typography variant="h5">{item.data.hora}</Typography>
            </Card>
        )
        }
        </Stack>
      </div>
    </div>
  );

}

export default FormGeneral;