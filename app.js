class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {prenom: '', nom: '', email: '', tel: '', listeUser: []}
    }

    handleChangePrenom = (e) => {
        this.setState({prenom: e.target.value})
    }
    handleChangeNom = (e) => {
        this.setState({nom: e.target.value})
    }
    handleChangeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    handleChangeTel = (e) => {
        this.setState({tel: e.target.value})
    }

    addUser = (e) => {
        e.preventDefault()
        if (this.state.prenom !== '' && this.state.nom !== '' && this.state.email !== '' && this.state.tel !== '') {
            const newUser = {
                id: Math.floor(Math.random() * 10000),
                prenom: this.state.prenom,
                nom: this.state.nom,
                email: this.state.email,
                tel: this.state.tel,
                isEditing: false
            }
            this.setState(prev => ({listeUser:[...prev.listeUser, newUser]}))
            this.setState({prenom: ''})   
            this.setState({nom: ''})   
            this.setState({email: ''})   
            this.setState({tel: ''})   
            console.log(this.state.listeUser);         
        }else{
            alert("Entrez d`abord tout les champs")
        }
    }

    deleteUser = (userId) => {
        const newListeUser = this.state.listeUser.filter(user => user.id !== userId)
        this.setState({listeUser: newListeUser})
    }
        render(){
        return(
            <div>
                <Form  addUser={this.addUser} listeUser={this.state.listeUser} prenom={this.state.prenom} nom={this.state.nom} email={this.state.email} tel={this.state.tel} handleChangePrenom={this.handleChangePrenom}  handleChangeNom={this.handleChangeNom} handleChangeEmail={this.handleChangeEmail} handleChangeTel={this.handleChangeTel} />
                <Table listeUser={this.state.listeUser}  deleteUser={this.deleteUser}/>
            </div>
        )
    }
}

class Form extends React.Component{
    render(){
        return(
            <div>
                <h2 className='text-center mt-3'>Jeemacoder gestion utilisateurs</h2>
                <form onSubmit={this.props.addUser} className='container w-50'>
                    <div className="row mt-3">
                        <div className="col-12 col-md-6">
                            <label>Prenom</label>
                            <input type="text" value={this.props.prenom} onChange={this.props.handleChangePrenom} className='form-control mt-3'/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Nom</label>
                            <input type="text" value={this.props.nom} onChange={this.props.handleChangeNom} className='form-control mt-3'/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-md-6">
                            <label>Email</label>
                            <input type="email" value={this.props.email} onChange={this.props.handleChangeEmail} className='form-control mt-3'/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Telephone</label>
                            <input type="text" value={this.props.tel} onChange={this.props.handleChangeTel} className='form-control mt-3'/>
                        </div>
                    </div>
                    <button type="submit" className="w-100 btn btn-success mt-4">Ajouter</button>
                </form>
            </div>
        )
    }
}

class Table extends React.Component{
    render(){
        return(
            <div className='table' style={{width: '80%', margin: 'auto'}}>
                <h3 className='text-center my-4'>Utilisateurs</h3>
                <div className='thead'>
                    <div className='tr' style={{display: 'flex', justifyContent: 'space-around'}}>
                        <div className='th'>Prenom</div>
                        <div className='th'>Nom</div>
                        <div className='th'>Email</div>
                        <div className='th'>Telephone</div>
                        <div className='th'>Action</div>
                    </div>
                </div>
                
                <div className='tbody' style={{display: 'flex', flexDirection: 'column'}}>
                    <Tbody listeUser={this.props.listeUser} deleteUser={this.props.deleteUser}/>
                </div>
            </div>            
        )
    }
}

class Tbody extends React.Component{
    render(){
        return(
            this.props.listeUser.map((user) => (
                <div className='tr ms-5' style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className='td'>{user.prenom}</div>
                    <div className='td'>{user.nom}</div>
                    <div className='td'>{user.email}</div>
                    <div className='td'>{user.tel}</div>
                    <div className='td'>
                        <button className='btn btn-warning'>Modifier</button>
                        <button className='btn btn-danger' onClick={() => this.props.deleteUser(user.id)}>Supprimer</button>
                    </div>
                </div>
            )) 
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))