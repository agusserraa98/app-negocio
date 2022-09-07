// material
import { Container, Stack, Typography } from '@mui/material';

// firebase
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';
import firebaseApp from '../firebase/firebase';


// componentes
import Page from '../components/Page';
import FormGeneral from '../components/my_components/FormGeneral';

// mock
import PRODUCTS from '../_mock/products';





// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const db = getFirestore(firebaseApp);
  return (
    <Page title="Probando giladas">
      <Container>
        <FormGeneral />
        <Typography variant='h3'> Aca va a ir una tabla con los ingresos del usuario</Typography>
      </Container>
    </Page>
  );
}
