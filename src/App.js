import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert, Card, CardHeader, Container } from 'reactstrap';
import './App.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      qtdItensSolicitados: 0,
      descricaoItensSolicitados: '',
      qtdItens: [],
      descricaoitems: [],
      visibleAlert: true
    }
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
    }
  }

  onDismiss(index) {

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
              <Button className="buttonRemove" key={i} onClick={this.onDismiss.bind(this, i)}>
                <Alert color="primary">
                  {this.state.qtdItens[i]} - {this.state.descricaoitems[i]}
                </Alert>
              </Button>
          );
    }

    return (
      <Container>
        <Card className="card-container">
          <CardHeader className="card-header">
            <h4>
                Cadastro de solicitação de item PV-10
            </h4>
            </CardHeader>
          <Form className="form-container">

            <h3>Dados do Requisitante</h3>

            <FormGroup>
              <Label for="nomeRequsitante">Nome</Label>
              <Input type="text" name="nomeRequisitante" id="nomeRequsitante" />
            </FormGroup>
            <FormGroup>
              <Label for="empresaRequsitante">Empresa Parceira</Label>
              <Input type="text" name="empresaParceiraRequisitante" id="empresaRequsitante" />
            </FormGroup>
            <FormGroup>
              <Label for="telefoneRequsitante">Telefone</Label>
              <Input type="tel" name="telefoneRequisitante" id="telefoneRequsitante" />
            </FormGroup>
            <FormGroup>
              <Label for="emailRequsitante">Email</Label>
              <Input type="email" name="emailRequisitante" id="emailRequsitante" />
            </FormGroup>
            <FormGroup>
              <Label for="ramalRequsitante">Email</Label>
              <Input type="number" name="ramalRequisitante" id="ramalRequsitante" />
            </FormGroup>

            <h3>Dados do Aprovador Braskem</h3>

            <FormGroup>
              <Label for="nomeAprovador">Nome</Label>
              <Input type="text" name="nomeAprovador" id="nomeAprovador" />
            </FormGroup>
            <FormGroup>
              <Label for="emailAprovador">Email</Label>
              <Input type="email" name="emailAprovador" id="emailAprovador" />
            </FormGroup>
            <FormGroup>
              <Label for="coletorAprovador">Coletor de custo</Label>
              <Input type="text" name="coletorAprovador" id="coletorAprovador" />
            </FormGroup>

            <h3>Local aplicação e prazo do empréstimo</h3>
            
            <FormGroup>
              <Label for="plantaEmprestimo">Planta</Label>
              <Input type="text" name="plantaEmprestimo" id="plantaEmprestimo" />
            </FormGroup>
            <FormGroup>
              <Label for="localEmprestimo">Local</Label>
              <Input type="text" name="localEmprestimo" id="localEmprestimo" />
            </FormGroup>
            <FormGroup>
              <Label for="dataEmprestimo">Data para devolução</Label>
              <Input type="date" name="dataEmprestimo" id="dataEmprestimo" />
            </FormGroup>

            <h3>Dados dos Itens solicitados</h3>
            <h6>Click Sobre o item para remover da lista</h6><br/>

            {children}

            <FormGroup>
              <Label for="qtdItensSolicitados">Quantidade de itens</Label>
              <Input value={this.state.qtdItensSolicitados} onChange={(event) => {this.setState({ qtdItensSolicitados: event.target.value })}} type="number" name="qtdItensSolicitados" id="qtdItensSolicitados" />
            </FormGroup>
            <FormGroup>
              <Label for="descricaoItensSolicitados">Descrição de itens</Label>
              <Input  value={this.state.descricaoItensSolicitados} onChange={(event) => {this.setState({ descricaoItensSolicitados: event.target.value })}} type="text" name="descricaoItensSolicitados" id="descricaoItensSolicitados" />
              <Button onClick={ this.clickButtonAddItem.bind(this) } className="button-add_item">Adicionar Item</Button>
            </FormGroup>

            <Button>Enviar</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}