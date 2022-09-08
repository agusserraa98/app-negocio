import { async } from '@firebase/util';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

// firebase
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase/firebase';


const CardIngreso = (props) => {
    let colorCard= ""
    if (props.item.data.tipo==="egreso"){
        colorCard = "error.main"
    } else 
        colorCard = "success.main"
    
    const db = getFirestore(firebaseApp);

    const deleteIngreso = async(id) => {
        await deleteDoc(doc(db,"ingresos",id)) 
        window.location.reload();

    }
    
    return (
        <Card  key={props.item.id}>
            <CardContent>
                <Typography variant="h5" color={colorCard}>Tipo: {props.item.data.tipo}</Typography>
                <Typography variant="h5">Origen de la venta: {props.item.data.origenVenta}</Typography>
                <Typography variant="h5">Monto: {props.item.data.monto}</Typography>
                <Typography variant="h5">fecha: {props.item.data.hora}</Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" color="error" onClick={()=>deleteIngreso(props.item.id)} > Eliminar</Button>
            </CardActions>
        </Card>
    )
}
export default CardIngreso;
