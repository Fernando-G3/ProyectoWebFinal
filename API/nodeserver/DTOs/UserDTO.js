class UserDTO {
    constructor(idUser, email, name, lastname, typeUser) {
        this.idUser = idUser;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.typeUser = typeUser;
    }
}

module.exports = UserDTO;
