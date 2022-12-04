import chalk from "chalk";

function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise
        .all(
            listaURLs.map(async (url) => {
                try {
                    const response = await fetch(url)
                    return response.status;

                } catch (erro) {
                    manejaErros(erro);
                }
            })
        )
    return arrStatus;
}

function manejaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link não encontrado';
    }else {
        return 'ocorreu algum erro';
    }
}

export default async function listaValidade(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}


// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }


// [Teste de retorno 400](https://httpstat.us/404).
// [gatinho salsicha](http://gatinhosalsicha.com.br/)