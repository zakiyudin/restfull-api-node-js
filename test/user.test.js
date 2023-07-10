import supertest from 'supertest'
import { web } from '../src/app/web.js'
import { prismaClient } from '../src/app/databasel.js'

describe('POST /api/users', () => {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: 'zakikamil'
            }
        })
    })
  
    it('should can register', async () => {
        const user = await supertest(web)
            .post('/api/users')
            .send({
                username: 'zakikamil',
                name: 'Zaki Kamil',
                password: 'zakikamil'
            })
        
        expect(user.status).toBe(200)
        expect(user.body.data.username).toBe('zakikamil')
        expect(user.body.data.name).toBe('Zaki Kamil')
        expect(user.body.data.password).toBeUndefined()
    })
})
