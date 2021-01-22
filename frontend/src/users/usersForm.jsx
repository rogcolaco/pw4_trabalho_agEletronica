import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './usersActions'
import LabelAndInput from '../common/form/labelAndInput'
import Row from '../common/layout/row'
// import ItemList from './itemList'


class UsersForm extends Component {

    render() {
        const { handleSubmit, readOnly, id, nome, login, senha, admin } = this.props
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Row>
                        <Field name='nome' component={LabelAndInput} readOnly={readOnly}
                            label='Nome' cols='12 4' placeholder='Informe o nome' />
                    </Row>
                    <Row>
                        <Field name='login' component={LabelAndInput} readOnly={readOnly}
                            label='Login' cols='12 4' placeholder='Informe o login' />
                    </Row>
                    <Row>
                        <Field name='senha' component={LabelAndInput} type='password' readOnly={readOnly}
                            label='Senha' cols='12 4' placeholder='Informe uma senha' />
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

UsersForm = reduxForm({ form: 'usersForm', destroyOnUnmount: false })(UsersForm)
const selector = formValueSelector('usersForm')
const mapStateToProps = state => ({
    id: selector(state, 'id'),
    nome: selector(state, 'nome'),
    login: selector(state, 'login'),
    senha: selector(state, 'senha'),
    admin: selector(state, 'admin'),
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UsersForm)