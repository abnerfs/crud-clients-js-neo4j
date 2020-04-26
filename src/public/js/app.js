

const app = new Vue({
    el: '#app',
    data: {
        clients: [],
        selectedClient: {
            address:  {

            }
        },
        editClient: false
    },
    methods: {
        deleteClient: (id) => {
            clientService.deleteClient(id)
                .then(() => {
                    loadClients();
                    $('#modalClients').modal('hide');
                })
                .catch(err => {
                    alert('Error while delegint client: ' + err.message);
                })
        },
        openClient: (client) => {
            app.editClient = !Boolean(client);
            app.selectedClient = Object.assign({}, client || { address : { } });


            $('#modalClients').modal({
                show: true,
                backdrop: 'static'
            })

            if(client)
                document.getElementById('client-birthday')
                    .valueAsDate = app.selectedClient.birthDay || null; 
        },
        saveClient: (client) => {
            client.birthDay = document.getElementById('client-birthday').valueAsDate;

            const clientSave = {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                birthDay: client.birthDay,
                address: {
                    address: client.address.address,
                    streetNumber: client.address.streetNumber,
                    neighborhood: client.address.neighborhood
                }
            }

            clientService.saveClient(clientSave)
                .then((clientSaved) => {
                    // if(client.id) {
                    //     let clientIndex = app.clients.findIndex(x => x.id === client.id);
                    //     if(clientIndex > -1)
                    //         app.clients[clientIndex] = clientSaved;
                    // }
                    // else 
                    //     app.clients.push(clientSaved);
                    loadClients();
                    $('#modalClients').modal('hide');
                })
                .catch(err => {
                    alert('Error while saving client: ' + err.message);
                })
        }
    }
})

const loadClients = () => {
    clientService.loadClients()
        .then(clients => {
            app.clients = clients;
        })
        .catch(err => {
            alert('Error while loading clients: ', err.message);
        })
}

loadClients();
