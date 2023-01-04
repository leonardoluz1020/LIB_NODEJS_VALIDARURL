import chalk from "chalk";
import pegarArquivo from "./index.js";
import fs from 'fs';
import validarLista from "./validarLinks.js";
const caminho = process.argv;

async function imprimirLista(valida, listas, nomeArquivo = '') {
    if (valida) {
        console.log(
            chalk.yellow(`Lista de links`),
            chalk.bgBlue(nomeArquivo),
          await validarLista(listas)
        )
    } else {
        console.log(
            chalk.yellow(`Lista de links`),
            chalk.bgBlue(nomeArquivo),
            listas
        )
    }
}


async function processarTexto(argumento) {
    const caminho = argumento[2];
    const valida = argumento[3] === `--valida`;

    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red(`Caminho de pasta ou arquvivo incorreto!.`));
        }
        return
    }


    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho);
        imprimirLista(valida, lista)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            imprimirLista(valida, listas, nomeArquivo)
        })
    }



}


processarTexto(caminho);