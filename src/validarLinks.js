
function extrairLinks(listas) {
    return listas.map((obj) => Object.values(obj).join())
}

async function checkLinks(arrayLinks) {
    return await Promise.all(
        arrayLinks.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                if(error.cause.code === 'ENOTFOUND'){
                   return `Link não encontrado!` 
                }else {
                    return `Não foi possivel identificar o erro!.`
                }
            }
        })

    )
}

export default async function validarLista(listas) {
    const data = new Date().toTimeString();
    const arrayLinks = extrairLinks(listas)
    const status = await checkLinks(arrayLinks)
    return listas.map((obj, indice) => ({
        ...obj,
        status: status[indice],
        Data: data
    }))
}