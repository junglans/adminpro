// =====================================
// User  model.
// =====================================
export class User {

    constructor(public name: string,
                public email: string,
                public password: string,
                public img?: string,
                public role: string = 'USER_ROLE',
                public google: boolean = false,
                public _id?: string
    ) {}

}
