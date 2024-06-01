# inventory_management

### server-express

It's a node express based backend project. I'd planned to apply code in IoC pattern using 'inversify' package in another branch. But, as I have no enough time to fully focus on the assignment, it's just a pending task. I've also plan for Test Driven Development (TDD),but it might not be covered for all testcases because it was also in-progress.

***For the Admin and Support roles, I haven't started the Frontend dashboard project.
So, you can check APIs with Postman for those roles***

#### How to Run 
I've set up DB sharding, seeding in containerization. To run back-end app in docker and Makefile:

```
cd mern_stack_inventory_system
make up
make init 
make seed
```
Please wait for a while after each command to ensure all the instructions are served properly.

If you want to run in development , you can achieve easily:

```
cd server-express
yarn (or) npm install
yarn dev (or) npm run dev
```


### ecommerce_next(Next+TypeScript+Tailwindcss)

It's is a frontend project for customer side. 
sample .env
```
NEXT_PUBLIC_REST_API_ENDPOINT = http://localhost:8081/api/v1
NEXT_PUBLIC_GUEST_KEY=commercew@ebSt@gIng
NEXT_PUBLIC_GUEST_SECRET=commercew@bsit@$t@aIng
```

Run: yarn dev or npm run dev

## admin_nuxt(Nuxt+TypeScript+Tailwindcss)

This will be an admin dashboard for admin and supports. But, I didn't really start yet.




