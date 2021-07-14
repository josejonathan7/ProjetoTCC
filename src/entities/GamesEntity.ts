import {Column, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_games")
class GamesEntity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    image: string;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { GamesEntity }
