import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

const CardIngreso = (props) => {
    let colorCard= ""
    if (props.item.data.tipo==="egreso"){
        colorCard = "error.main"
    } else 
        colorCard = "success.main"
    return (
        <Card color="pink" key={props.item.id}>
            <CardContent>
                <Typography variant="h5" color={colorCard}>Tipo: {props.item.data.tipo}</Typography>
                <Typography variant="h5">Origen de la venta: {props.item.data.origenVenta}</Typography>
                <Typography variant="h5">Monto: {props.item.data.monto}</Typography>
                <Typography variant="h5">fecha: {props.item.data.hora}</Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" color="error" > eliminar</Button>
            </CardActions>
        </Card>
    )
}
export default CardIngreso;
