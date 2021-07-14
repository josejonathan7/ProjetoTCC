import {Column, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_songs")
class SongsEntity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    link: string;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { SongsEntity }