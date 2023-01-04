import chalk from 'chalk';
import fs from 'fs';
const caminho = process.argv

function imprimirErro(error) {
    throw new Error(chalk.red(error.code, `Não há documento no diretorio!.`))
}
function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }))
    return resultados.length !== 0 ? resultados : `Não há Link no arquivo!.`
}
async function pegarArquivo(caminho) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminho, encoding);
        return extrairLinks(texto)
    } catch (error) {
        imprimirErro(error)
    }
}
function help(argumento){
    const valida = argumento[2] === "validar"
    if (valida) {
        console.log(chalk.yellow(`welcome to the url validation Lib`))
        console.log(chalk.green(`commanding: npm run cli:vP  ( tests on folder files with validation.)`))
        console.log(chalk.green(`commanding: npm run cli:P   ( tests on folder files.)`))
        console.log(chalk.green(`commanding: npm run cli:vA  ( tests on just one file in the folder with validation.)`))
        console.log(chalk.green(`commanding: npm run cli:vA  ( tests on just one file in the folder.`))
        console.log(chalk.blue(`Developed by educational project`))
    }
    
}
help(caminho);
export default pegarArquivo;
