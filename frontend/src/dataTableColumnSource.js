
export const customers = [
    {
        id: 1,
        field: '_id',
        headerName: "ID",
        width: 70
    },
    {
        id: 2,
        field: 'firstName',
        headerName: "Vorname",
        width: 150
    },
    {
        id: 3,
        field: 'lastName',
        headerName: "Nachname",
        width: 150
    },
    {
        id: 4,
        field: 'address',
        headerName: "Strasse",
        width: 250
    },
    {
        id: 5,
        field: 'postalCode',
        headerName: "Postleitzahl",
        width: 100
    },
    {
        id: 6,
        field: 'city',
        headerName: "Stadt",
        flex: 1
    },
    {
        id: 7,
        field: 'isActivated',
        type: 'boolean',
        headerName: "Aktiviert",
        flex: 1
    },
]

export const products = [
    {
        id: 1,
        field: '_id',
        headerName: "ID",
        width: 70
    },
    {
        id: 2,
        field: 'productNumber',
        headerName: "Produkt-No.",
        width: 150
    },
    {
        id: 3,
        field: 'title',
        headerName: "Bezeichnung",
        width: 200
    },
    {
        id: 4,
        field: 'from',
        headerName: "Herkunftsland",
        width: 200
    },
    {
        id: 5,
        field: 'price',
        headerName: "Preis pro kg.",
        width: 100
    },
    {
        id: 6,
        field: 'stockCount',
        headerName: "Lagerbestand",
        width: 150
    }
]

export const users = [
    {
        id: 1,
        field: '_id',
        headerName: "ID",
        width: 70
    },
    {
        id: 2,
        field: 'firstName',
        headerName: "Vorname",
        width: 150
    },
    {
        id: 3,
        field: 'lastName',
        headerName: "Nachname",
        width: 200
    },
    {
        id: 4,
        field: 'userEmail',
        headerName: "Email",
        width: 200
    },
    {
        id: 5,
        field: 'isAdmin',
        type: 'boolean',
        headerName: "Administrator",
        icon: `{< SecurityIcon />}`,
        width: 200
    },
    {
        id: 6,
        field: 'status',
        headerName: "Status",
        width: 100
    }
]