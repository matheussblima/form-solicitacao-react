import React from 'react';
import axios from 'axios';
import { 
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,  
  Card,
  CardHeader,
  Container,
  Modal,
  ModalBody,
  ModalHeader, 
  Progress 
  } from 'reactstrap';
import styles from './FormCadastroSolicitacao.module.css';

export default class FormCadastroSolicitacao extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      qtdItensSolicitados: 0,
      descricaoItensSolicitados: '',
      qtdItens: [],
      descricaoitems: [],
      visibleAlert: true,
      sendEmail: false,
      progressSend: 0,
    }
  }

  //https://accounts.google.com/b/0/DisplayUnlockCaptcha precisa disso para desbloquear o email para enviar

  async submit(e) {

    e.preventDefault();

    const nomeRequsitante = document.getElementById('nomeRequsitante').value;
    const empresaRequsitante = document.getElementById('empresaRequsitante').value;
    const telefoneRequsitante = document.getElementById('telefoneRequsitante').value;
    const emailRequsitante = document.getElementById('emailRequsitante').value;
    const ramalRequsitante = document.getElementById('ramalRequsitante').value;

    const nomeAprovador = document.getElementById('nomeAprovador').value;
    const emailAprovador = document.getElementById('emailAprovador').value;
    const coletorAprovador = document.getElementById('coletorAprovador').value;

    const plantaEmprestimo = document.getElementById('plantaEmprestimo').value;
    const localEmprestimo = document.getElementById('localEmprestimo').value;
    const dataEmprestimo = document.getElementById('dataEmprestimo').value;

    const qtdItens = this.state.qtdItens;
    const descricaoitems = this.state.descricaoitems;
    let tabelRowItensSolicitados = "";


    if(nomeRequsitante && empresaRequsitante
      && telefoneRequsitante && emailRequsitante && ramalRequsitante
      && nomeAprovador && emailAprovador && coletorAprovador
      && plantaEmprestimo && localEmprestimo && dataEmprestimo
      && qtdItens.length > 0 && descricaoitems.length > 0) {


       await this.setState({ 
          sendEmail: true,
          progressSend: 20
        });

        for(let i = 0; i < this.state.qtdItens.length; i++) {
    
          tabelRowItensSolicitados = tabelRowItensSolicitados +  
          "<tr>" +
            "<td>" +  qtdItens[i] + "</td>" +
            "<td>" +  descricaoitems[i] + "</td>" +
          "</tr>";
        }
    
       await this.setState({ progressSend: 35 });

    
        const message = 
        "<h3>Dados do Requisitante</h3>" +
        "<table>" +
          "<tr>" +
            "<td>Nome:</td>" +
            "<td>" +  nomeRequsitante + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Empresa:</td>" +
            "<td>" +  empresaRequsitante + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Telefone:</td>" +
            "<td>" +  telefoneRequsitante + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Email:</td>" +
            "<td>" +  emailRequsitante + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Ramal:</td>" +
            "<td>" +  ramalRequsitante + "</td>" +
          "</tr>" +
        "</table>" + 
    
        "<h3>Dados do Aprovador Braskem</h3>" +
        "<table>" +
          "<tr>" +
            "<td>Nome:</td>" +
            "<td>" +  nomeAprovador + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Email:</td>" +
            "<td>" +  emailAprovador + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Coletor:</td>" +
            "<td>" +  coletorAprovador + "</td>" +
          "</tr>" +
        "</table>" + 
        
        "<h3>Local aplicação e prazo do empréstimo</h3>" +
        "<table>" +
          "<tr>" +
            "<td>Planta:</td>" +
            "<td>" +  plantaEmprestimo + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Local:</td>" +
            "<td>" +  localEmprestimo + "</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Data:</td>" +
            "<td>" +  dataEmprestimo + "</td>" +
          "</tr>" +
        "</table>" +
        
        "<h3>Dados dos Itens solicitados</h3>" +
        "<table>" +
          "<tr>" +
            "<td><b>Quantidade</b></td>" +
            "<td><b>Descrição</b></td>" +
          "</tr>" +
          tabelRowItensSolicitados +
        "</table>";

        await this.setState({ progressSend: 50 });
    
        await axios({
          method: "POST", 
          url:"https://cadastrosolicitacaoapi.herokuapp.com/send", 
          data: {
              name: "Matheus",   
              email: "matheussblima@gmail.com, leonardo.peixoto@timenow.com.br",  
              message: message
          }
        }).then((response)=>{
          if (response.data.msg === 'success'){
              this.resetForm();
          }else if(response.data.msg === 'fail'){
            alert("Erro ao enviar a mesagem");
          }
        });

         await this.setState({ progressSend: 100 });
         await this.setState({ sendEmail: false });

        } else {
          alert("Todos os campos precisam ser preenchido!");
      }

  }

  resetForm(){
    document.getElementById('form-cadastro').reset();
    this.setState({
      qtdItens: [],
      descricaoitems: []
    });
  }

  clickButtonAddItem() {
    const { qtdItensSolicitados, descricaoItensSolicitados, qtdItens, descricaoitems } = this.state;

    if(qtdItensSolicitados > 0 && descricaoItensSolicitados !== '') {

        let qtdItensarray = [];
        let descricaoitemsarray = [];
    
        qtdItensarray.push(qtdItensSolicitados);
        descricaoitemsarray.push(descricaoItensSolicitados);
    
        this.setState({
          qtdItens:[...qtdItens, qtdItensarray],
          descricaoitems:[...descricaoitems, descricaoitemsarray],
          visibleAlert: true
        });
    } else {
      alert("Você precisa digitar a quantidade e a descrição do item");
    }
  }

  removeItem(index) {

    let qtdItensArray = this.state.qtdItens;
    qtdItensArray.splice(index, 1);

    let descricaoitemsArray = this.state.descricaoitems;
    descricaoitemsArray.splice(index, 1);

    this.setState({ 
      qtdItens: qtdItensArray,
      descricaoitems: descricaoitemsArray
    });
  }


  render() {
    const children = [];

    for(let i = 0; i < this.state.qtdItens.length; i++) {
        children.push(
            <Alert className={ styles.alertList } key={i} color="primary" toggle={ this.removeItem.bind(this, i) }>
              {this.state.qtdItens[i]} - {this.state.descricaoitems[i]}
            </Alert>
          );
    }

    return (
      <Container>

        { /* Modal de Envio*/ }
        <Modal className={styles.modalDialog} isOpen={this.state.sendEmail}>
          <ModalHeader>Enviando...</ModalHeader>
          <ModalBody>
            <Progress animated color="success" value={ this.state.progressSend } />
          </ModalBody>
        </Modal>

        <Card className={styles.cardContainer}>

          { /* Card Cabeçalho */ }
          <CardHeader className={styles.cardHeader}>
            <h5 className={styles.titleCard}>
                Um e-mail será enviado para o aprovador Braskem após o cadastro.
            </h5>
          </CardHeader>

          { /* Formulario */ }
          <Form className={styles.formContainer}  id="form-cadastro"  onSubmit={this.submit.bind(this)} method="POST">
            
            <div className={styles.titleHeaderForm}>
              <span className={styles.circle}><b>1</b></span>
              <h3>Dados do Requisitante</h3>
            </div>

            <br />

            <Row>
              <Col>
                <FormGroup>
                  <Label for="nomeRequsitante">Nome</Label>
                  <Input className={styles.input} type="text" name="nomeRequisitante" id="nomeRequsitante" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="emailRequsitante">Email</Label>
                  <Input className={styles.input} type="email" name="emailRequisitante" id="emailRequsitante" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="empresaRequsitante">Empresa Parceira</Label>
              <Input className={styles.input} type="text" name="empresaParceiraRequisitante" id="empresaRequsitante" />
            </FormGroup>

            <FormGroup>
              <Label for="telefoneRequsitante">Telefone</Label>
              <Input className={styles.input} type="tel" name="telefoneRequisitante" id="telefoneRequsitante" />
            </FormGroup>
           
            <FormGroup>
              <Label for="ramalRequsitante">Ramal</Label>
              <Input className={styles.input} type="number" name="ramalRequisitante" id="ramalRequsitante" />
            </FormGroup>

            
            <br /><hr />
            <div className={styles.titleHeaderForm}>
              <span className={styles.circle}><b>2</b></span>
              <h3>Dados do Aprovador Braskem</h3>
            </div>

            <br />

            <Row>
              <Col>
                <FormGroup>
                  <Label for="nomeAprovador">Nome</Label>
                  <Input className={styles.input} type="text" name="nomeAprovador" id="nomeAprovador" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="emailAprovador">Email</Label>
                  <Input className={styles.input} type="email" name="emailAprovador" id="emailAprovador" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="coletorAprovador">Coletor de custo</Label>
              <Input className={styles.input} type="text" name="coletorAprovador" id="coletorAprovador" />
            </FormGroup>

            <br /><hr />
          
            <div className={styles.titleHeaderForm}>
              <span className={styles.circle}><b>3</b></span>
              <h3>Local aplicação e prazo do empréstimo</h3>
            </div>

            <br />
            
            <Row>
              <Col>
                <FormGroup>
                  <Label for="plantaEmprestimo">Planta</Label>
                  <Input className={styles.input} type="text" name="plantaEmprestimo" id="plantaEmprestimo" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="localEmprestimo">Local</Label>
                  <Input className={styles.input} type="text" name="localEmprestimo" id="localEmprestimo" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="dataEmprestimo">Data para devolução</Label>
              <Input className={styles.input} type="date" name="dataEmprestimo" id="dataEmprestimo" />
            </FormGroup>

            <br /><hr />
                    
            <div className={styles.titleHeaderForm}>
              <span className={styles.circle}><b>4</b></span>
              <h3>Dados dos Itens solicitados</h3>
            </div>

            <br />

            <Row>
              <Col>
                <FormGroup>
                  <Label for="qtdItensSolicitados">Quantidade de itens</Label>
                  <Input className={styles.input} value={this.state.qtdItensSolicitados} onChange={(event) => {this.setState({ qtdItensSolicitados: event.target.value })}} type="number" name="qtdItensSolicitados" id="qtdItensSolicitados" />
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label for="descricaoItensSolicitados">Descrição de itens</Label>
                  <Input className={styles.input}  value={this.state.descricaoItensSolicitados} onChange={(event) => {this.setState({ descricaoItensSolicitados: event.target.value })}} type="text" name="descricaoItensSolicitados" id="descricaoItensSolicitados" />
                </FormGroup>
              </Col>
              <Col>
                  <Button onClick={ this.clickButtonAddItem.bind(this) } className={styles.buttonAddItem}>Adicionar Item</Button>
              </Col>
            </Row>

            <div className={styles.alertListConteiner}>
              {children}
            </div>

            <br /><hr />
            <Col className={styles.buttonEnviarContainer} sm="12" md={{ size: 10, offset: 1 }} >
              <Button className={styles.buttonEnviar} color="success" >Enviar</Button>
            </Col>
          </Form>
        </Card>
      </Container>
    );
  }
}

