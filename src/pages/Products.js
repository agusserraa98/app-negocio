import { Container, Stack, Typography } from '@mui/material';
import FormGeneral from '../components/my_components/FormGeneral';

import Page from '../components/Page';

// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  return (
    <Page title="Probando giladas">
      <Container>
        <FormGeneral />
      </Container>
    </Page>
  );
}
