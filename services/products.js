const getProducts = () => {
    return new Promise((accepted, rejected) => {
        fetch('https://fakestoreapi.com/products')
        .then(res=> {
            return res.json()
        })
        .then(data => {
            return accepted(data)
        })
        .catch(error =>{
            console.error(error)
            rejected(error)
        })
    })
};

const getById = (id) => {
    return new Promise((accepted, rejected) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=> {
            return res.json()
        })
        .then(data => {
            return accepted(data)
        })
        .catch(error =>{
            console.error(error)
            rejected(error)
        })
    })
};

export default { getProducts, getById }