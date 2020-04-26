

const formatClient = (client) => {
    client.parsedAddress = `${client.address.address}, ${client.address.streetNumber} - ${client.address.neighborhood}`
    client.birthDay = new Date(client.birthDay);
    client.birthDayParsed = util.dateToString(client.birthDay);
    client.fullName = `${client.firstName} ${client.lastName}`
    return client;
}

const checkError = (obj) => {
    if(obj.error)
        throw new Error(obj.error);

    return obj;
}

const loadClients = () => 
    fetch('/api/v1/client', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(checkError)
    .then(clients => clients.map(formatClient))

        

const clientService = {
    loadClients
}