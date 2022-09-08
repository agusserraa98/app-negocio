import { Alert, Button, Card, CardContent, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { get, now, set } from "lodash";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

// firebase
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase/firebase';
import CardIngreso from "./CardIngreso";

const FormGeneral = () => {
  // variables
  const db = getFirestore(firebaseApp);
  const [lista, setLista] = useState([])
  // funciones
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      origenVenta: "reparto",
      monto: null,
      tipo: "ingreso"
    }
  });
  // submit
  const onSubmit = (data, items) => {
    const horax = +new Date();
    console.log(horax)
    data.hora = horax;
    console.log(data)
    getPedidos()
    Swal.fire(
      'Muy bien, se cargo',
      'Continuar',
      'success'
    )
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
      response.forEach((item) => {
        items.push({ ...item.data(), id: item.id });
      })
      items.sort( (a, b) => {return b.data.hora - a.data.hora} // ordena por fecha
      )
      setLista(items)
      return items;
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
  }, [lista])

  useEffect(() => {
    getPedidos()
  }, [])


  const handleError = (errors) => console.log(errors);



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <Stack spacing={2}>
          <h2>Ingreos de datos</h2>
          <InputLabel> Tipo</InputLabel>
          <Select
            {...register("tipo", {
              required: {
                value: true,
                message: "Tipo requerido"
              },
              maxlenght: 10
            })}
          >
            <MenuItem value={"ingreso"}>Ingreso</MenuItem>
            <MenuItem value={"egreso"}>Egreso</MenuItem>
          </Select>
          <Typography variant="span" color="red" >
            {errors?.tipo?.message}
          </Typography>
          <InputLabel> Origen</InputLabel>
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
          {
            lista.map(item => <CardIngreso item={item} />)
          }
        </Stack>
      </div>
    </div>
  );

}

export default FormGeneral;