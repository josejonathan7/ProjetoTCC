import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_observation")
class ObservationEntity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    information: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    constructor(){
        if(!this.id){
            this.id= uuid()
        }
    }

}

export { ObservationEntity }