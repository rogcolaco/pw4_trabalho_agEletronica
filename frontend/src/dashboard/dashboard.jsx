import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import InfoBox from '../common/widget/infoBox'
import Row from '../common/layout/row'

export default class Dashboard extends Component {

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <ContentHeader title='BEM-VINDO !!' small='' />
                <Content>
                    <Row>
                        <InfoBox cols='12 6' color='blue' icon='phone-square'
                            title={`CONTATOS`} text='Gerencie seus contatos com facilidade.' />
                        <InfoBox cols='12 6' color='red' icon='calendar'
                            title={`COMPROMISSOS`} text='Gerencie seus compromissos e não esqueça nenhum evento.' />
                    </Row>
                </Content>
            </div>
        )
    }
}

