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
            "Id": 100,
            "Name": "ITZY",
            "ShortName": " ",
            "KoreanName": "있지",
            "Debut": "2019-02-12",
            "Company": "JYP Entertainment",
            "CurrentMemberCount": 5,
            "OriginalMemberCount": 5,
            "Members": [],
            "FanbaseName": "MIDZY",
            "Active": "Yes"
        }
        const res = await request(app).post("/api/v1/groups").send(newGroup);

        expect(res.statusCode).toBe(201);
        expect(res.body.results).toHaveProperty("Id");
        expect(res.body.results.Name).toBe("ITZY");

        groupId = res.body.results.Id;
    })
})


describe("GET /api/v1/groups", () =>{
    describe("Should return the group", ()=>{
        test("Search for the group",async ()=>{
            const res = await request(app).get(`/api/v1/groups/${Number(groupId)}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("results");
            expect(res.body.results.Id).toBe(groupId);
        });
    })

});

describe("PUT /api/v1/groups", () =>{
    describe("Should update the group", ()=>{
        test("update group",async ()=>{
            const updateField = {
                Name: "dlkfjsdklfjsdlkfjs"
            }

            const res = await request(app).put(`/api/v1/groups/${Number(groupId)}`).send(updateField);
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