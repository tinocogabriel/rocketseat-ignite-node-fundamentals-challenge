import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url);

export class Database{
    #database = {};

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    constructor(){
        fs.readFile(databasePath, 'utf-8').then(data=>{
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.#persist();
        })
    }
    select(table, search){
        let data = this.#database[table] ?? [];

        return data;
    }
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }
        else{
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }
    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex>-1){
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }         
    }
    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex>-1){
            let row = this.#database[table][rowIndex];
            
            row.title = data.title;
            row.description = data.description;
            row.updated_at = data.updated_at;

            this.#database[table][rowIndex] = row;
            this.#persist();
        }         
    }
    updateComplete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex>-1){
            let row = this.#database[table][rowIndex];
            row.completed_at = Date.now();
            this.#database[table][rowIndex] = row;
            this.#persist();
        }         
    }

}