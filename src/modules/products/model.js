import model from "../../utils/postgres.js";

const PRODUCTS = `
	SELECT
        p.product_id,
        c.category_name,
		p.product_name,
		p.price,
		p.product_img,
        p.short_desc,
        p.long_desc
	FROM products p
    INNER JOIN categories c ON c.category_id = p.product_category
	WHERE
	CASE
		WHEN LENGTH($1) > 0 THEN (
			p.product_name ILIKE CONCAT('%', $1, '%') 
		) ELSE TRUE
	END
	ORDER BY p.product_id
	offset $2 limit $3
    ;
`

const CATEGORIES = `
	SELECT 
		c.category_id,
		c.category_name,
        json_agg(p.product_name)
	FROM categories c
    INNER JOIN products p ON p.product_category = c.category_id
    GROUP BY c.category_id, c.category_name   
    ORDER BY c.category_id   
    ;
` 

const CHANGE_PRODUCT = `
	UPDATE products p SET
		product_name = (
			CASE WHEN LENGTH($2) > 0 THEN $2 ELSE p.product_name END
		),
		product_category = (
			CASE WHEN $3 > 0 THEN $3 ELSE p.product_category END
		),
		price = (
			CASE WHEN $4 > 0 THEN $4 ELSE p.price END
		),
		product_img = (
			CASE WHEN LENGTH($5) > 0 THEN $5 ELSE p.product_img END
		),
		short_desc = (
			CASE WHEN LENGTH($6) > 0 THEN $6 ELSE p.short_desc END
		),
		long_desc = (
			CASE WHEN LENGTH($7) > 0 THEN $7 ELSE p.long_desc END
		)
	WHERE p.product_id = $1
	RETURNING *
`
const DELETE_PRODUCT = `
	DELETE FROM products
	WHERE product_id = $1
`

function product ({ pagination: { page, limit }, search}) {
    return model(PRODUCTS, search, (page - 1) * limit, limit)
}

function change_product (product_id, product_name, product_category, product_img, price, short_desc, long_desc) {
    return model(CHANGE_PRODUCT, product_id, product_name,product_category ,price , product_img, short_desc, long_desc)
}

function delete_product ({product_id}) {
	return model(DELETE_PRODUCT, product_id)
}

function categories () {
	return model(CATEGORIES)
}



export default {
	categories,
	product,
	change_product,
	delete_product
}