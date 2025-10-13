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
            "Id": 100,
            "StageName": "Chaeryeong",
            "FullName": "Lee Chae-ryeong",
            "KoreanName": "이채령",
            "KoreanStageName": "채령",
            "DateOfBirth": "2001-06-05",
            "Group": {
                "name": "ITZY",
                "url": "http://localhost:8080/api/v1/groups/8"
            },
            "Country": "South Korea",
            "Birthplace": "Yongin, Gyeonggi, South Korea",
            "SecondGroup": " ",
            "Gender": "F"
        }
        const res = await request(app).post("/api/v1/idols").send(newIdol);

        expect(res.statusCode).toBe(201);
        expect(res.body.results).toHaveProperty("Id");
        expect(res.body.results.StageName).toBe("Chaeryeong");

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