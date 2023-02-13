const user = require("../models/user")

module.exports = class clientService{
      async getAllclients(){
        try {
            const allclients = await user.find();
            return allclients;
        } catch (error) {
            console.log(`Could not fetch clients ${error}`)
        }
    } 
}

