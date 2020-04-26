const { getSession } = require('../services/database');
const { epCatch } = require('../services/util')

const { clientSchema } = require('../models');
const randomid = require('randomid');



const getClients = async (req, res) => {
    Promise.resolve()
        .then(async () => {
            const session = getSession();

            try {
                const result = await session.run(
                    `MATCH(a:Client)-[:LIVES_IN]->(b:Address) RETURN a{.*, address: b{.*} }`
                )
                const clients = result.records.map(r => r.get(0));
                res.json(clients);
            }
            finally {



                
                session.close();
            }
        })
        .catch(err => epCatch(res, err));
}

const updateClient = (req, res) => {
    Promise.resolve()
        .then(async () => {
            const { client } = req.body;

            const valid = clientSchema.validate(client || {});
            if (valid.error)
                throw new Error(valid.error);

            if (!client.id)
                throw new Error("Invalid client id");

            const session = getSession();

            try {
                const address = Object.assign({}, client.address);

                const clientUpdate = Object.assign({}, client);
                clientUpdate.address = undefined;

                const result = await session.run(
                    `MATCH (a:Client { id: $client.id })-[:LIVES_IN]->(b: Address)
                    SET a = $client,
                    b = $address
                    RETURN a{.*, address: b{.*}}
                `,
                    {
                        client: clientUpdate,
                        address
                    }
                )
                res.json({
                    updated: result.records.length > 0
                });
            }
            finally {
                session.close();
            }
        })
        .catch(err => epCatch(res, err));


}

const insertClient = async (req, res) => {
    Promise.resolve()
        .then(async () => {
            const { client } = req.body;

            const valid = clientSchema.validate(client || {});
            if (valid.error) {
                throw new Error(valid.error);
            }

            client.id = randomid(30);

            const session = getSession();

            try {
                const result = await session.run(
                    `CREATE (a:Client { id: $id, firstName: $firstName, lastName: $lastName, email: $email, birthDay: $birthDay })-[:LIVES_IN]-> (b: Address $address ) 
                    RETURN a{.*, address: b{.*}}
                    `,
                    client
                )
                const clientCreated = result.records[0].get(0)
                res.json(clientCreated);
            }
            finally {
                session.close();
            }
        })
        .catch(err => epCatch(res, err));
}

const deleteClient = (req, res) => {
    Promise.resolve()
        .then(async () => {
            const id = req.params.id;
            if (!id)
                throw new Error("Invalid id");

            const session = getSession();

            try {
                const result = await session.run(
                    `MATCH(a: Client) WHERE a.id = $id DETACH DELETE a RETURN a`,
                    {
                        id
                    }
                )

                res.json({
                    deleted: result.records.length > 0
                });
            }
            finally {
                session.close();
            }

        })
        .catch(err => epCatch(res, err));
}


module.exports = {
    getClients,
    updateClient,
    insertClient,
    deleteClient
}