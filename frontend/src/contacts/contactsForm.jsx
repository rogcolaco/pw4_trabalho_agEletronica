import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './contactsActions'
import LabelAndInput from '../common/form/labelAndInput'
// import InputReadOnlyElement from '../common/form/inputReadOnlyElement'
import Row from '../common/layout/row'
// import ItemList from './itemList'


class ContactsForm extends Component {

    render() {
        const { handleSubmit, readOnly, id, nome, email, telefone, endereco, user_id, userId } = this.props
        console.log("userId em contactsForm: ", userId);
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Row>
                        <Field name='nome' component={LabelAndInput} readOnly={readOnly}
                            label='Nome' cols='12 4' placeholder='Informe o nome' />
                    </Row>
                    <Row>
                        <Field name='email' component={LabelAndInput} readOnly={readOnly}
                            label='E-mail:' cols='12 4' placeholder='Informe o e-mail' />
                    </Row>
                    <Row>
                        <Field name='telefone' component={LabelAndInput} readOnly={readOnly}
                            label='Telefone(s)' cols='12 4' placeholder='Informe os números de telefones' />
                    </Row>
                    <Row>
                        <Field name='endereco' component={LabelAndInput} readOnly={readOnly}
                            label='Endereço' cols='12 4' placeholder='Informe um endereço' />
                    </Row>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

ContactsForm = reduxForm({ form: 'contactsForm', destroyOnUnmount: false })(ContactsForm)
const selector = formValueSelector('contactsForm')
const mapStateToProps = state => ({
    id: selector(state, 'id'),
    nome: selector(state, 'nome'),
    email: selector(state, 'email'),
    telefone: selector(state, 'telefone'),
    endereco: selector(state, 'endereco'),
    user_id: selector(state, 'user_id'),
    userId: state.auth.user.id,
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ContactsForm)