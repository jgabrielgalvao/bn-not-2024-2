import prisma from "../database/client.js";

const controller = {} //Objeto vazio

controller.create = async function(req,res) {
    try{
        
        // conecta-se ao BD e envia uma instrução
        // de criação de um novo documento, com dados
        // que estão dentro do req.body
        
        await prisma.categoria.create( { data:req.body } )
        
        // envia uma resposta de sucesso ao front-end 
        // HTTP 201: Created
        
        res.status(201).end()
    }
    catch(error){
        
        // Deu errado: exibe o erro no console do back end
        console.error(error);
        
        // envia o erro ao front com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function(req,res) {
    try{
        
        //por padrão, não inclui nenhuma entidade relacionada
        const include = {}

        //verifica na query da requisição se foi passado o parametro include
        if(req.query.include){

            //se tiver mais de uma relação, as separa por virgula
            const relations = req.query.include.split(',')

            //le cada relação
            for(let rel of relations){
                include[rel] = true
            }
        }

        // manda buscar os dados no servidor
        
        const result = await prisma.categoria.findMany( { 
            orderBy: [ { descricao: 'asc' } ] } )
        
        // envia uma resposta de sucesso ao front-end 
        // HTTP 201: Created
        
        res.send(result)
    }
    catch(error){
        
        // Deu errado: exibe o erro no console do back end
        console.error(error);
        
        // envia o erro ao front com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function(req, res){
    try {
        
        // manda buscar o documento no servidor
        // usando como critério de busca um id informado no parametro da req
        
        const result = await prisma.categoria.findUnique({
            where: { id: req.params.id }
        })
        
        // documento encontrado ~> HTTP 200: OK (implicito)
        if(result) res.send(result)
        // documento não encontrado ~> HTTP 400: NOT FOUND
        else res.status(404).end()
        
    } catch (error) {
        
        // Deu errado: exibe o erro no console do back end
        console.error(error);
        
        // envia o erro ao front com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async function(req, res){
    try {
        
        // busca o documento pelo id passado como parametro
        // atualiza caso encontre com as informações passadas no req.body
        
        const result = await prisma.categoria.update({
            where: {id: req.params.id},
            data: req.body
        })
        
        // documento encontrado e atualizado ~> HTTP 200: OK (implicito)
        if(result) res.send(result)
        // documento não encontrado e não atualizado ~> HTTP 400: NOT FOUND
        else res.status(404).end()
        
    } catch (error) {
        // Deu errado: exibe o erro no console do back end
        console.error(error);
        
        // envia o erro ao front com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async function(req, res) {
    try {
      // Busca o documento a ser excluído pelo id passado
      // como parâmetro e efetua a exclusão caso encontrado
      await prisma.categoria.delete({
        where: { id: req.params.id }
      })
  
      // Encontrou e excluiu ~> HTTP 204: No Content
      res.status(204).end()
  
    }
    catch(error) {
      if(error?.code === 'P2025') {   // Código erro de exclusão no Prisma
        // Não encontrou e não excluiu ~> HTTP 404: Not Found
        res.status(404).end()
      }
      else {
        // Outros tipos de erro
        console.error(error)
  
        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
      }
    }
  }
export default controller