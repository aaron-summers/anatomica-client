const endpoint = 'http://localhost:3000/api'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const validateUrl = `${endpoint}/validate`
const categoriesURL = `${endpoint}/categories`
const quizzesURL = `${endpoint}/quizzes`

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        throw res.json()
}

const handleServerError = response => {
    throw response
}

const saveToken = data => {
    localStorage.setItem('token', data.token)
    return data.user
}

const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.token,
        ...moreHeaders
    }
)

const signUp = (user) => fetch(signupUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)
    .then(saveToken)
    .catch(handleServerError)

const logIn = (user) => fetch(loginUrl, {
    method: 'POST',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ user })
}).then(jsonify)
    .then(saveToken)
    .catch(handleServerError)

const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve()

    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify)
        .then(saveToken)
        .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token');

const getCategories = () => {
    return fetch(categoriesURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(jsonify)
        .catch(handleServerError)
}

const createQuiz = (category_id) => {
    return fetch(quizzesURL, {
        method: 'POST',
        headers: constructHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ "category_id": category_id })
    }).then(jsonify)
    .catch(handleServerError)
}

export default {
    signUp,
    logIn,
    validateUser,
    clearToken,
    getCategories,
    createQuiz
}
