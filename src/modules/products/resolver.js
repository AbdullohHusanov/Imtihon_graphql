import model from "./model.js";

export default {
	Query: {
		categories: async (_, args) => {
			return await model.categories(args)
		},
		product: async (_, args) => {
			return await model.product(args)
		}
	},



	Category: {
		id: parent => parent.category_id,
		name: parent => parent.category_name
	},

    Product: {
        category: parent => parent.category_name
    }
}