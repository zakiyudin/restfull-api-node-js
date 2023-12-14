import supertest from 'supertest'
import { web } from '../src/app/web.js'
import { logger } from '../src/app/logging.js'
import bcrypt from 'bcrypt'
import { createTestUser, getUserTest, removeTestUser } from './test.utils.js'

describe('POST /api/users', () => {

    afterEach(async () => {
        await removeTestUser()
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
        
        console.log(user.body.errors)
        expect(user.status).toBe(400)
        expect(user.body.errors).toBeDefined()
    })

    it('should reject if username already registered', async () => {
        let user = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                name: 'test',
                password: 'rahasia'
            })
        
        console.log(user.body)

        expect(user.status).toBe(200)
        expect(user.body.data.username).toBe('test')
        expect(user.body.data.name).toBe('test')
        expect(user.body.data.password).toBeUndefined()


        user = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                name: 'test',
                password: 'rahasia'
            })
        
        console.log(user.body)

        expect(user.status).toBe(400)
        expect(user.body.errors).toBeDefined()
    })
})


describe('POST /api/users/login', () => {
  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it('should can user login', async () => {
    const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: 'test',
            password: 'rahasia'
        })

        console.log(result.body.data)

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe('test')
  })

  it('should can rejected if username wrong', async () => {
    const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: 'wrong',
            password: 'wrong'
        })

        console.log(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
  })

  it('should can rejected if password wrong', async () => {
    const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: 'test',
            password: 'wrong'
        })

        console.log(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
  })
})

describe('GET /api/users/current', () => {

    beforeEach(async () => {
        await createTestUser()
      })
    
      afterEach(async () => {
        await removeTestUser()
      })

    it('should can get user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')
        
        console.log(result.body.data)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
    })

    it('should reject if token wrong', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'wrong')
        
        console.log(result.body)
        
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser()
      })
    
      afterEach(async () => {
        await removeTestUser()
      })
    it('should can update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'zaki',
                password: 'zakii'
            })
        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('zaki')

        const user = await getUserTest()
        expect(await bcrypt.compare('zakii', user.password)).toBe(true)
    })

    it('should can update only name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'zaki'
            })
        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('zaki')
        
    })

    it('should can update only password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'zaki'
            })
        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        
    })

    it('should can rejected if token wrong', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'wrong')
            .send({})
        console.log(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })
})

describe('DElETE /api/user/logout', () => {
    beforeEach(async () => {
        await createTestUser()
      })
    
      afterEach(async () => {
        await removeTestUser()
      })

  it('should can logout', async () => {
    const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test')

    expect(result.status).toBe(200)
    expect(result.body.data).toBe("OK")

    const user = await getUserTest()
    expect(user.token).toBeNull()
  })

  it('should reject invalid token', async () => {
    const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'error')

    expect(result.status).toBe(401)

  })
})





