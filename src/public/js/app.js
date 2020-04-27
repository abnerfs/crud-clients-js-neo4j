

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

            $('#client-phone').mask('(00) 0 0000-0000');
            $('#address-zip').mask('00000-000');

            $('#modalClients').modal({
                show: true,
                backdrop: 'static',
                keyboard: true
            })

            if(client) {
                const clientBirthday = document.getElementById('client-birthday');
                const dateValue = app.selectedClient.birthDay || null;
                if(dateValue)
                    dateValue.setDate(dateValue.getDate() - 1);
                else
                    clientBirthday.value = null;

                clientBirthday.valueAsDate = dateValue;
            }
        },
        saveClient: (client) => {
            client.birthDay = document.getElementById('client-birthday').valueAsDate;
            client.birthDay.setDate(client.birthDay.getDate() + 1);

            const clientSave = {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone,
                birthDay: client.birthDay.toISOString(),
                address: {
                    address: client.address.address,
                    streetNumber: client.address.streetNumber,
                    neighborhood: client.address.neighborhood,
                    zipcode: client.address.zipcode,
                }
            }

            clientService.saveClient(clientSave)
                .then(() => {
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
