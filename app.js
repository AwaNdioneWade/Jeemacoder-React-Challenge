class App extends React.Component{
    constructor(props){
        super(props) 
        this.state = {prenom: '', prenom: '', nom: '', email: '', tel: '', listeUser: [], isEditing: false, editingUserId: ''}
    }

    handleChange = (name) => (e) => {
        this.setState({[name]: e.target.value})
    }
    
    addUser = (e) => {
        e.preventDefault()
        if (this.state.prenom !== '' && this.state.nom !== '' && this.state.email !== '' && this.state.tel !== '') {
            let newUser;
            if (this.state.isEditing) {
                newUser = this.state.listeUser.map(user => 
                    user.id === this.state.editingUserId ? 
                        {
                            prenom: this.state.prenom, 
                            nom: this.state.nom, 
                            email: this.state.email, 
                            tel: this.state.tel
                        } 
                    : user
                );
            } else {
                newUser = {
                    id: Math.floor(Math.random() * 10000),
                    prenom: this.state.prenom,
                    nom: this.state.nom,
                    email: this.state.email,
                    tel: this.state.tel,
                    isEditing: false
                };
                newUser = [...this.state.listeUser, newUser];
            }
            this.setState({listeUser: newUser, prenom: '', nom: '', email: '', tel: '', isEditing: false});
        }else{
            alert("Entrez d'abord tous les champs")
        }
    }
    
    editUser = (userId) => {
        const user = this.state.listeUser.find(user => user.id === userId);
        this.setState({
            prenom: user.prenom,
            nom: user.nom,
            email: user.email,
            tel: user.tel,
            isEditing: true,
            editingUserId: userId
        });
    }

    deleteUser = (userId) => {
        const newListeUser = this.state.listeUser.filter(user => user.id !== userId)
        this.setState({listeUser: newListeUser})
    }

    render(){
        return(
            <div>
                <Form  addUser={this.addUser} listeUser={this.state.listeUser} prenom={this.state.prenom} nom={this.state.nom} email={this.state.email} tel={this.state.tel} isEditing={this.state.isEditing} handleChange={this.handleChange} />
                <Table listeUser={this.state.listeUser}  editUser={this.editUser}  deleteUser={this.deleteUser}/>
            </div>
        )
    }
}

class Form extends React.Component{
    render(){
        const buttonClass = this.props.isEditing ? 'btn btn-warning' : 'btn btn-success';
        return(
            <div>
                <h2 className='text-center mt-3'>Jeemacoder gestion utilisateurs</h2>
                <form onSubmit={this.props.addUser} className='container w-50 shadow p-4'>
                    <div className="row mt-3">
                        <Input label="Prenom" type="text" value={this.props.prenom} onChange={this.props.handleChange('prenom')} />
                        <Input label="Nom" type="text" value={this.props.nom} onChange={this.props.handleChange('nom')} />
                    </div>
                    <div className="row mt-3">
                        <Input label="Email" type="email" value={this.props.email} onChange={this.props.handleChange('email')} />
                        <Input label="Telephone" type="text" value={this.props.tel} onChange={this.props.handleChange('tel')} />
                    </div>
                    <button type="submit" className= {`w-100 mt-4 ${buttonClass}`}>{this.props.isEditing ? 'Modifier' : 'Ajouter'}</button>
                </form>
            </div>
        )
    }
}

class Input extends React.Component {
    render() {
      return (
        <div className="col-12 col-md-6">
          <label>{this.props.label}</label>
          <input type={this.props.type} value={this.props.value} onChange={this.props.onChange} className='form-control mt-3'/>
        </div>
      )
    }
}

class Table extends React.Component{
    render(){
        return(
            <div>
                <h3 className='text-center my-4'>Utilisateurs</h3>
                <table className='table table-striped' style={{width: '80%', margin: 'auto'}}>
                    <thead>
                        <tr className='text-center'>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Tbody listeUser={this.props.listeUser} editUser={this.props.editUser} deleteUser={this.props.deleteUser}/>
                    </tbody>
                </table>                     
            </div>
        )
    }
}

class Tbody extends React.Component{
    render(){
        return(
            this.props.listeUser.map((user) => (
                <tr className='text-center'>
                    <td>{user.prenom}</td>
                    <td>{user.nom}</td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>
                        <button className='btn btn-warning me-2' onClick={() => this.props.editUser(user.id)}>Modifier</button>
                        <button className='btn btn-danger ms-2 mt-2 mt-md-0' onClick={() => this.props.deleteUser(user.id)}>Supprimer</button>
                    </td>
                </tr>
            )) 
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))