

const app = new Vue({
    el: '#app',
    data: {
        clients: [],
        selectedClient: {

        },
        editClient: false
    },
    methods: {
        openClient: (client) => {
            app.editClient = false;
            app.selectedClient = Object.assign({}, client);


            $('#modalClients').modal({
                show: true,
                backdrop: 'static'
            })

            document.getElementById('client-birthday')
                .valueAsDate = app.selectedClient.birthDay || null; 
        },
        saveClient: (client) => {
            clientService.saveClient(client)
                .then(client => {

                })
                .catch(err => {
                    alert('Error while saving client: ' + err.message);
                })
        }
    }
})


clientService.loadClients()
    .then(clients => {
        app.clients = clients;
    })
    .catch(err => {
        alert('Error while loading clients: ', err.message);
    })