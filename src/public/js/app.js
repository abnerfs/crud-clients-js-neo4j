

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
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    clientService.deleteClient(id)
                        .then(() => {
                            loadClients();
                            $('#modalClients').modal('hide');
                            Swal.fire(
                                'Deleted!',
                                'Client deleted.',
                                'success'
                              )
                        })
                        .catch(err => {
                            Swal.fire(
                                'Error while deleting client', err.message, 'error'
                            )
                        })
                }
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
                    neighborhood: client.address.neighborhood,
                    zipcode: client.address.zipcode
                }
            }

            clientService.saveClient(clientSave)
                .then((clientSaved) => {
                    loadClients();
                    $('#modalClients').modal('hide');

                    Swal.fire(
                        'Done!',
                        'Client saved.',
                        'success'
                      )
                })
                .catch(err => {
                    Swal.fire(
                        'Error while saving client', err.message, 'error'
                    )
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
            Swal.fire(
                'Error while loading clients', err.message, 'error'
            )
        })
}

loadClients();
