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

let idolId;

describe("CREATE Criando idol", ()=>{
    test("deve retornar 201", async ()=>{
        const newIdol = {
            "Id": 150,
            "StageName": "Hyein",
            "FullName": "Lee Hye-in",
            "KoreanName": "이혜인",
            "KoreanStageName": "혜인",
            "DateOfBirth": "2008-04-21",
            "Group": "NewJeans",
            "Country": "South Korea",
            "Birthplace": "Incheon, South Korea",
            "SecondGroup": "U.SSO Girl",
            "Gender": "F"
        }
        const res = await request(app).post("/api/v1/idols").send(newIdol);

        expect(res.statusCode).toBe(201);
        expect(res.body.results).toHaveProperty("Id");
        expect(res.body.results.StageName).toBe("Hyein");

        idolId = res.body.results.Id;
    })
})


describe("GET /api/v1/idols", () =>{
    describe("Should return the idol test", ()=>{
        test("Search for the idol test",async ()=>{
            const res = await request(app).get(`/api/v1/idols/${Number(idolId)}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("results");
        });
    })

});

describe("PUT /api/v1/idols", () =>{
    describe("Should update the idol", ()=>{
        test("update idol",async ()=>{
            const updateFiel = {
                StageName: "dlkfjsdklfjsdlkfjs"
            }

            const res = await request(app).put(`/api/v1/idols/${Number(idolId)}`).send(updateFiel);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Idol updated");
        });
    })

})

describe("DELETE /api/v1/idols", () =>{
    describe("Should delete", ()=>{
        test("delete the test idol",async ()=>{
            const res = await request(app).delete(`/api/v1/idols/${Number(idolId)}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Idol deleted successfuly");
        });
    })

})

describe("GET /api/v1/idols", () =>{
    describe("Should not return the idol test", ()=>{
        test("should return 404",async ()=>{
            const res = await request(app).get(`/api/v1/idols/${Number(idolId)}`);
            expect(res.statusCode).toBe(404);
        });
    })

})