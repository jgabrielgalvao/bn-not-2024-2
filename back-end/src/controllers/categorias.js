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
        
        // manda buscar os dados no servidor
        
        const result = await prisma.categoria.findMany( { orderBy: [ { descricao: 'asc' } ] } )
        
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
export default controller