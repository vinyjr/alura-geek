const productsList = async () => {
    try {
        const response = await fetch("https://66888a670ea28ca88b857450.mockapi.io/products/products");
        if (!response.ok) {
            throw new Error('Não foi possível obter a lista de produtos');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter a lista de produtos:', error.message);
        throw error;
    }
};

const createNewElement = async (name, value, image) => {
    try {
        const response = await fetch("https://66888a670ea28ca88b857450.mockapi.io/products/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                value,
                image,
            })
        });
        if (!response.ok) {
            throw new Error('Não foi possível criar um novo produto');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar um novo produto:', error.message);
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`https://66888a670ea28ca88b857450.mockapi.io/products/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error('Não foi possível excluir o produto');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao excluir o produto:', error.message);
        throw error;
    }
}

export const myProducts = {
    productsList,
    createNewElement,
    deleteProduct,
};
