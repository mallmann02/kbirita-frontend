import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ContextProducts from '../context/ContextProducts';
import ProviderProducts from '../context/ProviderProducts';
import CustomerProducts from '../screens/CustomerProducts';
import axios from 'axios';

const name = 'Carlos Silva e Silva';
const email = 'carlos@email.com';
const password = '123456';
const urlImagesBasePath = `${process.env.REACT_APP_API_BASE_URL}/images`;
const products2 = [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "urlImage": `${urlImagesBasePath}/skol_lata_350ml.jpg`
    },
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": "7.50",
      "urlImage": `${urlImagesBasePath}/heineken_600ml.jpg`
    },
    {
      "id": 3,
      "name": "Antarctica Pilsen 300ml",
      "price": "2.49",
      "urlImage": `${urlImagesBasePath}/antarctica_pilsen_300ml.jpg`
    },
    {
      "id": 4,
      "name": "Brahma 600ml",
      "price": "7.50",
      "urlImage": `${urlImagesBasePath}/brahma_600ml.jpg`
    },
    {
      "id": 5,
      "name": "Skol 269ml",
      "price": "2.19",
      "urlImage": `${urlImagesBasePath}/skol_269ml.jpg`
    },
    {
      "id": 6,
      "name": "Skol Beats Senses 313ml",
      "price": "4.49",
      "urlImage": `${urlImagesBasePath}/skol_beats_senses_313ml.jpg`
    },
    {
      "id": 7,
      "name": "Becks 330ml",
      "price": "4.99",
      "urlImage": `${urlImagesBasePath}/becks_330ml.jpg`
    },
    {
      "id": 8,
      "name": "Brahma Duplo Malte 350ml",
      "price": "2.79",
      "urlImage": `${urlImagesBasePath}/brahma_duplo_malte_350ml.jpg`
    },
    {
      "id": 9,
      "name": "Becks 600ml",
      "price": "8.89",
      "urlImage": `${urlImagesBasePath}/becks_600ml.jpg`
    },
    {
      "id": 10,
      "name": "Skol Beats Senses 269ml",
      "price": "3.57",
      "urlImage": `${urlImagesBasePath}/skol_beats_senses_269ml.jpg`
    },
    {
      "id": 11,
      "name": "Stella Artois 275ml",
      "price": "3.49",
      "urlImage": `${urlImagesBasePath}/stella_artois_275ml.jpg`
    }
  ];

const NAVBAR_LINK_PRODUTOS = 'customer_products__element-navbar-link-products'
const NAVBAR_LINK_MEUSPEDIDOS = 'customer_products__element-navbar-link-orders';
const NAVBAR_LINK_SAIR = 'customer_products__element-navbar-link-logout';
const PAGE_BUTTON_CARRINHO = 'customer_products__button-cart';
const PAGE_LINK_CHECKOUT = 'customer_products__checkout-bottom-value';

jest
.spyOn(axios, 'get')
.mockImplementation(() => Promise.resolve({ status: 200, statusText: 'ok', data: products2 }))

const renderWithContext = (
  component) => {
  return {
    ...render(
       <Router><ProviderProducts value={ContextProducts}>
            {component}
        </ProviderProducts></Router>)
  }
};

describe('03 - Teste da pagina de produtos do usuario', () => {
  beforeEach(cleanup);
  
  it('Renderiza os itens corretos', () => {
    renderWithContext(<CustomerProducts />);
    
    const navbarLinkProdutos = screen.getByTestId(NAVBAR_LINK_PRODUTOS);
    const navbarLinkMeusPedidos = screen.getByTestId(NAVBAR_LINK_MEUSPEDIDOS);
    const navbarLinkSair = screen.getByTestId(NAVBAR_LINK_SAIR);
    const pageButtonSair = screen.getByTestId(PAGE_BUTTON_CARRINHO);
    const pageLinkCheckout = screen.getByTestId(PAGE_LINK_CHECKOUT);

    
    expect(navbarLinkProdutos).toBeInTheDocument();
    expect(navbarLinkMeusPedidos).toBeInTheDocument();
    expect(navbarLinkSair).toBeInTheDocument();
    expect(pageButtonSair).toBeInTheDocument();
    expect(pageLinkCheckout).toBeInTheDocument();
  });
});
