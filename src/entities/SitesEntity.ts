import {Column, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_sites")
class SitesEntity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    category: string

    constructor(){
        if(!this.id){
            this.id= uuid()
        }
    }
}

export { SitesEntity }