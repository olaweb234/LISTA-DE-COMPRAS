let listaprodutos=[]
let idjs=1

const btnadicionar=document.getElementById('adicionar')
const alertas=document.getElementById('alertas')
const btnbuscar=document.getElementById('buscar')
const btnordenar = document.getElementById('ordenar')


btnadicionar.addEventListener('click',function(){
const nomedoproduto=document.getElementById('nomedoproduto').value
const quantidadedoproduto=document.getElementById('quantidade').value 
   const resultado = cadastrarprodutos(nomedoproduto, quantidadedoproduto)
    if(!resultado){
     return
    }  
    renderizarLista()
    document.getElementById('nomedoproduto').value = ''
    document.getElementById('quantidade').value = ''

  
})

function cadastrarprodutos(nome,quantidade){
      const nomeLimpo = nome.trim()
    if(nomeLimpo==='' || quantidade===''){
        alertas.innerText='o nome  ou quantidade vazio '
        return false
    }
    const quantidadeconvertida=parseInt(quantidade)
    
    if(isNaN(quantidadeconvertida)){
        alertas.innerText='tem que ser número'
        return false
    }
    if(quantidadeconvertida<=0){
        alertas.innerText='quantida tem que ser maior do que 0'
        return false
    }
    const nomerepedido=listaprodutos.some(function(produto){
        return produto.nome.toLowerCase()=== nomeLimpo.toLowerCase()
    })
    if(nomerepedido){
        alertas.innerText='nome repetido'
        return false
    }


const objlista={
    nome: nomeLimpo,
    quantidade:quantidadeconvertida,
    id:idjs,
    comprado:false
}
    idjs++
    listaprodutos.push(objlista)    
    return true
}

function renderizarLista(array=listaprodutos) {
    const listhtml = document.getElementById('listahtml')
    listhtml.innerHTML = ''
    
    if (array.length === 0) {
        const li = document.createElement('li')
        li.innerText = 'Nenhum produto cadastrado'
        listhtml.appendChild(li)
        alertas.innerText = ''
        return
    }
    
    array.forEach(function(lista) {
        const li = document.createElement('li')
        li.innerText = `ID:${lista.id} | Nome:${lista.nome} | Quantidade:${lista.quantidade} | Comprado:${lista.comprado ? 'sim': 'não'}`
       if(lista.comprado){
        
        const btndesmarcar=document.createElement('button')
        btndesmarcar.innerText='Desmarcar'
        btndesmarcar.classList.add('btn-desmarcar')
        li.appendChild(btndesmarcar)
        btndesmarcar.setAttribute('data-id',lista.id)
        btndesmarcar.addEventListener('click',function(){
            const idencontrado= parseInt(this.getAttribute('data-id'))
            desmarcarcomprado(idencontrado)
            renderizarLista()
        })
       } else{
            const btncomprar=document.createElement('button')
            btncomprar.innerText='Comprar'
            btncomprar.classList.add('btn-comprado')
            li.appendChild(btncomprar)
            btncomprar.setAttribute('data-id',lista.id)
            btncomprar.addEventListener('click',function(){
            const idencontrado= parseInt(this.getAttribute('data-id'))
                marcarcomprado(idencontrado)
                renderizarLista()
        })
    }
        const btnexcluir=document.createElement('button')
        btnexcluir.innerText='Excluir'
        btnexcluir.classList.add('btn-excluir')
        li.appendChild(btnexcluir)
        btnexcluir.setAttribute('data-id', lista.id);
        btnexcluir.addEventListener('click',function(){
        const idencontrado=parseInt(this.getAttribute('data-id'))
        excluirproduto(idencontrado)
            
           
        })


        listhtml.appendChild(li)
    })
    atualizarcontadores()
    alertas.innerText = ''
    }

    function editarquantidade(id,novaquantidade){
        if(novaquantidade<=0){
            alertas.innerText='sem item pra editar'
            return
        }
        const produto=listaprodutos.find(function(a){
            return a.id===id
        })
        if(!produto){
            alertas.innerText='id não encotrado'
            return false
        }
        produto.quantidade=novaquantidade
        return true

    }

    function marcarcomprado(id){
        const produtocomprado=listaprodutos.find(function(produto){
            return produto.id==id
            
        })
        if(!produtocomprado){
           alertas.innerText='item não encontrado '
            return false
        } 
        produtocomprado.comprado=true
            renderizarLista()
            return true
    }
function desmarcarcomprado(id){
     const produtocomprado=listaprodutos.find(function(produto){
            return produto.id==id
            
        })
        if(!produtocomprado){
           alertas.innerText='item não encontrado '
            return false
        } 
        produtocomprado.comprado=false
        renderizarLista()
        return true
}

function excluirproduto(id){
     const posicao=listaprodutos.findIndex(function(a){
                return a.id===id
            })
            if(posicao==-1){
                
          alertas.innerText='nenhum item encontrado'
          return false
            }
               listaprodutos.splice(posicao,1)
                renderizarLista()
                return true
 }


 



function buscarproduto(){
    const termo=document.getElementById('buscarproduto').value

    const resultado=listaprodutos.filter(function(produto){
        return produto.nome.toLowerCase().includes(termo.toLowerCase())
    })
    renderizarLista(resultado)
    return resultado
 }


 btnbuscar.addEventListener('click',function(){
    buscarproduto()
 })



 function ordernarprodutos(){
    const listaordenada=[...listaprodutos]
    const listaordenada2=listaordenada.sort((a,b)=>a.nome.localeCompare(b.nome))
    renderizarLista(listaordenada2)
    return
 }

btnordenar.addEventListener('click',function(){
    ordernarprodutos()
})

function atualizarcontadores(){
    const totaldeprodutos=document.getElementById('totaldeprodutos')
    totaldeprodutos.innerHTML=listaprodutos.length

    const quantidadecomprada=document.getElementById('quantidadecomprados')
    const comprados=listaprodutos.filter(function(produto){
        return produto.comprado===true
    })
    quantidadecomprada.innerHTML=comprados.length

    const pendenteshtml=document.getElementById('quantidadependentes')
    const pendentesjs=listaprodutos.filter(function(produto){
        return produto.comprado===false
    })
    pendenteshtml.innerHTML=pendentesjs.length
}