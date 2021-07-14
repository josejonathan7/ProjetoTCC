import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from 'class-transformer'

@Entity("tb_users")
class UsersEntity {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    email_contact_link: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { UsersEntity }