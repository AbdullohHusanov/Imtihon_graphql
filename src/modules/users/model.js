import model from "../../utils/postgres.js";

const USERS = `
	SELECT
		user_id,
		username,
		user_email,
		user_contact,
        user_role
	FROM users
	WHERE
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($2) > 0 THEN (
			username ILIKE CONCAT('%', $2, '%') 
		) ELSE TRUE
	END
	ORDER BY user_id
	offset $3 limit $4
`

const LOGIN = `
	SELECT 
		user_id,
		username,
		user_email,
		user_contact
	FROM users
	WHERE username = $1 AND user_password = crypt($2, user_password)
	;
` 

const REGISTER = `
	INSERT INTO users (username, user_password, user_contact, user_email) VALUES
	($1, crypt($2, gen_salt('bf')), $3, $4)
	RETURNING user_id, username, user_contact, user_email
	;
`

const CHANGE_USER = `
	UPDATE users u SET
		username = (
			CASE WHEN LENGTH($2) > 0 THEN $2 ELSE u.username END
		),
		full_name = (
			CASE WHEN LENGTH($3) > 0 THEN $3 ELSE u.full_name END
		),
		email = (
			CASE WHEN LENGTH($4) > 0 THEN $4 ELSE u.email END
		),
		active = (
			CASE WHEN $5 IN (TRUE, FALSE) THEN $5 ELSE u.active END
		),
		bio = (
			CASE WHEN LENGTH($6) > 0 THEN $6 ELSE u.bio END
		),
		password = (
			CASE WHEN LENGTH($7) > 0 THEN crypt($7, gen_salt('bf')) ELSE u.password END
		)
	WHERE user_id = $1
	RETURNING *
`

function users ({ pagination: { page, limit }, search, userId }) {
	return model(USERS, userId, search, (page - 1) * limit, limit)
}

function login ({username, password}) {
	return model(LOGIN, username, password)
}

function register ({username, password, contact, email}) {
	return model(REGISTER, username, password, contact, email)
}

function changeUser ({ userId, username, email, active, fullName, bio, password } ) {
	return model(CHANGE_USER, userId, username, fullName, email, active, bio, password)
}


export default {
	changeUser,
	users,
	login,
	register
}