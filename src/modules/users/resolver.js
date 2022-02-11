import model from "./model.js";
import jwt from "../../utils/jwt.js";

export default {
	Query: {
		users: async (_, args) => {
			return await model.users(args)
		}	
	},

	Mutation: {
		register: async (_, args) => {
			try {
				const newUser = await model.register(args)
				
				return {
					status: 200,
					message: "OK",
					token: jwt.sign(args.username),
					data: newUser
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					user: null
				}
			}
				
		},
		login: async (_, args) => {
			const user = await model.login(args)
			return {
				status: 200,
				message: "OK",
				data: user,
				token: jwt.sign(user[0].username)
			}
		}
	},

	User: {
		userId: parent => parent.user_id,
		email: parent => parent.user_email,
		contact: parent => parent.user_contact,
	}
}