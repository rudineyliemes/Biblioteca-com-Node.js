import fs from "fs";
import chalk from "chalk";

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(capturas => ({[capturas[1]]: capturas
        [2]}))
    return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}

function tratarErro(erro) {
    //Siginifica que está lançando uma nova extancia "new" do objeto Error() do JS exixte para lidar com Exceções.
    throw new Error(chalk.red(erro.code, "Não há aquivo no diretório"));
}

//async/await

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = "utf-8";
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        tratarErro(erro);
    }
}
export default pegaArquivo;

