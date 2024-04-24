import http from "../../http-common";
import type Note from "@/types/Note";


class Service {
    async getAll(): Promise<Note[]> {
        const response = await http.get("/")
        return response.data;
    }

    async add(data: Note): Promise<Note> {
        const response = await http.post("/add", data);
        return response.data;
    }

    async update(data: Note): Promise<Note> {
        const response = await http.post("/update", data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await http.post("/delete", {'id': id});
    }

}

export default new Service()
