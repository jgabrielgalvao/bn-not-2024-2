import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import categoriasRouter from './routes/categorias.js'
import clientesRouter from './routes/clientes.js'
import fornecedoresRouter from './routes/fornecedores.js'
import produtosRouter from './routes/produtos.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())


// ROTAS
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/categorias', categoriasRouter) 
app.use('/clientes', clientesRouter)
app.use('/fornecedores', fornecedoresRouter)
app.use('/produtos', produtosRouter)

export default app
