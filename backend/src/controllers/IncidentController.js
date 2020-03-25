const connection = require(`../database/connection`)


module.exports = {
    async index(request,response) {
        const {page = 1,size = 5} = request.query;
        const [count] = await connection(`incidents`)
            .count();

        const total =  count[`count(*)`] || 0;
        const pages = Math.ceil(total/size);

        const incidents = await connection(`incidents`)
        .join(`ongs`, `ongs.id`,`=`,`incidents.ong_id`)
        .limit(size)
        .offset((page-1)* size)
        .select([
            `incidents.*`,
            `ongs.name`,
            `ongs.email`,
            `ongs.whatsapp`,
            `ongs.city`,
            `ongs.uf`
        ]);

        response.header(`X-Total-Count`,total);
        response.header(`X-Total-Pages`,pages);

        return response.json(incidents)
    },


    async create(request,response){
        const {title,description,value} = request.body;
        const ong_id = request.headers.authorization;

       const [id] = await connection(`incidents`).insert({
            title,
            description,
            value,
            ong_id
        })
        return response.json({id})
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection(`incidents`)
            .where(`id`,id)
            .select(`ong_id`)
            .first();
        console.log(incident,id,ong_id)
        if(incident.ong_id !== ong_id){
            return response.status(401).json({
                error: `Operation not permitted`
            });
        }

        await connection(`incidents`).where(`id`,id).delete();

        return response.status(204).send();
    }
    
}