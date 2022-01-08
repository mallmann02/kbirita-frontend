import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  ButtonGroup,
  TextField,
  Box,
} from '@mui/material';
import ContextProducts from '../context/ContextProducts';

function ProductCard(props) {
  const { id, name, price, urlImage: image } = props;
  const [quantity, setQuantity] = useState(0);
  const { setProductCartQuantity } = useContext(ContextProducts);

  useEffect(() => {
    setProductCartQuantity(id, +(quantity));// eslint-disable-next-line
  }, [quantity]);

  return (
    <Card
      sx={ {
        width: '150px',
        background: 'white',
        borderRadius: '2px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        minWidth: '200px',
        paddingBottom: '20px',
      } }
    >
      <CardContent
        sx={ {
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
        } }
      >
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            gap: 0.5,
          } }
        >
          <Typography
            sx={ { fontSize: 14 } }
            color="text.secondary"
            gutterBottom
          >
            R$
          </Typography>
          <Typography
            sx={ { fontSize: 14 } }
            color="text.secondary"
            data-testid={ `customer_products__element-card-price-${id}` }
            gutterBottom
          >
            { price ? price.replace('.', ',') : 0 }
          </Typography>
        </Box>
        <CardMedia
          component="img"
          height="125"
          sx={ {
            objectFit: 'contain',
          } }
          image={ image }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <Typography
          variant="body2"
          data-testid={ `customer_products__element-card-title-${id}` }
          sx={ {
            alignSelf: 'center',
          } }
        >
          { name }
        </Typography>
      </CardContent>
      <ButtonGroup
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5px',
        } }
      >
        <Button
          size="medium"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => {
            if (quantity !== 0) setQuantity(quantity - 1);
          } }
        >
          -
        </Button>
        <TextField
          sx={ {
            maxWidth: 50,
            height: '50px',
          } }
          inputProps={ {
            'data-testid': `customer_products__input-card-quantity-${id}`,
          } }
          onChange={ (e) => setQuantity(+(e.target.value)) }
          value={ quantity.toString() }
        />
        <Button
          size="medium"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => setQuantity(quantity + 1) }
        >
          +
        </Button>
      </ButtonGroup>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default ProductCard;
