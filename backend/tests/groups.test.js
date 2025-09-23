import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

beforeAll(async () =>{
    await mongoose.connect(process.env.MONGO_URI);
},6000);

afterAll(async () =>{
    await mongoose.connection.close();
});

let groupId;

describe("CREATE Criando grupo", ()=>{
    test("deve retornar 201", async ()=>{
        const newGroup = {
            "Id": 60,
            "Name": "ILLIT",
            "ShortName": " ",
            "KoreanName": "아일릿",
            "Debut": "2024-03-25",
            "Company": "BELIFT Lab",
            "CurrentMemberCount": 5,
            "OriginalMemberCount": 6,
            "FanbaseName": "GLLIT",
            "Active": "Yes"
        }
        const res = await request(app).post("/api/v1/groups").send(newGroup);

        expect(res.statusCode).toBe(201);
        expect(res.body.results).toHaveProperty("Id");
        expect(res.body.results.Name).toBe("ILLIT");

        groupId = res.body.results.Id;
    })
})


describe("GET /api/v1/groups", () =>{
    describe("Should return the group test", ()=>{
        test("Search for the group test",async ()=>{
            const res = await request(app).get(`/api/v1/groups/${Number(groupId)}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("results");
        });
    })

});

describe("PUT /api/v1/groups", () =>{
    describe("Should update the group", ()=>{
        test("update group",async ()=>{
            const updateFiel = {
                Name: "dlkfjsdklfjsdlkfjs"
            }

            const res = await request(app).put(`/api/v1/groups/${Number(groupId)}`).send(updateFiel);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Group updated");
        });
    })

})

describe("DELETE /api/v1/groups", () =>{
    describe("Should delete", ()=>{
        test("delete the test group",async ()=>{
            const res = await request(app).delete(`/api/v1/groups/${Number(groupId)}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Group deleted successfuly");
        });
    })

})

describe("GET /api/v1/groups", () =>{
    describe("Should not return the group test", ()=>{
        test("should return 404",async ()=>{
            const res = await request(app).get(`/api/v1/groups/${Number(groupId)}`);
            expect(res.statusCode).toBe(404);
        });
    })

})