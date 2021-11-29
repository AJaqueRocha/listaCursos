class Curso {
  
  constructor() {
    this.id = 1;
    this.nomeCurso = "";
    this.descr= "";
    this.prof= "";
    this.arrayCursos = [];
    this.editId = null;
  }

  salvar(){
    let curso = this.lerDados();

    if(this.validaCampos(curso)){
      if(this.editId == null){
        this.adicionar(curso);
      }
      else{
        this.atualizar(this.editId, curso);
      }
   }

   this.listaTabela();
  }

  listaTabela(){
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for(let i =0; i < this.arrayCursos.length; i++){
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_curso = tr.insertCell();
      let td_descricao = tr.insertCell();
      let td_professor = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayCursos[i].id;
      td_curso.innerText = this.arrayCursos[i].nomeCurso;
      td_descricao.innerText = this.arrayCursos[i].descricao;
      td_professor.innerText = this.arrayCursos[i].professor;

      let imgEdit = document.createElement('img');
      imgEdit.src = 'img/Edit.png';
      imgEdit.setAttribute("onclick","curso.preparaEdicao("+ JSON.stringify(this.arrayCursos[i]) +")");

      let imgDelete = document.createElement('img');
      imgDelete.src = 'img/Delete.png';
      imgDelete.setAttribute("onclick","curso.deletar("+ this.arrayCursos[i].id +")");

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }
  
  adicionar(curso){
    this.arrayCursos.push(curso);
    this.id++;
  }

  atualizar(id, curso){
    for(let i =0; i < this.arrayCursos.length; i++){
      if(this.arrayCursos[i].id == id){
        this.arrayCursos[i].nomeCurso = curso.nomeCurso;
        this.arrayCursos[i].descricao = curso.descricao;
        this.arrayCursos[i].professor = curso.professor;
      }
  }
  }

  preparaEdicao(dados){
    this.editId = dados.id;

    document.getElementById('curso').value = dados.nomeCurso;
    document.getElementById('descri').value = dados.descricao;
    document.getElementById('prof').value = dados.professor;

    document.getElementById('btn1').innerText = 'Atualizar';
   
  }

  lerDados(){
    let curso = {}
    curso.id = this.id;
    curso.nomeCurso = document.getElementById('curso').value;
    curso.descricao = document.getElementById('descri').value;
    curso.professor = document.getElementById('prof').value;
    return curso;
  }

  validaCampos(curso){
    let msg = '';
    if (curso.nomeCurso == ""){
      msg += 'Informe o nome do curso.\n';
    }

    if (curso.descricao == ""){
      msg +='Informe a descrição do curso.\n';
    }

    if (curso.professor == ""){
      msg +='Informe o nome do professor do curso.\n';
    }

    if (msg != ""){
      alert(msg);
      return false;
    }

    return true;

  }

  deletar(id){

    let tbody = document.getElementById('tbody');
    if(confirm("Tem certeza que deseja deletar este curso?") + id){
      
    for(let i = 0; i < this.arrayCursos.length; i++){
    if (this.arrayCursos[i].id == id){
      this.arrayCursos.splice(i, 1);
      tbody.deleteRow(i);
    }
    }
    }
  
    }
}  

var curso = new Curso();