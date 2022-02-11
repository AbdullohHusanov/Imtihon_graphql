import model from "../../utils/postgres.js";

const MY_ORDERS = `
	SELECT
       o.*,
       u.username
	FROM orders o
    INNER JOIN users u ON o.user_id = u.user_id
	WHERE o.user_id = $1
    ;
`


function my_orders ({user_id}) {
    return model(MY_ORDERS, user_id)
}




export default {
	my_orders
}