const connection = require(`../database/connection`)
const crypto = require(`crypto`);


module.exports = {
    async index(_request, response) {
        const ongs = await connection(`ongs`).select(`*`);
        return response.json(ongs)
    },


    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString(`HEX`);

        try {
            await connection(`ongs`).insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
        } catch (error) {
            const err = String(error)
            const UNIQUE_CONSTRAINT = `ongs.`;
            const field = err.substr(err.lastIndexOf(UNIQUE_CONSTRAINT) + UNIQUE_CONSTRAINT.length)
            return response.status(400).json({ field })
        }


        return response.json({ id });
    }
}