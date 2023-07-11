import supertest from 'supertest'
import { web } from '../src/app/web.js'
import { prismaClient } from '../src/app/databasel.js'
import { logger } from '../src/app/logging.js'
import bcrypt from 'bcrypt'

describe('POST /api/users', () => {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    })
  
    it('should can register', async () => {
        const user = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                name: 'test',
                password: 'rahasia'
            })
        
        expect(user.status).toBe(200)
        expect(user.body.data.username).toBe('test')
        expect(user.body.data.name).toBe('test')
        expect(user.body.data.password).toBeUndefined()
    })

    it('should cannot register, if form are null', async () => {
        const user = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                name: '',
                password: ''
            })
        
        logger.info(user.body)
        expect(user.status).toBe(400)
        expect(user.body.errors).toBeUndefined()
    })
})


describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await prismaClient.user.create({
            data: {
                username: 'test',
                password: await bcrypt.hash('rahasia', 10),
                name: 'test',
                token: 'test'
            }
        })
    })

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    })

    it('should can user login', async () => {
        const user = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'rahasia'
            })

        console.log(user.body)
        expect(user.status).toBe(200)
        expect(user.body.data.token).toBeDefined()
        expect(user.body.data.token).not.toBe('test')
    })
})

