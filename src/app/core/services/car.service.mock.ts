const MOCK_MARCAS_RESPONSE = [   
    {
        "nome": "Acura",
        "codigo": "1"
    },
    {
        "nome": "Agrale",
        "codigo": "2"
    },
    {
        "nome": "Alfa Romeo",
        "codigo": "3"
    }
];

const MOCK_MODELOS_RESPONSE = [
    {
        "nome": "AMAROK CD2.0 16V\/S CD2.0 16V TDI 4x2 Die",
        "codigo": "5585"
    },
    {
        "nome": "AMAROK CD2.0 16V\/S CD2.0 16V TDI 4x4 Die",
        "codigo": "5586"
    },
    {
        "nome": "AMAROK Comfor. 3.0 V6 TDI 4x4 Dies. Aut.",
        "codigo": "9895"
    }
]

const MOCK_ANOS_RESPONSE = [
    {
        "nome": "2022 Diesel",
        "codigo": "2022-3"
    },
    {
        "nome": "2021 Diesel",
        "codigo": "2021-3"
    },
    {
        "nome": "2020 Diesel",
        "codigo": "2020-3"
    },
]

const MOCK_VALOR_RESPONSE = {
    "Valor": "R$ 125.318,00",
    "Marca": "VW - VolksWagen",
    "Modelo": "AMAROK High.CD 2.0 16V TDI 4x4 Dies. Aut",
    "AnoModelo": 2014n,
    "Combustivel": "Diesel",
    "CodigoFipe": "005340-6",
    "MesReferencia": "janeiro de 2023 ",
    "TipoVeiculo": 1n,
    "SiglaCombustivel": "D"
}

export default
{
    MOCK_MARCAS_RESPONSE,
    MOCK_MODELOS_RESPONSE,
    MOCK_ANOS_RESPONSE,
    MOCK_VALOR_RESPONSE
};